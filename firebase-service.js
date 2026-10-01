// Reason Press — Production Firebase Data & Auth Service Layer
// Connects UI directly to real Firebase Authentication, Cloud Firestore, and Firebase Storage

const FirebaseService = {
  // Current session cache
  currentUser: null,
  userProfile: null,
  authListeners: [],

  // ── 1. AUTHENTICATION & USER PROFILE ────────────────────────
  initAuth(onAuthChange) {
    if (onAuthChange) this.authListeners.push(onAuthChange);

    if (!rpAuth) {
      console.error("Firebase Auth is not initialized.");
      return;
    }

    rpAuth.onAuthStateChanged(async (user) => {
      this.currentUser = user;
      if (user) {
        // Fetch Firestore user doc
        try {
          const profile = await this.getUserProfile(user.uid);
          this.userProfile = profile || {
            uid: user.uid,
            email: user.email,
            name: user.displayName || user.email.split("@")[0],
            role: "user",
            emailVerified: user.emailVerified,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
          };
          // Sync email verification status
          if (this.userProfile.emailVerified !== user.emailVerified) {
            this.userProfile.emailVerified = user.emailVerified;
            await this.updateUserProfileDoc(user.uid, { emailVerified: user.emailVerified });
          }
        } catch (err) {
          console.error("Error loading user profile:", err);
          this.userProfile = {
            uid: user.uid,
            email: user.email,
            name: user.displayName || user.email.split("@")[0],
            role: "user",
            emailVerified: user.emailVerified
          };
        }
      } else {
        this.userProfile = null;
      }

      // Notify all registered listeners
      this.authListeners.forEach(listener => {
        try { listener(this.currentUser, this.userProfile); } catch (e) { console.error(e); }
      });
    });
  },

  async registerUser({ name, email, password }) {
    if (!rpAuth) throw new Error("Firebase Auth not initialized.");
    
    // 1. Create real Auth user
    const cred = await rpAuth.createUserWithEmailAndPassword(email, password);
    const user = cred.user;

    // 2. Set Display Name in Firebase Auth profile
    if (name) {
      await user.updateProfile({ displayName: name });
    }

    // 3. Send real email verification
    try {
      await user.sendEmailVerification();
    } catch (verErr) {
      console.warn("Could not send verification email immediately:", verErr);
    }

    // 4. Create real Firestore user doc in users/{uid}
    const profileData = {
      uid: user.uid,
      name: name || email.split("@")[0],
      email: email.toLowerCase().trim(),
      phone: "",
      profileImage: null,
      role: (email.toLowerCase().includes("admin") || email.toLowerCase() === "editor@reasonpress.com") ? "admin" : "user",
      accountStatus: "active",
      emailVerified: false,
      createdAt: (typeof firebase !== "undefined" && firebase.firestore) ? firebase.firestore.FieldValue.serverTimestamp() : new Date(),
      updatedAt: (typeof firebase !== "undefined" && firebase.firestore) ? firebase.firestore.FieldValue.serverTimestamp() : new Date()
    };

    if (rpDb) {
      await rpDb.collection("users").doc(user.uid).set(profileData);
      if (profileData.role === "admin") {
        await rpDb.collection("adminUsers").doc(user.uid).set({
          uid: user.uid,
          email: profileData.email,
          role: "admin",
          grantedAt: firebase.firestore.FieldValue.serverTimestamp()
        }).catch(() => {});
      }
    }

    this.currentUser = user;
    this.userProfile = profileData;

    // Log registration activity
    await this.logActivity({
      type: "auth",
      action: "User Registered",
      details: `New user account created: ${profileData.email} (${profileData.name})`,
      targetUserId: user.uid,
      targetEmail: profileData.email
    });

    return { user, profile: profileData };
  },

  async loginUser(email, password) {
    if (!rpAuth) throw new Error("Firebase Auth not initialized.");
    const cleanEmail = email.trim();
    const cred = await rpAuth.signInWithEmailAndPassword(cleanEmail, password);
    const user = cred.user;

    const initialProfile = {
      uid: user.uid,
      name: user.displayName || cleanEmail.split("@")[0],
      email: user.email ? user.email.toLowerCase().trim() : cleanEmail.toLowerCase(),
      role: (cleanEmail.toLowerCase().includes("admin") || cleanEmail.toLowerCase() === "editor@reasonpress.com") ? "admin" : "user",
      emailVerified: user.emailVerified
    };

    this.currentUser = user;
    this.userProfile = initialProfile;

    // Instant local user persistence for immediate session readiness
    try {
      localStorage.setItem("rp_current_user", JSON.stringify(initialProfile));
    } catch(e) {}

    // Run remote Firestore sync in background without blocking the UI
    (async () => {
      try {
        if (rpDb) {
          const profile = await this.getUserProfile(user.uid);
          if (!profile) {
            await rpDb.collection("users").doc(user.uid).set({
              ...initialProfile,
              createdAt: firebase.firestore.FieldValue.serverTimestamp(),
              updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            }, { merge: true });
          } else {
            this.userProfile = { ...initialProfile, ...profile };
            try { localStorage.setItem("rp_current_user", JSON.stringify(this.userProfile)); } catch(e) {}
          }
          await rpDb.collection("users").doc(user.uid).update({
            lastLoginAt: firebase.firestore.FieldValue.serverTimestamp(),
            emailVerified: user.emailVerified
          }).catch(() => {});
        }
        this.logActivity({
          type: "auth",
          action: "User Signed In",
          details: `User signed in with Email & Password: ${user.email || cleanEmail}`,
          targetUserId: user.uid,
          targetEmail: user.email || cleanEmail
        }).catch(() => {});
      } catch (e) {
        console.warn("Background login sync:", e);
      }
    })();

    return { user, profile: initialProfile };
  },

  async loginWithGoogle() {
    if (!rpAuth) throw new Error("Firebase Auth not initialized.");
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope("profile");
    provider.addScope("email");
    provider.setCustomParameters({ prompt: "select_account" });
    
    const result = await rpAuth.signInWithPopup(provider);
    const user = result.user;

    const initialProfile = {
      uid: user.uid,
      name: user.displayName || (user.email ? user.email.split("@")[0] : "Reader"),
      email: user.email ? user.email.toLowerCase().trim() : "",
      phone: user.phoneNumber || "",
      profileImage: user.photoURL || null,
      role: (user.email && (user.email.toLowerCase().includes("admin") || user.email.toLowerCase() === "editor@reasonpress.com")) ? "admin" : "user",
      emailVerified: user.emailVerified
    };

    this.currentUser = user;
    this.userProfile = initialProfile;

    try {
      localStorage.setItem("rp_current_user", JSON.stringify(initialProfile));
    } catch(e) {}

    // Run remote Firestore sync in background without blocking
    (async () => {
      try {
        if (rpDb) {
          const profile = await this.getUserProfile(user.uid);
          if (!profile) {
            await rpDb.collection("users").doc(user.uid).set({
              ...initialProfile,
              accountStatus: "active",
              createdAt: firebase.firestore.FieldValue.serverTimestamp(),
              updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            }, { merge: true });
          } else {
            this.userProfile = { ...initialProfile, ...profile };
            try { localStorage.setItem("rp_current_user", JSON.stringify(this.userProfile)); } catch(e) {}
          }
          await rpDb.collection("users").doc(user.uid).update({
            lastLoginAt: firebase.firestore.FieldValue.serverTimestamp(),
            emailVerified: user.emailVerified
          }).catch(() => {});
        }
        this.logActivity({
          type: "auth",
          action: "User Signed In (Google)",
          details: `User signed in with Google OAuth: ${user.email}`,
          targetUserId: user.uid,
          targetEmail: user.email
        }).catch(() => {});
      } catch (e) {
        console.warn("Background Google login sync:", e);
      }
    })();

    return { user, profile: initialProfile };
  },

  async logoutUser() {
    this.currentUser = null;
    this.userProfile = null;
    try {
      localStorage.removeItem("rp_current_user");
      sessionStorage.removeItem("rp_admin_logged_in");
    } catch(e) {}

    if (rpAuth) {
      rpAuth.signOut().catch(() => {});
    }
  },

  async sendPasswordReset(email) {
    if (!rpAuth) throw new Error("Firebase Auth not initialized.");
    await rpAuth.sendPasswordResetEmail(email.trim());
    await this.logActivity({
      type: "auth",
      action: "Password Reset Requested",
      details: `Password reset verification email dispatched to: ${email.trim()}`,
      targetEmail: email.trim()
    });
  },

  async resendVerificationEmail() {
    if (!rpAuth || !rpAuth.currentUser) throw new Error("No authenticated user found.");
    await rpAuth.currentUser.sendEmailVerification();
  },

  async reloadUserAuth() {
    if (!rpAuth || !rpAuth.currentUser) return null;
    await rpAuth.currentUser.reload();
    this.currentUser = rpAuth.currentUser;
    if (this.userProfile) {
      this.userProfile.emailVerified = this.currentUser.emailVerified;
      if (rpDb) {
        await rpDb.collection("users").doc(this.currentUser.uid).update({
          emailVerified: this.currentUser.emailVerified
        }).catch(() => {});
      }
    }
    return this.currentUser;
  },

  async getUserProfile(uid) {
    if (!rpDb || !uid) return null;
    try {
      const doc = await rpDb.collection("users").doc(uid).get();
      return doc.exists ? doc.data() : null;
    } catch (err) {
      console.warn("Could not fetch user profile:", err);
      return null;
    }
  },

  async updateUserProfileDoc(uid, data) {
    if (!rpDb || !uid) return;
    data.updatedAt = (typeof firebase !== "undefined" && firebase.firestore) ? firebase.firestore.FieldValue.serverTimestamp() : new Date();
    await rpDb.collection("users").doc(uid).set(data, { merge: true });
    if (this.userProfile && this.userProfile.uid === uid) {
      this.userProfile = { ...this.userProfile, ...data };
    }
    await this.logActivity({
      type: "profile",
      action: "Profile Updated",
      details: `User profile fields updated for UID ${uid}`,
      targetUserId: uid
    });
  },

  async changePassword(newPassword) {
    if (!rpAuth || !rpAuth.currentUser) throw new Error("User must be logged in.");
    await rpAuth.currentUser.updatePassword(newPassword);
  },

  async deleteAccount() {
    if (!rpAuth || !rpAuth.currentUser) throw new Error("User must be logged in.");
    const uid = rpAuth.currentUser.uid;
    const email = rpAuth.currentUser.email;
    if (rpDb) {
      await rpDb.collection("users").doc(uid).update({
        accountStatus: "deleted",
        deletedAt: firebase.firestore.FieldValue.serverTimestamp()
      }).catch(() => {});
    }
    await rpAuth.currentUser.delete();
    await this.logActivity({
      type: "auth",
      action: "Account Deleted",
      details: `User permanently deleted their account: ${email} (${uid})`,
      targetUserId: uid,
      targetEmail: email
    });
    this.currentUser = null;
    this.userProfile = null;
  },

  // ── 2. REAL BOOKS DATABASE (FIRESTORE) ─────────────────────────
  async getBooks() {
    if (!rpDb) return [];
    try {
      const snap = await rpDb.collection("books").get();
      if (snap.empty) {
        return await this.seedInitialBooks();
      }
      const books = [];
      snap.forEach(doc => {
        books.push({ id: doc.id, ...doc.data() });
      });
      return books.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    } catch (err) {
      console.error("Error fetching books from Firestore:", err);
      return [];
    }
  },

  async getBookById(id) {
    if (!rpDb || !id) return null;
    try {
      const doc = await rpDb.collection("books").doc(String(id)).get();
      if (doc.exists) {
        return { id: doc.id, ...doc.data() };
      }
      return null;
    } catch (err) {
      console.error("Error fetching book doc:", err);
      return null;
    }
  },

  async addBook(bookData) {
    if (!rpDb) throw new Error("Firestore not initialized.");
    bookData.createdAt = firebase.firestore.FieldValue.serverTimestamp();
    bookData.updatedAt = firebase.firestore.FieldValue.serverTimestamp();
    const docRef = await rpDb.collection("books").add(bookData);
    
    await this.logActivity({
      type: "book",
      action: "Book Created",
      details: `New title added to catalogue: "${bookData.title}" by ${bookData.author}`
    });

    return { id: docRef.id, ...bookData };
  },

  async updateBook(id, bookData) {
    if (!rpDb) throw new Error("Firestore not initialized.");
    bookData.updatedAt = firebase.firestore.FieldValue.serverTimestamp();
    await rpDb.collection("books").doc(String(id)).update(bookData);

    await this.logActivity({
      type: "book",
      action: "Book Updated",
      details: `Catalogue entry updated: "${bookData.title || id}"`
    });
  },

  async deleteBook(id) {
    if (!rpDb) throw new Error("Firestore not initialized.");
    await rpDb.collection("books").doc(String(id)).delete();

    await this.logActivity({
      type: "book",
      action: "Book Deleted",
      details: `Book ID ${id} removed from catalogue`
    });
  },

  async seedInitialBooks() {
    if (!rpDb) return [];
    const seedCatalog = [
      {
        title: "The Architecture of Thought",
        slug: "the-architecture-of-thought",
        author: "Julian Vance",
        description: "A comprehensive investigation into the structural metaphors that define human cognition, from classical geometry to algorithmic consciousness. Vance offers an exacting study of how intellectual form precedes ethical action.",
        ISBN: "978-1-999901-01-2",
        price: 28.00,
        priceHardcoverINR: 1999,
        priceDigitalINR: 899,
        pdfPrice: 12.00,
        category: "philosophy",
        publisher: "Reason Press . Caliph",
        stock: 35,
        pageCount: 312,
        language: "English",
        publicationDate: "2025-11-15",
        featured: true,
        available: true,
        coverPreset: 1,
        coverImage: null,
        excerpt: "Beneath the streets of London and Paris lie layers of ancient sea creatures whose compressed shells form the very stone of our cathedrals.",
        chapters: [
          { num: 1, title: "The Blueprint", sub: "On foundational axioms", content: "<p>Every intellectual structure rests upon unexamined premises. When we excavate the foundations of classical logic, we discover not bedrock, but a series of deliberate architectural choices.</p>" },
          { num: 2, title: "The Pillar of Form", sub: "Geometry as epistemology", content: "<p>Form is not the vessel of truth; it is the condition under which truth becomes discernible to mortal consciousness.</p>" },
          { num: 3, title: "Scaffolding of Doubt", sub: "The discipline of questioning", content: "<p>Doubt is not structural failure; it is the necessary tensile elasticity that prevents dogmatic edifices from crumbling under their own rigidity.</p>" },
          { num: 4, title: "The Capstone", sub: "Coherence and ethical consequence", content: "<p>The final test of any philosophical edifice is not whether it pleases the intellect, but whether it affords sanctuary to human dignity.</p>" }
        ]
      },
      {
        title: "Quiet Hours",
        slug: "quiet-hours",
        author: "Anya Sharma",
        description: "An intimate, meditative reflection on solitary labour, attention, and the reclamation of inner stillness amidst the noise of the digital sphere.",
        ISBN: "978-1-999901-02-9",
        price: 24.00,
        priceHardcoverINR: 1799,
        priceDigitalINR: 799,
        pdfPrice: 10.00,
        category: "essays",
        publisher: "Reason Press . Caliph",
        stock: 42,
        pageCount: 228,
        language: "English",
        publicationDate: "2025-09-20",
        featured: true,
        available: true,
        coverPreset: 2,
        coverImage: null,
        excerpt: "Silence is not empty; it is merely uncrowded. In our current century, silence has acquired the scarcity value of ambergris or clean groundwater.",
        chapters: [
          { num: 1, title: "The Decibel of Modernity", sub: "On physical noise", content: "<p>Modern noise is not merely acoustic; it is ideological. It insists that every second be colonized by stimulation.</p>" },
          { num: 2, title: "The Solitary Walk", sub: "Pedestrian contemplation", content: "<p>Walking without headphones has become a minor act of rebellion. The rhythm of your strides becomes a metronome for unhurried thought.</p>" },
          { num: 3, title: "The Geometry of Rest", sub: "Reclaiming the night", content: "<p>Night was once an unconditional treaty signed between humanity and darkness. In the quiet hours between midnight and dawn, the mind sheds its defensive armor.</p>" }
        ]
      },
      {
        title: "Meridian",
        slug: "meridian",
        author: "Elias Thorne",
        description: "A sweeping chronicle tracing the historical convergence of navigation, maritime law, and colonial cartography along the Mediterranean basin.",
        ISBN: "978-1-999901-03-6",
        price: 32.00,
        priceHardcoverINR: 2199,
        priceDigitalINR: 999,
        pdfPrice: 14.00,
        category: "history",
        publisher: "Reason Press . Caliph",
        stock: 18,
        pageCount: 440,
        language: "English",
        publicationDate: "2025-08-10",
        featured: true,
        available: true,
        coverPreset: 3,
        coverImage: null,
        excerpt: "A map does not represent land; it negotiates power. To draw a line upon water is the supreme vanity of empires.",
        chapters: [
          { num: 1, title: "The First Sextant", sub: "Astronomy and empire", content: "<p>The star did not care where the ship was sailing; it simply burned with indifferent precision across millions of leagues of cold vacuum.</p>" },
          { num: 2, title: "Tides and Treaties", sub: "The invention of international waters", content: "<p>To claim jurisdiction over swell and salt required a legal rhetoric as vast and flexible as the oceans themselves.</p>" }
        ]
      }
    ];

    const seeded = [];
    for (const b of seedCatalog) {
      const docRef = await rpDb.collection("books").add({
        ...b,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      });
      seeded.push({ id: docRef.id, ...b });
    }
    return seeded;
  },

  // ── 2.5. REAL CATEGORIES DATABASE (FIRESTORE) ────────────────
  async getCategories() {
    if (!rpDb) {
      try { return JSON.parse(localStorage.getItem("rp_categories") || "[]"); } catch (e) { return []; }
    }
    try {
      const snap = await rpDb.collection("categories").get();
      if (snap.empty) {
        return await this.seedInitialCategories();
      }
      const cats = [];
      snap.forEach(doc => {
        cats.push({ id: doc.id, ...doc.data() });
      });
      try { localStorage.setItem("rp_categories", JSON.stringify(cats)); } catch (e) {}
      return cats;
    } catch (err) {
      console.warn("Error fetching categories from Firestore:", err);
      try { return JSON.parse(localStorage.getItem("rp_categories") || "[]"); } catch (e) { return []; }
    }
  },

  async addCategory(categoryData) {
    if (!rpDb) throw new Error("Firestore not initialized.");
    const slug = (categoryData.id || categoryData.slug || categoryData.label.toLowerCase().replace(/[^a-z0-9_-]/g, "")).trim();
    const docData = {
      id: slug,
      slug: slug,
      label: categoryData.label.trim(),
      desc: (categoryData.desc || "").trim(),
      createdAt: (typeof firebase !== "undefined" && firebase.firestore) ? firebase.firestore.FieldValue.serverTimestamp() : new Date(),
      updatedAt: (typeof firebase !== "undefined" && firebase.firestore) ? firebase.firestore.FieldValue.serverTimestamp() : new Date()
    };
    await rpDb.collection("categories").doc(slug).set(docData, { merge: true });

    this.logActivity({
      type: "book",
      action: "Category Created",
      details: `New subject category added to Firestore: "${docData.label}" (${slug})`
    }).catch(() => {});

    return docData;
  },

  async updateCategory(slug, categoryData) {
    if (!rpDb) throw new Error("Firestore not initialized.");
    const docData = {
      label: categoryData.label.trim(),
      desc: (categoryData.desc || "").trim(),
      updatedAt: (typeof firebase !== "undefined" && firebase.firestore) ? firebase.firestore.FieldValue.serverTimestamp() : new Date()
    };
    await rpDb.collection("categories").doc(slug).set(docData, { merge: true });

    this.logActivity({
      type: "book",
      action: "Category Updated",
      details: `Updated subject category "${docData.label}" (${slug}) in Firestore`
    }).catch(() => {});
  },

  async deleteCategory(slug) {
    if (!rpDb) throw new Error("Firestore not initialized.");
    await rpDb.collection("categories").doc(slug).delete();

    this.logActivity({
      type: "book",
      action: "Category Deleted",
      details: `Deleted subject category (${slug}) from Firestore`
    }).catch(() => {});
  },

  async seedInitialCategories() {
    if (!rpDb) return [];
    const defaults = [
      { id: "philosophy", slug: "philosophy", label: "Philosophy & Ideas", desc: "Foundational ontology, epistemology, and ethics." },
      { id: "essays", slug: "essays", label: "Essays & Reflection", desc: "Longform critical essays and meditations on silence." },
      { id: "history", slug: "history", label: "History & Geography", desc: "Cartography, geopolitics, and deep-time earth chronicles." },
      { id: "fiction", slug: "fiction", label: "Literary Fiction", desc: "Restrained novels of exile, memory, and cultural endurance." },
      { id: "culture", slug: "culture", label: "Culture & Urbanism", desc: "Architectural syntax and city discourse." }
    ];
    for (const c of defaults) {
      await rpDb.collection("categories").doc(c.id).set(c, { merge: true }).catch(() => {});
    }
    try { localStorage.setItem("rp_categories", JSON.stringify(defaults)); } catch (e) {}
    return defaults;
  },

  // ── 3. REAL IMAGE & PDF STORAGE (FIREBASE STORAGE) ─────────────
  async uploadFile(file, folder = "uploads") {
    if (!rpStorage) throw new Error("Firebase Storage not initialized.");
    
    // File validation
    const maxSizeBytes = 25 * 1024 * 1024; // 25MB max
    if (file.size > maxSizeBytes) {
      throw new Error(`File is too large (${(file.size / (1024 * 1024)).toFixed(1)}MB). Maximum allowed size is 25MB.`);
    }

    const cleanName = (file.name || "upload").replace(/[^a-zA-Z0-9._-]/g, "_");
    const uniqueId = Date.now() + "_" + Math.floor(Math.random() * 1000);
    const storageRef = rpStorage.ref().child(`${folder}/${uniqueId}_${cleanName}`);

    const snapshot = await storageRef.put(file);
    const downloadUrl = await snapshot.ref.getDownloadURL();
    return downloadUrl;
  },

  // ── 4. REAL SHOPPING CART (FIRESTORE + LOCAL MERGE) ───────────
  async getCart(uid) {
    if (uid && rpDb) {
      try {
        const doc = await rpDb.collection("cart").doc(uid).get();
        if (doc.exists && Array.isArray(doc.data().items)) {
          return doc.data().items;
        }
      } catch (err) {
        console.warn("Could not load cart from Firestore:", err);
      }
    }
    try {
      return JSON.parse(localStorage.getItem("rp_cart") || "[]");
    } catch (e) {
      return [];
    }
  },

  async saveCart(uid, items) {
    localStorage.setItem("rp_cart", JSON.stringify(items));
    if (uid && rpDb) {
      try {
        await rpDb.collection("cart").doc(uid).set({
          uid,
          items,
          updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true });
      } catch (err) {
        console.warn("Could not sync cart to Firestore:", err);
      }
    }
  },

  // ── 5. REAL ORDERS & CHECKOUT (FIRESTORE) ──────────────────────
  async createOrder(orderData) {
    if (!rpDb) throw new Error("Firestore not initialized.");
    orderData.createdAt = firebase.firestore.FieldValue.serverTimestamp();
    orderData.status = orderData.status || "Confirmed";
    const docRef = await rpDb.collection("orders").add(orderData);
    const orderId = docRef.id;

    // Grant books to user library
    if (orderData.userId && Array.isArray(orderData.items)) {
      await this.grantBooksToUserLibrary(orderData.userId, orderData.items, orderId);
    }

    // Clear user cart in Firestore
    if (orderData.userId) {
      await rpDb.collection("cart").doc(orderData.userId).delete().catch(() => {});
    }

    // Log order placed activity
    await this.logActivity({
      type: "order",
      action: "Order Placed",
      details: `Order #${orderId} created for ₹${orderData.total || 0} (${(orderData.items || []).length} title(s)) by ${orderData.customerName || orderData.customerEmail}`,
      targetUserId: orderData.userId || null,
      targetEmail: orderData.customerEmail || null
    });

    return { id: orderId, ...orderData };
  },

  async getUserOrders(uid) {
    if (!rpDb || !uid) return [];
    try {
      const snap = await rpDb.collection("orders").where("userId", "==", uid).get();
      const orders = [];
      snap.forEach(doc => orders.push({ id: doc.id, ...doc.data() }));
      return orders.sort((a, b) => {
        const timeA = a.createdAt ? (a.createdAt.toMillis ? a.createdAt.toMillis() : new Date(a.createdAt).getTime()) : 0;
        const timeB = b.createdAt ? (b.createdAt.toMillis ? b.createdAt.toMillis() : new Date(b.createdAt).getTime()) : 0;
        return timeB - timeA;
      });
    } catch (err) {
      console.error("Error fetching user orders:", err);
      return [];
    }
  },

  async getAllOrders() {
    if (!rpDb) return [];
    try {
      const snap = await rpDb.collection("orders").get();
      const orders = [];
      snap.forEach(doc => orders.push({ id: doc.id, ...doc.data() }));
      return orders.sort((a, b) => {
        const timeA = a.createdAt ? (a.createdAt.toMillis ? a.createdAt.toMillis() : new Date(a.createdAt).getTime()) : 0;
        const timeB = b.createdAt ? (b.createdAt.toMillis ? b.createdAt.toMillis() : new Date(b.createdAt).getTime()) : 0;
        return timeB - timeA;
      });
    } catch (err) {
      console.error("Error fetching all orders:", err);
      return [];
    }
  },

  async updateOrderStatus(orderId, status) {
    if (!rpDb || !orderId) return;
    await rpDb.collection("orders").doc(orderId).update({
      status,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    });

    await this.logActivity({
      type: "order",
      action: "Order Status Updated",
      details: `Order #${orderId} marked as '${status}'`
    });
  },

  // ── 6. REAL USER LIBRARY (PURCHASED BOOKS) ─────────────────────
  async getUserLibrary(uid) {
    if (!rpDb || !uid) return [];
    try {
      const snap = await rpDb.collection("users").doc(uid).collection("library").get();
      const books = [];
      snap.forEach(doc => books.push({ id: doc.id, ...doc.data() }));
      return books;
    } catch (err) {
      console.error("Error fetching user library:", err);
      return [];
    }
  },

  async grantBooksToUserLibrary(uid, items, orderId) {
    if (!rpDb || !uid || !Array.isArray(items)) return;
    for (const item of items) {
      const bookDocId = String(item.id);
      await rpDb.collection("users").doc(uid).collection("library").doc(bookDocId).set({
        bookId: item.id,
        title: item.title,
        author: item.author,
        cover: item.cover || 1,
        coverImage: item.coverImage || null,
        format: item.format || "Digital PDF Edition",
        orderId: orderId || "RP-" + Math.floor(10000 + Math.random() * 90000),
        purchasedAt: new Date().toLocaleDateString("en-GB", { month: "short", day: "numeric", year: "numeric" }),
        grantedAt: firebase.firestore.FieldValue.serverTimestamp()
      }, { merge: true });
    }
  },

  // ── 7. REAL AUTHOR MANUSCRIPTS / SUBMISSIONS ───────────────────
  async submitManuscript(submissionData) {
    if (!rpDb) throw new Error("Firestore not initialized.");
    submissionData.createdAt = firebase.firestore.FieldValue.serverTimestamp();
    submissionData.status = "pending";
    const docRef = await rpDb.collection("submissions").add(submissionData);

    await this.logActivity({
      type: "submission",
      action: "Manuscript Submitted",
      details: `Author ${submissionData.author} submitted manuscript proposal: "${submissionData.title}" (${submissionData.category})`,
      targetEmail: submissionData.email || null
    });

    return { id: docRef.id, ...submissionData };
  },

  async getAllSubmissions() {
    if (!rpDb) return [];
    try {
      const snap = await rpDb.collection("submissions").get();
      const subs = [];
      snap.forEach(doc => subs.push({ id: doc.id, ...doc.data() }));
      return subs;
    } catch (err) {
      console.error("Error loading submissions:", err);
      return [];
    }
  },

  async updateSubmissionStatus(id, status, notes = "") {
    if (!rpDb || !id) return;
    await rpDb.collection("submissions").doc(id).update({
      status,
      adminNotes: notes,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    });

    await this.logActivity({
      type: "submission",
      action: `Manuscript ${status === "approved" ? "Approved & Released" : (status === "declined" ? "Declined" : "Reviewed")}`,
      details: `Manuscript ID ${id} set to '${status}'. ${notes ? 'Note: ' + notes : ''}`
    });
  },

  // ── 8. REAL SITE SETTINGS & REVIEWS ───────────────────────────
  async getSiteSettings() {
    if (!rpDb) return null;
    try {
      const doc = await rpDb.collection("siteSettings").doc("general").get();
      return doc.exists ? doc.data() : null;
    } catch (err) {
      return null;
    }
  },

  async updateSiteSettings(settings) {
    if (!rpDb) return;
    settings.updatedAt = firebase.firestore.FieldValue.serverTimestamp();
    await rpDb.collection("siteSettings").doc("general").set(settings, { merge: true });
    await this.logActivity({
      type: "admin",
      action: "Site Settings Updated",
      details: "Publishing house manifesto and operational contact info updated"
    });
  },

  async getReviews(bookId) {
    if (!rpDb || !bookId) return [];
    try {
      const snap = await rpDb.collection("reviews").where("bookId", "==", String(bookId)).get();
      const reviews = [];
      snap.forEach(doc => reviews.push({ id: doc.id, ...doc.data() }));
      return reviews;
    } catch (err) {
      return [];
    }
  },

  async addReview(reviewData) {
    if (!rpDb) throw new Error("Firestore not initialized.");
    reviewData.createdAt = firebase.firestore.FieldValue.serverTimestamp();
    const docRef = await rpDb.collection("reviews").add(reviewData);

    await this.logActivity({
      type: "review",
      action: "Book Review Added",
      details: `Reader ${reviewData.authorName || 'User'} reviewed book ID ${reviewData.bookId} (${reviewData.rating || 5} stars)`
    });

    return { id: docRef.id, ...reviewData };
  },

  // ── 9. ADMIN VERIFICATION ─────────────────────────────────────
  async isUserAdmin(uid) {
    if (!uid || !rpDb) return false;
    try {
      // 1. Check users collection role
      const userDoc = await rpDb.collection("users").doc(uid).get();
      if (userDoc.exists) {
        const udata = userDoc.data();
        if (udata.role === "admin") return true;

        // Auto promote editor@reasonpress.com or accounts with admin in email
        if (udata.email && (udata.email.toLowerCase().includes("admin") || udata.email.toLowerCase() === "editor@reasonpress.com")) {
          await this.setUserRole(uid, "admin");
          return true;
        }

        // Check pre-authorized emails
        if (udata.email) {
          const emailKey = udata.email.toLowerCase().replace(/[^a-zA-Z0-9]/g, "_");
          const preDoc = await rpDb.collection("adminEmails").doc(emailKey).get();
          if (preDoc.exists) {
            await this.setUserRole(uid, "admin");
            return true;
          }
        }
      }

      // 2. Check adminUsers collection
      const adminDoc = await rpDb.collection("adminUsers").doc(uid).get();
      if (adminDoc.exists) return true;

      return false;
    } catch (err) {
      console.warn("Admin check failed:", err);
      return false;
    }
  },

  // ── 10. REAL USER MANAGEMENT & ROLE PROMOTION (FIRESTORE) ────
  async getAllUsers() {
    let users = [];
    if (rpDb) {
      try {
        const snap = await rpDb.collection("users").get();
        snap.forEach(doc => {
          users.push({ id: doc.id, uid: doc.id, ...doc.data() });
        });
      } catch (err) {
        console.warn("Could not query users collection from Firestore:", err);
      }
    }

    // Fallback/merge with local storage cache
    let cached = [];
    try {
      cached = JSON.parse(localStorage.getItem("rp_cached_users") || "[]");
    } catch (e) {}

    const map = new Map();
    [...users, ...cached].forEach(u => {
      const key = u.uid || u.id || u.email;
      if (key && !map.has(key)) map.set(key, u);
    });

    const merged = Array.from(map.values());
    merged.sort((a, b) => {
      const tA = a.createdAt ? (a.createdAt.toMillis ? a.createdAt.toMillis() : new Date(a.createdAt).getTime()) : 0;
      const tB = b.createdAt ? (b.createdAt.toMillis ? b.createdAt.toMillis() : new Date(b.createdAt).getTime()) : 0;
      return tB - tA;
    });

    try { localStorage.setItem("rp_cached_users", JSON.stringify(merged)); } catch (e) {}
    return merged;
  },

  async setUserRole(uid, role = "user") {
    if (!uid) throw new Error("User ID is required.");
    const roleClean = (role === "admin") ? "admin" : "user";
    const updateData = {
      role: roleClean,
      updatedAt: (typeof firebase !== "undefined" && firebase.firestore) ? firebase.firestore.FieldValue.serverTimestamp() : new Date()
    };

    if (rpDb) {
      await rpDb.collection("users").doc(uid).set(updateData, { merge: true });
      if (roleClean === "admin") {
        await rpDb.collection("adminUsers").doc(uid).set({
          uid,
          role: "admin",
          grantedAt: firebase.firestore.FieldValue.serverTimestamp(),
          grantedBy: this.currentUser ? this.currentUser.email : "system"
        }, { merge: true });
      } else {
        await rpDb.collection("adminUsers").doc(uid).delete().catch(() => {});
      }
    }

    if (this.userProfile && this.userProfile.uid === uid) {
      this.userProfile.role = roleClean;
    }

    // Also update local cache
    try {
      const cached = JSON.parse(localStorage.getItem("rp_cached_users") || "[]");
      const user = cached.find(u => (u.uid || u.id) === uid);
      if (user) user.role = roleClean;
      localStorage.setItem("rp_cached_users", JSON.stringify(cached));
    } catch (e) {}

    await this.logActivity({
      type: "role_change",
      action: roleClean === "admin" ? "Admin Role Granted" : "Admin Role Revoked",
      details: `User UID ${uid} was updated to role '${roleClean}' by ${this.currentUser ? (this.currentUser.displayName || this.currentUser.email) : 'Console'}`,
      targetUserId: uid
    });

    return true;
  },

  async promoteUserByEmail(email) {
    if (!email) throw new Error("Email is required.");
    const cleanEmail = email.toLowerCase().trim();
    let foundUid = null;
    let foundName = null;

    if (rpDb) {
      try {
        const snap = await rpDb.collection("users").where("email", "==", cleanEmail).get();
        if (!snap.empty) {
          const doc = snap.docs[0];
          foundUid = doc.id;
          foundName = doc.data().name || doc.data().displayName;
        }
      } catch (e) {
        console.warn("Query error:", e);
      }
    }

    if (foundUid) {
      await this.setUserRole(foundUid, "admin");
      return { success: true, message: `Account '${cleanEmail}' (${foundName || 'User'}) has been promoted to Admin in Cloud Firestore!`, uid: foundUid };
    } else {
      // Pre-authorize in Firestore
      if (rpDb) {
        const emailKey = cleanEmail.replace(/[^a-zA-Z0-9]/g, "_");
        await rpDb.collection("adminEmails").doc(emailKey).set({
          email: cleanEmail,
          grantedAt: firebase.firestore.FieldValue.serverTimestamp(),
          grantedBy: this.currentUser ? this.currentUser.email : "admin"
        });
      }
      await this.logActivity({
        type: "role_change",
        action: "Admin Pre-Authorization Added",
        details: `Email '${cleanEmail}' was pre-authorized as Administrator. They will automatically get Admin rights when they sign in.`,
        targetEmail: cleanEmail
      });
      return { success: true, message: `Pre-authorized '${cleanEmail}'. They will automatically have full Admin console access!`, uid: null };
    }
  },

  async makeCurrentAccountAdmin() {
    let user = this.currentUser;
    if (!user && typeof rpAuth !== "undefined" && rpAuth) user = rpAuth.currentUser;
    if (!user) {
      try {
        const local = JSON.parse(localStorage.getItem("rp_current_user") || "null");
        if (local && local.uid) user = local;
      } catch(e) {}
    }
    if (!user) throw new Error("No user is currently signed in. Please sign in first.");
    return await this.setUserRole(user.uid, "admin");
  },

  // ── 11. REAL USER ACTIVITY & AUDIT LOGS (FIRESTORE) ──────────
  async logActivity({ type = "general", action, details = "", targetUserId = null, targetEmail = null }) {
    const user = this.currentUser;
    const profile = this.userProfile;
    const now = new Date();
    const logId = "log_" + Date.now() + "_" + Math.floor(Math.random() * 1000);

    const logEntry = {
      id: logId,
      type: type, // 'auth', 'role_change', 'order', 'book', 'submission', 'profile', 'admin', 'review'
      action: action || "User Action",
      details: details || "",
      userId: user ? user.uid : (targetUserId || "guest"),
      userEmail: user ? user.email : (targetEmail || "guest@reasonpress.com"),
      userName: profile?.name || user?.displayName || (user ? user.email.split("@")[0] : "Guest User"),
      targetUserId: targetUserId || null,
      targetEmail: targetEmail || null,
      userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
      dateFormatted: now.toLocaleString("en-GB", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" }),
      timestamp: (typeof firebase !== "undefined" && firebase.firestore) ? firebase.firestore.FieldValue.serverTimestamp() : now
    };

    // Instant local cache update for snappy UI
    try {
      const localLogs = JSON.parse(localStorage.getItem("rp_activity_logs") || "[]");
      localLogs.unshift(logEntry);
      if (localLogs.length > 250) localLogs.length = 250;
      localStorage.setItem("rp_activity_logs", JSON.stringify(localLogs));
    } catch (e) {}

    // Save directly to Cloud Firestore
    if (rpDb) {
      try {
        await rpDb.collection("activityLogs").add(logEntry);
      } catch (err) {
        console.warn("Could not write activity log to Firestore:", err);
      }
    }

    return logEntry;
  },

  async getActivityLogs(limitCount = 100) {
    let firestoreLogs = [];
    if (rpDb) {
      try {
        const snap = await rpDb.collection("activityLogs").limit(limitCount).get();
        snap.forEach(doc => {
          firestoreLogs.push({ id: doc.id, ...doc.data() });
        });
      } catch (err) {
        console.warn("Could not query activityLogs from Firestore:", err);
      }
    }

    let localLogs = [];
    try {
      localLogs = JSON.parse(localStorage.getItem("rp_activity_logs") || "[]");
    } catch (e) {}

    // Combine & deduplicate
    const map = new Map();
    [...firestoreLogs, ...localLogs].forEach(item => {
      const key = item.id || (item.action + "_" + item.dateFormatted + "_" + item.userEmail);
      if (!map.has(key)) map.set(key, item);
    });

    const merged = Array.from(map.values());
    merged.sort((a, b) => {
      const tA = a.timestamp ? (a.timestamp.toMillis ? a.timestamp.toMillis() : new Date(a.timestamp).getTime()) : 0;
      const tB = b.timestamp ? (b.timestamp.toMillis ? b.timestamp.toMillis() : new Date(b.timestamp).getTime()) : 0;
      return tB - tA;
    });

    return merged.slice(0, limitCount);
  },

  async clearActivityLogs() {
    try { localStorage.removeItem("rp_activity_logs"); } catch (e) {}
    if (rpDb) {
      try {
        const snap = await rpDb.collection("activityLogs").limit(50).get();
        const batch = rpDb.batch();
        snap.forEach(doc => batch.delete(doc.ref));
        await batch.commit();
      } catch (err) {
        console.warn("Error clearing Firestore logs:", err);
      }
    }
  }
};

// Export to window
window.FirebaseService = FirebaseService;
