/* REASON PRESS — main.js */
"use strict";

// ── Book Database (Default Fallback) ─────────────────────────
const DEFAULT_BOOKS = [
  {
    id: "1",
    title: "The Architecture of Thought",
    subtitle: "A philosophical investigation into the structures of human reasoning",
    author: "Julian Vance",
    priceHardcover: 28.00,
    priceDigital: 12.00,
    price: 28.00,
    cover: 1,
    category: "philosophy",
    categoryLabel: "Philosophy & Ideas",
    year: "March 2026",
    pages: "312 pages",
    isbn: "978-1-9999-0001-3",
    dimensions: "234 × 153 mm",
    format: "Hardcover, Linen Bound & Digital PDF",
    description: [
      "In The Architecture of Thought, Julian Vance offers a rare and rigorous account of how the mind builds the structures through which it understands the world. Beginning with Kant's schemata and ending with computational models of the twenty-first century, Vance traces the long conversation between philosophers and scientists about what it means to think.",
      "This is not a book about simple ideas. It is a book about the ideas that make simple ideas possible — the invisible scaffolding of reason. Vance writes with the clarity of someone who has spent decades in the company of difficult questions and has finally found words adequate to them.",
      "Available both in our signature archival hardcover printed on Munken acid-free paper, and in our typographically calibrated DRM-free Digital PDF Edition with interactive footnotes."
    ],
    sampleExcerpt: [
      "Chapter 1: The Scaffolding of Perception",
      "We do not encounter the world unmediated. Every sensation, every glimpse of dawn or fracture of memory, arrives pre-shaped by an apparatus we rarely pause to inspect.",
      "Consider the simple act of recognizing a doorway. Long before geometry was codified in Alexandria, the creature navigating the forest had already internalized an implicit physics of threshold and traversal. We are builders of models before we are dwellers in rooms.",
      "When we speak of logic, we are not speaking of an external ruler placed against existence. We are examining the structural joints of human consciousness itself."
    ],
    discussions: [
      {
        id: "d1",
        author: "Helena Rostova",
        avatar: "HR",
        time: "2 days ago",
        passage: "“We are builders of models before we are dwellers in rooms.”",
        body: "Vance's opening assertion in Chapter 1 hits right at the core of phenomenology. Has anyone compared this with Merleau-Ponty's spatial perception theories?",
        likes: 14
      },
      {
        id: "d2",
        author: "Dr. Arthur Pendelton",
        avatar: "AP",
        time: "4 days ago",
        passage: "“The invisible scaffolding of reason...”",
        body: "The historical analysis of Kantian schemata in part two alone justifies the physical edition. Superb marginal notes and typography.",
        likes: 9
      }
    ]
  },
  {
    id: "2",
    title: "Quiet Hours",
    subtitle: "Essays on silence, attention, and the modern condition",
    author: "Anya Sharma",
    priceHardcover: 24.00,
    priceDigital: 10.00,
    price: 24.00,
    cover: 2,
    category: "essays",
    categoryLabel: "Essays & Reflection",
    year: "January 2026",
    pages: "224 pages",
    isbn: "978-1-9999-0002-0",
    dimensions: "216 × 140 mm",
    format: "Hardcover, Cloth Spine & Digital PDF",
    description: [
      "Quiet Hours is a collection of twelve meditative essays examining what happens to our interior lives when silence is extinguished from daily life.",
      "Sharma draws effortlessly on literature, neurobiology, and personal solitude to mount a lyrical defence of quietness as an ethical necessity rather than an aesthetic luxury.",
      "A book to keep on the nightstand and revisit during restless seasons."
    ],
    sampleExcerpt: [
      "Prologue: The Decibel of Modernity",
      "Silence is not empty; it is merely uncrowded. In our current century, silence has acquired the scarcity value of ambergris or clean groundwater.",
      "When we turn down the volume of the world, we do not discover nothingness. We discover the steady, rhythmic pulse of our own consciousness asking to be heard."
    ],
    discussions: [
      {
        id: "d3",
        author: "Julian M.",
        avatar: "JM",
        time: "1 week ago",
        passage: "“Silence is not empty; it is merely uncrowded.”",
        body: "I read this during a train commute and put my phone away for the remainder of the week. Sharma articulates the sensory exhaustion of modern life with surgical beauty.",
        likes: 22
      }
    ]
  },
  {
    id: "3",
    title: "Terra Firma",
    subtitle: "A geological and social chronicle of earth and community",
    author: "Marcus Croft",
    priceHardcover: 32.00,
    priceDigital: 14.00,
    price: 32.00,
    cover: 3,
    category: "history",
    categoryLabel: "History & Geography",
    year: "November 2025",
    pages: "448 pages",
    isbn: "978-1-9999-0003-7",
    dimensions: "240 × 160 mm",
    format: "Hardcover, Illustrated & Digital PDF",
    description: [
      "In Terra Firma, Marcus Croft blends deep-time geological field studies with historical narratives of human settlement. From the chalk plateaus of southern England to the basalt cliffs of the Hebrides, the earth tells a tale of endurance.",
      "Richly illustrated with hand-drawn cartography and geological cross-sections, this volume explores how bedrock determines culture, architecture, and civic memory.",
      "Essential reading for anyone drawn to the intersection of landscape, science, and history."
    ],
    sampleExcerpt: [
      "Introduction: The Deep Memory of Stone",
      "Beneath the streets of London and Paris lie layers of ancient sea creatures whose compressed shells form the very stone of our cathedrals.",
      "Every city is a petrified reef. To understand human history without geology is to admire the tapestry while ignoring the loom."
    ],
    discussions: []
  },
  {
    id: "4",
    title: "The Weight of Light",
    subtitle: "A novel of memory, exile, and post-war resurgence",
    author: "Eleanor Reed",
    priceHardcover: 26.00,
    priceDigital: 11.00,
    price: 26.00,
    cover: 4,
    category: "fiction",
    categoryLabel: "Literary Fiction",
    year: "February 2026",
    pages: "288 pages",
    isbn: "978-1-9999-0004-4",
    dimensions: "210 × 138 mm",
    format: "Hardcover, Ribbon Bookmark & Digital PDF",
    description: [
      "Set across Trieste, Vienna, and Copenhagen between 1948 and 1962, The Weight of Light follows an archivist who discovers an uncatalogued diary written in an untranslatable dialect.",
      "Eleanor Reed's prose possesses a crystalline restraint reminiscent of Sebald and Ishiguro, balancing intimate heartbreak against large geopolitical transformations.",
      "Winner of the 2026 Continental Review Prize for Fiction."
    ],
    sampleExcerpt: [
      "Part One: The Archive at Miramare",
      "The salt air had eaten away the brass corners of the vitrines long before I arrived in October.",
      "Nothing in the Adriatic moves quickly, not even grief. When you walk along the sea wall, the light carries an unbearable physical heft, as if luminous dust were settling upon your shoulders."
    ],
    discussions: []
  },
  {
    id: "5",
    title: "Meridian",
    subtitle: "Mapping navigation, borders, and the illusion of orientation",
    author: "Elias Thorne",
    priceHardcover: 29.00,
    priceDigital: 13.00,
    price: 29.00,
    cover: 5,
    category: "essays",
    categoryLabel: "Essays & Science",
    year: "October 2025",
    pages: "264 pages",
    isbn: "978-1-9999-0005-1",
    dimensions: "220 × 145 mm",
    format: "Hardcover with Foil Stamp & Digital PDF",
    description: [
      "Elias Thorne explores the mathematical invention of lines upon the globe and how arbitrary coordinates reshaped empires, trade, and human psychology.",
      "From Greenwich to zero-meridian rivalries in seventeenth-century France, Meridian tells the fascinating story of humanity's obsession with locating itself.",
      "An eloquent meditation on wanderlust, astronomy, and the borders we draw upon nature."
    ],
    sampleExcerpt: [
      "The Line on the Floor",
      "In the courtyard of Greenwich, tourists step across a brass line set in paving stones, placing one foot in the eastern hemisphere and one in the western.",
      "The line does not exist in nature. The Earth is a spinning sphere of molten rock and salty seas; it knows no prime meridian. The line exists only in agreement, which makes it far more durable than granite."
    ],
    discussions: []
  },
  {
    id: "6",
    title: "On Solitude",
    subtitle: "Notes on creative independence and stillness",
    author: "Sarah Jensen",
    priceHardcover: 22.00,
    priceDigital: 9.00,
    price: 22.00,
    cover: 6,
    category: "philosophy",
    categoryLabel: "Philosophy",
    year: "April 2026",
    pages: "192 pages",
    isbn: "978-1-9999-0006-8",
    dimensions: "198 × 129 mm",
    format: "Paperback, French Flaps & Digital PDF",
    description: [
      "What is the difference between loneliness and chosen solitude? Jensen examines how solitude has served as the nursery of original thought throughout intellectual history.",
      "Brief, crystalline chapters guide the reader through Montaigne's tower, Dickinson's room, and the quiet spaces we desperately need to reclaim today.",
      "A pocket-sized manifesto for thinking clearly on one's own terms."
    ],
    sampleExcerpt: [
      "I. The Room with One Window",
      "To be alone without feeling deserted is an art form. It requires trusting that the contents of your own head will not consume you in the silence.",
      "Those who never learn to be alone remain at the mercy of every room they enter."
    ],
    discussions: []
  },
  {
    id: "7",
    title: "The Blue Hour",
    subtitle: "Stories from the edge of wakefulness and sea",
    author: "Clara Morales",
    priceHardcover: 27.00,
    priceDigital: 11.50,
    price: 27.00,
    cover: 7,
    category: "fiction",
    categoryLabel: "Fiction",
    year: "May 2026",
    pages: "256 pages",
    isbn: "978-1-9999-0007-5",
    dimensions: "216 × 140 mm",
    format: "Hardcover, Embossed Cloth & Digital PDF",
    description: [
      "The Blue Hour collects eight interrelated novellas that take place during the thirty minutes after dusk along Mediterranean and Atlantic coasts.",
      "Morales writes with sensory lyricism about encounters between strangers, unfinished conversations, and the delicate shifts of human intimacy.",
      "A stunning debut from an exceptional new European voice."
    ],
    sampleExcerpt: [
      "Twilight at Cap de Creus",
      "The lighthouse had not yet turned on its second revolution when she noticed the notebook on the wooden bench.",
      "In that twilight, all colors dissolve into slate and cobalt. The sea was neither gray nor blue, but something older than either color."
    ],
    discussions: []
  },
  {
    id: "8",
    title: "The Ethics of Attention",
    subtitle: "Reclaiming the mind in an economy of distraction",
    author: "D.K. Mehta",
    priceHardcover: 31.00,
    priceDigital: 13.50,
    price: 31.00,
    cover: 8,
    category: "philosophy",
    categoryLabel: "Philosophy & Society",
    year: "February 2026",
    pages: "340 pages",
    isbn: "978-1-9999-0008-2",
    dimensions: "234 × 153 mm",
    format: "Hardcover, Acid-Free Paper & Digital PDF",
    description: [
      "Attention is not just a psychological resource; it is the fundamental currency of love, civic responsibility, and moral consciousness.",
      "Mehta argues with formidable clarity that when our attention is privatized and commodified by algorithmic platforms, we lose not just concentration, but our capacity for moral judgment.",
      "A vital book for educators, thinkers, and citizens navigating modern technological life."
    ],
    sampleExcerpt: [
      "Chapter 1: The Sovereignty of What We Notice",
      "What you pay attention to becomes your life. This is not a self-help aphorism; it is an ontological fact.",
      "If you allow strangers to dictate what enters your field of consciousness, you have ceded sovereignty over your own existence."
    ],
    discussions: []
  }
];

// ── Categories & Site Settings Default Data ─────────────────
const DEFAULT_CATEGORIES = [
  { id: "all", label: "All Works", desc: "Complete active catalogue" },
  { id: "philosophy", label: "Philosophy & Ideas", desc: "Epistemology, ethics, mind & language" },
  { id: "essays", label: "Essays & Reflection", desc: "Long-form reflections, solitude & cultural critique" },
  { id: "history", label: "History & Geography", desc: "Deep time, landscape & societal transformations" },
  { id: "fiction", label: "Literary Fiction", desc: "Novellas and literary narratives with enduring style" },
  { id: "monographs", label: "Monographs", desc: "Single-topic academic and intellectual inquiries" }
];

const DEFAULT_SITE_SETTINGS = {
  pressName: "Reason Press",
  motto: "BOOKS WITH PURPOSE",
  manifestoHeading: "We publish books that refuse to evaporate.",
  manifestoText: "In an era of disposable digital text, Reason Press creates physical and typographically calibrated digital volumes meant to withstand decades of rereading.",
  contactEmail: "editor@reasonpress.com",
  ordersEmail: "orders@reasonpress.com",
  contactPhone: "+91 98765 43210 / +44 (0)20 7946 0912",
  reviewTurnaround: "10–14 business days",
  address: "Reason Press . Caliph / India Distribution Hub"
};

// ── Global Store Accessors ──────────────────────────────────
function getBooks() {
  const saved = localStorage.getItem("rp_custom_books");
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    } catch(e) {}
  }
  // Initialize default books with INR prices & stocks
  const seeded = DEFAULT_BOOKS.map((b, idx) => ({
    ...b,
    stock: b.stock ?? (idx === 0 ? 45 : idx === 1 ? 60 : 35),
    isFeatured: b.isFeatured ?? (idx < 6),
    isNew: b.isNew ?? (idx === 0 || idx === 1),
    priceHardcoverINR: b.priceHardcoverINR ?? (b.price && b.price > 100 ? b.price : Math.round((b.priceHardcover || b.price) * 75 || 1999)),
    priceDigitalINR: b.priceDigitalINR ?? Math.round((b.priceDigital || 12) * 75 || 899)
  }));
  localStorage.setItem("rp_custom_books", JSON.stringify(seeded));
  return seeded;
}

function saveBooks(books) {
  localStorage.setItem("rp_custom_books", JSON.stringify(books));
  if (typeof renderHomeBookWall === "function") renderHomeBookWall();
  if (typeof renderCatalogueGrid === "function") renderCatalogueGrid();
}

async function syncBooksFromFirestore() {
  if (typeof FirebaseService === "undefined" || !FirebaseService.getBooks) return;
  try {
    const firestoreBooks = await FirebaseService.getBooks();
    if (Array.isArray(firestoreBooks) && firestoreBooks.length > 0) {
      const mapped = firestoreBooks.map((b, idx) => ({
        id: String(b.id),
        title: b.title,
        subtitle: b.subtitle || (typeof b.description === "string" ? b.description.slice(0, 100) : (Array.isArray(b.description) ? b.description[0]?.slice(0, 100) : "")) || "",
        author: b.author,
        price: b.price || b.priceHardcoverINR || 1999,
        priceHardcover: b.price || 28,
        priceDigital: b.pdfPrice || b.priceDigital || 12,
        priceHardcoverINR: b.priceHardcoverINR || (b.price && b.price > 100 ? b.price : Math.round((b.price || 28) * 75)),
        priceDigitalINR: b.priceDigitalINR || (b.pdfPrice && b.pdfPrice > 100 ? b.pdfPrice : Math.round((b.pdfPrice || 12) * 75)),
        cover: b.coverPreset || b.cover || ((idx % 6) + 1),
        coverImage: b.coverImage || null,
        category: b.category || "philosophy",
        categoryLabel: b.categoryLabel || "Philosophy & Ideas",
        year: b.publicationDate || b.year || "2026",
        pages: b.pageCount ? `${b.pageCount} pages` : (b.pages || "320 pages"),
        isbn: b.ISBN || b.isbn || `978-1-999901-0${idx + 1}-0`,
        format: b.format || "Hardcover & Digital PDF",
        description: Array.isArray(b.description) ? b.description : [b.description || ""],
        sampleExcerpt: Array.isArray(b.excerpt) ? b.excerpt : (typeof b.excerpt === "string" ? [b.excerpt] : b.sampleExcerpt || []),
        chapters: b.chapters || [],
        stock: b.stock ?? 30,
        isFeatured: b.featured ?? true,
        isNew: idx < 2
      }));
      localStorage.setItem("rp_custom_books", JSON.stringify(mapped));
      if (typeof renderHomeBookWall === "function") renderHomeBookWall();
      if (typeof renderCatalogueGrid === "function") renderCatalogueGrid();
      if (typeof initHero3DInteraction === "function") initHero3DInteraction();
    }
  } catch(err) {
    console.warn("Could not sync books from Firestore:", err);
  }
}

function getCategories() {
  const saved = localStorage.getItem("rp_categories");
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    } catch(e) {}
  }
  localStorage.setItem("rp_categories", JSON.stringify(DEFAULT_CATEGORIES));
  return DEFAULT_CATEGORIES;
}

function saveCategories(cats) {
  localStorage.setItem("rp_categories", JSON.stringify(cats));
  if (typeof renderCatalogueGrid === "function") renderCatalogueGrid();
}

function getSiteSettings() {
  const saved = localStorage.getItem("rp_site_settings");
  if (saved) {
    try {
      return { ...DEFAULT_SITE_SETTINGS, ...JSON.parse(saved) };
    } catch(e) {}
  }
  localStorage.setItem("rp_site_settings", JSON.stringify(DEFAULT_SITE_SETTINGS));
  return DEFAULT_SITE_SETTINGS;
}

function saveSiteSettings(settings) {
  localStorage.setItem("rp_site_settings", JSON.stringify(settings));
  if (typeof applySiteSettingsToPage === "function") applySiteSettingsToPage();
}

// Backwards compatibility variable and global exports
const BOOKS = getBooks();
window.getBooks = getBooks;
window.saveBooks = saveBooks;
window.getCategories = getCategories;
window.saveCategories = saveCategories;
window.getSiteSettings = getSiteSettings;
window.saveSiteSettings = saveSiteSettings;

// ── Literary Quotes on Reading Database ─────────────────────
const FAMOUS_QUOTES = [
  {
    quote: "I have always imagined that Paradise will be a kind of a library.",
    author: "Jorge Luis Borges"
  },
  {
    quote: "A book must be the axe for the frozen sea within us.",
    author: "Franz Kafka"
  },
  {
    quote: "You think your pain and your heartbreak are unprecedented in the history of the world, but then you read.",
    author: "James Baldwin"
  },
  {
    quote: "Literature is freedom. In an age of distraction, reading is our solitary sanctuary.",
    author: "Susan Sontag"
  },
  {
    quote: "We read to know we are not alone.",
    author: "C.S. Lewis"
  },
  {
    quote: "A mind needs books as a sword needs a whetstone, if it is to keep its edge.",
    author: "George R.R. Martin"
  },
  {
    quote: "Books are not made to be believed, but to be subjected to inquiry.",
    author: "Umberto Eco"
  }
];

// ── Cart State ──────────────────────────────────────────────
const cart = JSON.parse(localStorage.getItem("rp_cart") || "[]");

function saveCart() {
  localStorage.setItem("rp_cart", JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const total = cart.reduce((a, b) => a + b.qty, 0);
  document.querySelectorAll(".cart-count").forEach(el => {
    el.textContent = total;
    el.style.display = total > 0 ? "inline-flex" : "none";
  });
}

function addToCart(id, title, author, price, cover, format = "Hardcover") {
  const user = getCurrentUser();
  if (!user) {
    showToast("Please sign in to add titles to your bag.");
    openAccountModal('signin');
    return;
  }

  const numId = String(id);
  const cartKey = `${numId}-${format}`;
  const existing = cart.find(i => i.cartKey === cartKey);
  const bookObj = getBooks().find(b => String(b.id) === numId);
  const coverImage = bookObj?.coverImage || null;

  if (existing) {
    existing.qty += 1;
    if (coverImage && !existing.coverImage) existing.coverImage = coverImage;
  } else {
    cart.push({
      cartKey,
      id: numId,
      title,
      author,
      price: Number(price),
      cover: Number(cover) || 1,
      coverImage: coverImage,
      format,
      qty: 1
    });
  }
  saveCart();
  showToast(`Added "${title}" (${format}) to your bag`);
}

function handleDirectBuy() {
  const user = getCurrentUser();
  if (!user) {
    showToast("Please sign in to purchase titles.");
    openAccountModal('signin');
    return;
  }
  // If on book detail page, add currently viewed book to bag first
  const params = new URLSearchParams(window.location.search);
  const bookId = params.get("id");
  if (bookId) {
    const book = getBooks().find(b => String(b.id) === String(bookId));
    if (book) {
      const isDigital = document.getElementById("opt-digital")?.classList.contains("active");
      const format = isDigital ? "Digital PDF Edition" : "Collector's Hardcover";
      const price = isDigital ? (book.priceDigitalINR || 899) : (book.priceHardcoverINR || 1999);
      const cartKey = `${book.id}-${format}`;
      if (!cart.some(i => i.cartKey === cartKey)) {
        cart.push({
          cartKey,
          id: String(book.id),
          title: book.title,
          author: book.author,
          price: Number(price),
          cover: Number(book.cover) || 1,
          coverImage: book.coverImage || null,
          format,
          qty: 1
        });
        saveCart();
      }
    }
  }
  window.location.href = "checkout.html";
}

function removeFromCart(cartKey) {
  const idx = cart.findIndex(i => i.cartKey === cartKey || String(i.id) === String(cartKey));
  if (idx > -1) {
    const item = cart[idx];
    cart.splice(idx, 1);
    saveCart();
    showToast(`Removed "${item.title}"`);
  }
}

function showToast(msg) {
  let t = document.querySelector(".toast");
  if (!t) {
    t = document.createElement("div");
    t.className = "toast";
    document.body.appendChild(t);
  }
  t.innerHTML = `<span class="toast-dot"></span><span>${msg}</span>`;
  t.classList.add("show");
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove("show"), 3200);
}

// ── Dynamic Fading Quotes Rotator ───────────────────────────
function initQuotesRotator() {
  const container = document.getElementById("quote-rotator");
  if (!container) return;

  container.innerHTML = `
    <div class="quote-slides">
      ${FAMOUS_QUOTES.map((q, idx) => `
        <div class="quote-slide ${idx === 0 ? 'active' : ''}" data-index="${idx}">
          <blockquote class="quote-text">&ldquo;${q.quote}&rdquo;</blockquote>
          <div class="quote-author">${q.author}</div>
        </div>
      `).join("")}
    </div>
  `;

  let current = 0;
  const slides = container.querySelectorAll(".quote-slide");
  let timer = null;

  function showQuote(idx) {
    slides.forEach(s => s.classList.remove("active"));
    current = (idx + slides.length) % slides.length;
    slides[current].classList.add("active");
  }

  function nextQuote() {
    showQuote(current + 1);
  }

  function startTimer() {
    clearInterval(timer);
    timer = setInterval(nextQuote, 5500);
  }

  container.addEventListener("mouseenter", () => clearInterval(timer));
  container.addEventListener("mouseleave", startTimer);

  startTimer();
}

// ── Navigation ──────────────────────────────────────────────
function initNav() {
  const nav = document.querySelector(".nav");
  if (!nav) return;
  window.addEventListener("scroll", () => {
    nav.classList.toggle("scrolled", window.scrollY > 30);
  }, { passive: true });

  const menuBtn = document.querySelector(".nav__menu-btn");
  const drawer  = document.querySelector(".nav-drawer");
  if (menuBtn && drawer) {
    menuBtn.addEventListener("click", () => {
      const open = drawer.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", open);
      menuBtn.classList.toggle("active", open);
      document.body.style.overflow = open ? "hidden" : "";
    });
    drawer.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        drawer.classList.remove("open");
        menuBtn.setAttribute("aria-expanded", "false");
        menuBtn.classList.remove("active");
        document.body.style.overflow = "";
      });
    });
  }
}

// ── Scroll Reveal ───────────────────────────────────────────
function initReveal() {
  const els = document.querySelectorAll(".reveal");
  if (!els.length) return;
  // Always immediately reveal elements that are already in or near viewport
  els.forEach(e => {
    const rect = e.getBoundingClientRect();
    if (rect.top < window.innerHeight + 150) {
      e.classList.add("visible");
    }
  });
  if (!("IntersectionObserver" in window)) {
    els.forEach(e => e.classList.add("visible"));
    return;
  }
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); }
    });
  }, { threshold: 0.05, rootMargin: "60px" });
  els.forEach(el => {
    if (!el.classList.contains("visible")) obs.observe(el);
  });
}

// ── Book Catalogue Filtering & Sorting (books.html) ──────────
function initBookTabs() {
  const tabs = document.querySelectorAll(".books-tab");
  const grid = document.getElementById("books-grid");
  if (!tabs.length && !grid) return;

  function applyFilters() {
    const activeTab = document.querySelector(".books-tab.active");
    const cat = activeTab ? activeTab.dataset.cat : "all";
    const items = document.querySelectorAll("[data-item]");

    items.forEach(cell => {
      const itemCat = cell.dataset.cat || "";
      const match = cat === "all" || itemCat === cat;
      cell.style.display = match ? "" : "none";
    });
  }

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => {
        t.classList.remove("active");
        t.setAttribute("aria-selected", "false");
      });
      tab.classList.add("active");
      tab.setAttribute("aria-selected", "true");
      applyFilters();
    });
  });

  const params = new URLSearchParams(window.location.search);
  const catParam = params.get("cat");
  if (catParam) {
    const targetTab = document.querySelector(`.books-tab[data-cat="${catParam}"]`);
    if (targetTab) targetTab.click();
  }
}

// ── Quantity Selector ───────────────────────────────────────
function initQty() {
  document.querySelectorAll(".qty-selector").forEach(sel => {
    const val = sel.querySelector(".qty-value");
    const minus = sel.querySelector(".qty-btn--minus");
    const plus = sel.querySelector(".qty-btn--plus");
    if (!val || !minus || !plus) return;

    minus.onclick = () => {
      const v = Math.max(1, parseInt(val.textContent) - 1);
      val.textContent = v;
    };
    plus.onclick = () => {
      const v = parseInt(val.textContent) + 1;
      val.textContent = v;
    };
  });
}

// ── Single Book Page Dynamic Populator (book.html) ──────────
function initBookDetailPage() {
  const isBookDetail = document.querySelector(".book-detail");
  if (!isBookDetail) return;

  const params = new URLSearchParams(window.location.search);
  const bookId = params.get("id") || "1";
  const allBooks = getBooks();
  const book = allBooks.find(b => String(b.id) === String(bookId)) || allBooks[0];

  document.title = `${book.title} — Reason Press`;

  // Update cover (custom uploaded image or typographic jacket preset)
  const coverWrap = document.querySelector(".book-detail__cover-inner");
  if (coverWrap) {
    if (book.coverImage) {
      coverWrap.innerHTML = `
        <div class="book-cover book-cover--custom book-detail__cover" style="position:relative;width:100%;height:100%;box-shadow:var(--shadow-book);">
          <img src="${book.coverImage}" alt="${book.title}" style="width:100%;height:100%;object-fit:cover;display:block;">
          <div class="book-cover__binding"></div>
          ${book.isNew ? '<span class="badge-tag badge-tag--new" style="position:absolute;top:12px;right:12px;z-index:4;box-shadow:0 2px 6px rgba(0,0,0,0.15);">New Release</span>' : ''}
        </div>
      `;
    } else {
      coverWrap.innerHTML = `
        <div class="book-cover book-cover--${book.cover || 1}" style="position:relative;width:100%;height:100%;">
          <div class="book-cover__art"></div>
          <div class="book-cover__content">
            <div>
              <div class="book-cover__title">${book.title}</div>
              <div class="book-cover__author">${book.author}</div>
            </div>
            <div class="book-cover__press">Reason Press</div>
          </div>
          <div class="book-cover__binding"></div>
          ${book.isNew ? '<span class="badge-tag badge-tag--new" style="position:absolute;top:12px;right:12px;z-index:4;">New Release</span>' : ''}
        </div>
      `;
    }
  }

  // Update Breadcrumb & Titles
  const bcActive = document.querySelector(".book-detail__breadcrumb span");
  if (bcActive) bcActive.textContent = book.title;

  const titleEl = document.querySelector(".book-detail__title");
  if (titleEl) titleEl.textContent = book.title;

  const subEl = document.querySelector(".book-detail__subtitle");
  if (subEl) subEl.textContent = book.subtitle;

  const authorEl = document.querySelector(".book-detail__author");
  if (authorEl) authorEl.innerHTML = `By <em>${book.author}</em>`;

  // Stock badge
  const stock = book.stock ?? 45;
  const priceRow = document.querySelector(".book-detail__price-row");
  if (priceRow) {
    let stockEl = document.getElementById("detail-stock-badge");
    if (!stockEl) {
      stockEl = document.createElement("span");
      stockEl.id = "detail-stock-badge";
      priceRow.appendChild(stockEl);
    }
    stockEl.className = "badge-tag";
    stockEl.style.cssText = stock > 0 ? "background:#E8F5E9;color:#2E7D32;border:1px solid #A5D6A7;margin-left:8px;" : "background:#FFEBEE;color:#C62828;border:1px solid #FFCDD2;margin-left:8px;";
    stockEl.textContent = stock > 0 ? `● In Stock: ${stock} copies ready` : "● Out of Physical Stock";
  }

  const priceHardcover = book.priceHardcoverINR ?? (book.price && book.price > 100 ? book.price : Math.round(book.price * 75 || 1999));
  const pricePdf = book.priceDigitalINR ?? 899;
  let selectedFormat = "Collector's Hardcover";
  let currentPrice = priceHardcover;

  const priceEl = document.querySelector(".book-detail__price");
  if (priceEl) priceEl.textContent = `₹${currentPrice.toLocaleString('en-IN')}`;

  // Wire format picker options
  const optHardcover = document.getElementById("opt-hardcover");
  const optDigital = document.getElementById("opt-digital");
  const priceNote = document.querySelector(".book-detail__price-note");

  if (optHardcover && optDigital) {
    optHardcover.innerHTML = `<span style="font-weight:700;">Collector's Hardcover</span><span style="font-size:11px;opacity:0.8;display:block;">₹${priceHardcover.toLocaleString('en-IN')} (~$${Math.round(priceHardcover/80)})</span>`;
    optDigital.innerHTML = `<span style="font-weight:700;">Digital PDF Edition</span><span style="font-size:11px;opacity:0.8;display:block;">₹${pricePdf.toLocaleString('en-IN')} (~$${Math.round(pricePdf/80)})</span>`;

    optHardcover.onclick = () => {
      optHardcover.classList.add("active");
      optDigital.classList.remove("active");
      selectedFormat = "Collector's Hardcover";
      currentPrice = priceHardcover;
      if (priceEl) priceEl.textContent = `₹${currentPrice.toLocaleString('en-IN')}`;
      if (priceNote) priceNote.textContent = "Collector's Hardcover • Free Express shipping across India";
    };
    optDigital.onclick = () => {
      optDigital.classList.add("active");
      optHardcover.classList.remove("active");
      selectedFormat = "Digital PDF Edition";
      currentPrice = pricePdf;
      if (priceEl) priceEl.textContent = `₹${currentPrice.toLocaleString('en-IN')}`;
      if (priceNote) priceNote.textContent = "DRM-Free Calibrated PDF • Instant delivery to email";
    };
  }

  // Quick meta table
  const metaRows = document.querySelectorAll(".book-detail__meta-row");
  metaRows.forEach(row => {
    const label = row.querySelector(".book-detail__meta-label")?.textContent.trim();
    const val = row.querySelector(".book-detail__meta-value");
    if (!val) return;
    if (label === "Category") val.textContent = book.categoryLabel;
    if (label === "Published") val.textContent = book.year;
    if (label === "Format") val.textContent = `${book.format}, ${book.pages}`;
    if (label === "ISBN") val.textContent = book.isbn;
  });

  // Description body
  const descEl = document.querySelector(".book-detail__desc");
  if (descEl && book.description) {
    descEl.innerHTML = book.description.map(p => `<p>${p}</p>`).join("");
  }

  // Specs grid
  const specs = document.querySelectorAll(".book-detail__specs .spec-item");
  specs.forEach(item => {
    const label = item.querySelector(".spec-item__label")?.textContent.trim();
    const val = item.querySelector(".spec-item__value");
    if (!val) return;
    if (label === "Format") val.textContent = book.format;
    if (label === "Pages") val.textContent = book.pages.replace(" pages", "");
    if (label === "Dimensions") val.textContent = book.dimensions;
    if (label === "ISBN") val.textContent = book.isbn;
    if (label === "Published") val.textContent = book.year;
  });

  // Add to Bag action
  const addBtn = document.getElementById("add-to-cart-btn");
  if (addBtn) {
    addBtn.onclick = function() {
      const qtyEl = document.querySelector(".qty-value");
      const qty = parseInt(qtyEl ? qtyEl.textContent : "1") || 1;
      for (let i = 0; i < qty; i++) {
        addToCart(book.id, book.title, book.author, currentPrice, book.cover, selectedFormat);
      }
    };
  }

  // Sample Chapter / PDF Reader Modal button
  const readSampleBtn = document.getElementById("read-sample-btn");
  if (readSampleBtn && book.sampleExcerpt) {
    readSampleBtn.onclick = function() {
      openSampleReader(book);
    };
  }

  // Render Community Discussions
  renderBookDiscussions(book);
}

// ── Reader Salon / Community Discussion on Book Detail Page ─
function renderBookDiscussions(book) {
  const container = document.getElementById("community-notes-list");
  if (!container) return;

  const storageKey = `rp_discussions_${book.id}`;
  const stored = JSON.parse(localStorage.getItem(storageKey) || "null");
  const notes = stored || (book.discussions && book.discussions.length > 0 ? book.discussions : [
    {
      id: "seed1",
      author: "Elena Vasquez",
      avatar: "EV",
      time: "Just now",
      passage: "“Every book worth reading always wants something from you.”",
      body: "I first encountered Vance's essays in London. Reading this volume feels like having a direct seminar with someone who values precision of thought above all else.",
      likes: 5
    }
  ]);

  container.innerHTML = notes.map(n => `
    <div class="community-note" id="${n.id}">
      <div class="community-note__header">
        <div class="community-note__author-group">
          <div class="community-note__avatar">${n.avatar || n.author.substring(0,2).toUpperCase()}</div>
          <div>
            <div class="community-note__author">${n.author}</div>
            <div class="community-note__time">${n.time}</div>
          </div>
        </div>
        <button class="community-note__action-btn" onclick="likeDiscussion('${book.id}', '${n.id}')">
          &hearts; <span>${n.likes || 0}</span>
        </button>
      </div>
      ${n.passage ? `<div class="community-note__passage">${n.passage}</div>` : ""}
      <div class="community-note__body">${n.body}</div>
    </div>
  `).join("");

  // Handle new note posting
  const form = document.getElementById("community-note-form");
  if (form) {
    form.onsubmit = function(e) {
      e.preventDefault();
      const authorInput = document.getElementById("note-author");
      const passageInput = document.getElementById("note-passage");
      const bodyInput = document.getElementById("note-body");

      const author = authorInput.value.trim() || "Anonymous Reader";
      const passage = passageInput ? passageInput.value.trim() : "";
      const body = bodyInput.value.trim();

      if (!body) return;

      const initials = author.split(" ").map(w => w[0]).join("").substring(0, 2).toUpperCase() || "RD";
      const newNote = {
        id: "note_" + Date.now(),
        author,
        avatar: initials,
        time: "A moment ago",
        passage: passage ? `“${passage}”` : "",
        body,
        likes: 0
      };

      notes.unshift(newNote);
      localStorage.setItem(storageKey, JSON.stringify(notes));
      if (typeof FirebaseService !== "undefined" && FirebaseService.addReview) {
        FirebaseService.addReview({
          bookId: book.id,
          bookTitle: book.title,
          ...newNote
        }).catch(() => {});
      }
      renderBookDiscussions(book);
      showToast("Reader reflection shared to the Salon");
      form.reset();
    };
  }
}

window.likeDiscussion = function(bookId, noteId) {
  const storageKey = `rp_discussions_${bookId}`;
  const notes = JSON.parse(localStorage.getItem(storageKey) || "[]");
  const note = notes.find(n => n.id === noteId);
  if (note) {
    note.likes = (note.likes || 0) + 1;
    localStorage.setItem(storageKey, JSON.stringify(notes));
    const book = BOOKS.find(b => b.id === bookId);
    if (book) renderBookDiscussions(book);
  }
};

// ── Sample Chapter & PDF Reader Modal ───────────────────────
function openSampleReader(book) {
  let modal = document.getElementById("sample-modal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "sample-modal";
    modal.className = "sample-modal";
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="sample-modal__backdrop" onclick="closeSampleReader()"></div>
    <div class="sample-modal__content">
      <div class="sample-modal__header">
        <div>
          <div class="sample-modal__eyebrow">Sample Chapter Preview &bull; PDF Edition</div>
          <div class="sample-modal__author">${book.title} &mdash; by ${book.author}</div>
        </div>
        <button class="sample-modal__close" onclick="closeSampleReader()" aria-label="Close reader">&times;</button>
      </div>
      <div class="sample-modal__body">
        <h3 class="sample-modal__chapter-title">${book.sampleExcerpt[0]}</h3>
        ${book.sampleExcerpt.slice(1).map(p => `<p class="sample-modal__para">${p}</p>`).join("")}
        <div class="sample-modal__footer-callout">
          <p>This sample is an excerpt from the Reason Press print &amp; digital publication.</p>
          <div style="display:flex;gap:var(--space-3);flex-wrap:wrap;justify-content:center;">
            <button class="btn btn--primary" onclick="closeSampleReader(); document.getElementById('add-to-cart-btn').click();">
              <span>Order Physical Edition — $${(book.priceHardcover || book.price).toFixed(2)}</span>
            </button>
            <button class="btn btn--accent" onclick="closeSampleReader(); addToCart('${book.id}', '${book.title}', '${book.author}', ${book.priceDigital || 12.00}, ${book.cover}, 'Digital PDF');">
              <span>Get Digital PDF — $${(book.priceDigital || 12.00).toFixed(2)}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  modal.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeSampleReader() {
  const modal = document.getElementById("sample-modal");
  if (modal) {
    modal.classList.remove("open");
    document.body.style.overflow = "";
  }
}
window.closeSampleReader = closeSampleReader;

// ── Pricing Helper (INR & USD) ──────────────────────────────
function getItemINR(item) {
  if (item.priceINR) return item.priceINR;
  const isPdf = (item.format || "").includes("PDF") || (item.format || "").includes("Digital");
  if (isPdf) return 899;
  if (item.price && item.price > 100) return Math.round(item.price);
  if (item.price && item.price <= 100) return Math.round(item.price * 75);
  return 1999;
}

window.handleCartCheckout = function(event) {
  if (event) event.preventDefault();
  if (!cart || cart.length === 0) {
    showToast("Your reading bag is empty. Please select a volume from our catalogue.");
    return;
  }
  const user = getCurrentUser();
  if (!user) {
    showToast("Please sign in to proceed to checkout.");
    openAccountModal('signin');
    return;
  }
  window.location.href = "checkout.html";
};

// ── Cart Page Render ────────────────────────────────────────
function renderCartPage() {
  const container = document.getElementById("cart-items");
  const headerRow = document.getElementById("cart-header-row");
  const subtotalEl = document.getElementById("cart-subtotal");
  const shippingEl = document.getElementById("cart-shipping");
  const totalEl    = document.getElementById("cart-total");
  if (!container) return;

  if (cart.length === 0) {
    if (headerRow) headerRow.style.display = "none";
    container.innerHTML = `
      <div class="cart-empty-state">
        <div class="cart-empty-state__icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"></path>
            <path d="M6 6h10"></path>
            <path d="M6 10h7"></path>
          </svg>
        </div>
        <h2 class="cart-empty-state__title">Your reading bag is empty</h2>
        <p class="cart-empty-state__text">Every book in our catalogue is chosen with intent. Discover our latest editions and add them to your collection.</p>
        <div style="display:flex;gap:var(--space-4);justify-content:center;flex-wrap:wrap;margin-top:var(--space-6);">
          <a href="books.html" class="btn btn--primary"><span>Explore Catalogue &rarr;</span></a>
        </div>
      </div>
    `;
    if (subtotalEl) subtotalEl.textContent = "₹0";
    if (shippingEl) shippingEl.textContent = "₹0";
    if (totalEl)    totalEl.textContent    = "₹0";
    const checkoutBtn = document.getElementById("cart-checkout-btn");
    if (checkoutBtn) checkoutBtn.classList.add("disabled");
    return;
  }

  if (headerRow) headerRow.style.display = "grid";
  const checkoutBtn = document.getElementById("cart-checkout-btn");
  if (checkoutBtn) checkoutBtn.classList.remove("disabled");

  container.innerHTML = cart.map((item, idx) => {
    const unitPrice = getItemINR(item);
    const itemSubtotal = unitPrice * item.qty;

    return `
      <div class="cart-table-item">
        <!-- Book Column -->
        <div style="display:flex;align-items:center;gap:var(--space-4);">
          <div class="cart-item__cover" style="width:52px;height:78px;flex-shrink:0;">
            ${item.coverImage ? `
              <div class="book-cover book-cover--custom" style="width:100%;height:100%;box-shadow:var(--shadow-book);position:relative;">
                <img src="${item.coverImage}" alt="${item.title}">
                <div class="book-cover__binding"></div>
              </div>
            ` : `
              <div class="book-cover book-cover--${item.cover || 1}" style="width:100%;height:100%;position:relative;">
                <div class="book-cover__art"></div>
                <div class="book-cover__content" style="padding:6px;">
                  <div class="book-cover__title" style="font-size:0.58rem;line-height:1.1;">${item.title}</div>
                  <div class="book-cover__author" style="font-size:0.42rem;">${item.author}</div>
                </div>
                <div class="book-cover__binding"></div>
              </div>
            `}
          </div>
          <div>
            <a href="book.html?id=${item.id}" class="cart-item__title" style="font-weight:700;font-size:var(--text-base);color:var(--ink);">${item.title}</a>
            <div style="font-size:var(--text-xs);color:var(--ink-muted);margin:2px 0;">By ${item.author}</div>
            <span style="display:inline-block;padding:2px 8px;font-size:10px;font-weight:700;background:var(--paper-mid);border:1px solid var(--rule);border-radius:2px;color:var(--accent-dark);">
              ${item.format || "Hardcover Edition"}
            </span>
          </div>
        </div>

        <!-- Price Column -->
        <div style="font-weight:600;color:var(--ink);font-size:var(--text-sm);">
          ₹${unitPrice.toLocaleString('en-IN')}
          <span style="display:block;font-size:10px;color:var(--ink-faint);">(~$${(unitPrice/80).toFixed(0)})</span>
        </div>

        <!-- Quantity Column -->
        <div>
          <div class="qty-selector">
            <button type="button" class="qty-btn" onclick="changeCartItemQtyByIdx(${idx}, -1)" aria-label="Decrease">&minus;</button>
            <div class="qty-value">${item.qty}</div>
            <button type="button" class="qty-btn" onclick="changeCartItemQtyByIdx(${idx}, 1)" aria-label="Increase">&plus;</button>
          </div>
        </div>

        <!-- Subtotal Column -->
        <div style="font-weight:700;font-size:var(--text-base);color:var(--ink);">
          ₹${itemSubtotal.toLocaleString('en-IN')}
        </div>

        <!-- Remove Item Column -->
        <div style="text-align:right;">
          <button type="button" class="cart-item__remove" onclick="removeItemByIdx(${idx})" title="Remove item" aria-label="Remove item">
            &times; Remove
          </button>
        </div>
      </div>
    `;
  }).join("");

  const subtotal = cart.reduce((sum, item) => sum + getItemINR(item) * item.qty, 0);
  const isAllDigital = cart.every(i => (i.format || "").includes("PDF") || (i.format || "").includes("Digital"));
  const shipping = isAllDigital ? 0 : (subtotal >= 1500 ? 0 : 150);
  const total = subtotal + shipping;

  if (subtotalEl) subtotalEl.textContent = `₹${subtotal.toLocaleString('en-IN')}`;
  if (shippingEl) shippingEl.textContent = shipping === 0 ? (isAllDigital ? "Digital Free" : "Free Delivery") : `₹${shipping}`;
  if (totalEl)    totalEl.textContent    = `₹${total.toLocaleString('en-IN')}`;
}

window.changeCartItemQtyByIdx = function(idx, delta) {
  if (idx < 0 || idx >= cart.length) return;
  cart[idx].qty += delta;
  if (cart[idx].qty <= 0) {
    cart.splice(idx, 1);
  }
  saveCart();
  renderCartPage();
};

window.removeItemByIdx = function(idx) {
  if (idx >= 0 && idx < cart.length) {
    cart.splice(idx, 1);
    saveCart();
    renderCartPage();
    showToast("Item removed from reading bag.");
  }
};

window.removeItem = function(id) {
  removeFromCart(id);
  renderCartPage();
};

window.changeCartItemQty = function(key, delta) {
  const item = cart.find(i => (i.cartKey || String(i.id)) === String(key));
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    removeFromCart(key);
  } else {
    saveCart();
  }
  renderCartPage();
};

// ── Payment Gateway State & Methods ─────────────────────────
let selectedPaymentMethod = "Google Pay (UPI)";

window.selectUpiApp = function(cardEl, appKey) {
  document.querySelectorAll(".upi-app-card").forEach(c => c.classList.remove("active"));
  cardEl.classList.add("active");
  const names = {
    gpay: "Google Pay (UPI)",
    phonepe: "PhonePe (UPI)",
    paytm: "Paytm (UPI)",
    bhim: "BHIM / UPI VPA"
  };
  selectedPaymentMethod = names[appKey] || "UPI";
  updatePlaceOrderBtnText();
};

window.selectBank = function(cardEl, bankName) {
  document.querySelectorAll(".bank-card").forEach(c => c.classList.remove("active"));
  cardEl.classList.add("active");
  selectedPaymentMethod = `${bankName} Net Banking`;
  updatePlaceOrderBtnText();
};

window.verifyUpiId = function() {
  const upiInput = document.getElementById("co-upi-id");
  const badge = document.getElementById("upi-verify-badge");
  if (!upiInput || !badge) return;
  const val = upiInput.value.trim();
  if (val.includes("@")) {
    badge.textContent = `✓ UPI ID ${val} verified (Verified Name: Reason Reader)`;
    badge.style.color = "#2B7A4B";
    showToast("UPI ID verified successfully");
  } else {
    badge.textContent = "Please enter a valid UPI VPA (e.g. mobile@okhdfcbank)";
    badge.style.color = "var(--accent-dark)";
  }
};

window.toggleQrCode = function(btn) {
  const qrBox = document.getElementById("upi-qr-box");
  if (qrBox) {
    const isHidden = qrBox.style.display === "none";
    qrBox.style.display = isHidden ? "block" : "none";
    btn.textContent = isHidden ? "Hide QR Code" : "Show Dynamic QR →";
  }
};

function updatePlaceOrderBtnText() {
  const placeBtn = document.getElementById("place-order-btn");
  if (!placeBtn) return;
  const totalEl = document.getElementById("checkout-total");
  const totalText = totalEl ? totalEl.textContent : "₹0";
  placeBtn.innerHTML = `<span>Pay ${totalText} via ${selectedPaymentMethod} &rarr;</span>`;
}

window.openEmailPreview = function() {
  const modal = document.getElementById("email-preview-modal");
  if (modal) modal.classList.add("open");
};

window.closeEmailPreview = function() {
  const modal = document.getElementById("email-preview-modal");
  if (modal) modal.classList.remove("open");
};

// ── User Profile & Fast Checkout Storage (Firestore + localStorage) ─
const DEFAULT_USER_PROFILE = {
  name: "",
  email: "",
  phone: "",
  role: "reader",
  address: "",
  city: "",
  pin: "",
  state: "",
  country: "IN",
  paymentPref: "gpay",
  upiId: ""
};

function getSavedUserProfile() {
  const currentUser = getCurrentUser();
  try {
    const raw = localStorage.getItem("rp_user_profile");
    if (raw) {
      const parsed = JSON.parse(raw);
      if (currentUser) {
        return {
          ...parsed,
          name: currentUser.name || parsed.name || "",
          email: currentUser.email || parsed.email || "",
          role: currentUser.role || parsed.role || "reader"
        };
      }
      return parsed;
    }
  } catch(e) {}

  if (currentUser) {
    return {
      ...DEFAULT_USER_PROFILE,
      name: currentUser.name || "",
      email: currentUser.email || "",
      role: currentUser.role || "reader"
    };
  }

  return { ...DEFAULT_USER_PROFILE };
}

window.saveUserProfileDetails = async function() {
  const name = (document.getElementById("pf-name")?.value || "").trim();
  const email = (document.getElementById("pf-email")?.value || "").trim();
  const phone = (document.getElementById("pf-phone")?.value || "").trim();
  const role = document.getElementById("pf-role")?.value || "reader";
  const address = (document.getElementById("pf-address")?.value || "").trim();
  const city = (document.getElementById("pf-city")?.value || "").trim();
  const pin = (document.getElementById("pf-pin")?.value || "").trim();
  const state = (document.getElementById("pf-state")?.value || "").trim();
  const country = document.getElementById("pf-country")?.value || "IN";
  const paymentPref = document.getElementById("pf-payment-pref")?.value || "gpay";
  const upiId = (document.getElementById("pf-upi-id")?.value || "").trim();

  if (!name || !email || !address) {
    showToast("Please fill in your name, email, and street address.");
    return;
  }

  const profile = {
    name,
    email,
    phone,
    role,
    address,
    city,
    pin,
    state,
    country,
    paymentPref,
    upiId
  };

  localStorage.setItem("rp_user_profile", JSON.stringify(profile));

  // Sync with current logged-in user and Cloud Firestore
  const currentUser = getCurrentUser();
  if (currentUser) {
    setCurrentUser({
      ...currentUser,
      name: name,
      email: email,
      role: role,
      avatar: name.charAt(0).toUpperCase()
    });

    if (typeof FirebaseService !== "undefined" && currentUser.uid) {
      await FirebaseService.updateUserProfileDoc(currentUser.uid, {
        name,
        email,
        phone,
        address,
        city,
        pin,
        state,
        country,
        paymentPref,
        upiId
      }).catch(err => console.warn("Firestore profile sync error:", err));
    }
  }

  const btn = document.getElementById("save-profile-btn");
  if (btn) {
    const orig = btn.innerHTML;
    btn.innerHTML = `<span>✓ Saved Successfully!</span>`;
    setTimeout(() => { btn.innerHTML = orig; }, 2000);
  }

  showToast("✓ Profile & delivery address saved! Auto-fill active for checkout.");
};

async function initProfilePage() {
  const form = document.getElementById("profile-details-form");
  const loggedOutNotice = document.getElementById("profile-logged-out-notice");
  const loggedInContent = document.getElementById("profile-logged-in-content");
  if (!form) return;

  const currentUser = getCurrentUser();
  if (!currentUser) {
    if (loggedOutNotice) loggedOutNotice.style.display = "block";
    if (loggedInContent) loggedInContent.style.display = "none";
    return;
  }

  if (loggedOutNotice) loggedOutNotice.style.display = "none";
  if (loggedInContent) loggedInContent.style.display = "block";

  let profile = getSavedUserProfile();

  // Fetch live profile from Cloud Firestore
  if (typeof FirebaseService !== "undefined" && currentUser.uid) {
    try {
      const remoteProfile = await FirebaseService.getUserProfile(currentUser.uid);
      if (remoteProfile) {
        profile = { ...profile, ...remoteProfile };
        localStorage.setItem("rp_user_profile", JSON.stringify(profile));
      }
    } catch(err) {
      console.warn("Could not fetch remote profile:", err);
    }
  }

  const map = {
    "pf-name": profile.name || currentUser.name || "",
    "pf-email": profile.email || currentUser.email || "",
    "pf-phone": profile.phone || "",
    "pf-role": profile.role || currentUser.role || "reader",
    "pf-address": profile.address || "",
    "pf-city": profile.city || "",
    "pf-pin": profile.pin || "",
    "pf-state": profile.state || "",
    "pf-country": profile.country || "IN",
    "pf-payment-pref": profile.paymentPref || "gpay",
    "pf-upi-id": profile.upiId || ""
  };

  Object.entries(map).forEach(([id, val]) => {
    const el = document.getElementById(id);
    if (el && val !== undefined) el.value = val;
  });
}

// ── Interactive Payment Gateway Simulation State ──────────────
let currentGatewayOrder = null;
let currentUpiPin = "";

function renderPinDots() {
  for (let i = 0; i < 4; i++) {
    const dot = document.getElementById(`pindot-${i}`);
    if (dot) {
      if (i < currentUpiPin.length) {
        dot.classList.add("filled");
      } else {
        dot.classList.remove("filled");
      }
    }
  }
}

window.openPaymentGateway = function(total, method, orderPayload) {
  currentGatewayOrder = orderPayload;
  currentUpiPin = "";

  const overlay = document.getElementById("gateway-overlay");
  if (!overlay) {
    executeOrderCompletion(orderPayload);
    return;
  }

  const amtDisplay = document.getElementById("gw-amount-display");
  const btnLabel = document.getElementById("gw-btn-label");
  const logoBadge = document.getElementById("gw-logo-badge");
  const upiIdDisplay = document.getElementById("gw-upi-id-display");
  const bankIcon = document.getElementById("gw-bank-icon");
  const bankName = document.getElementById("gw-bank-name");

  if (amtDisplay) amtDisplay.textContent = `₹${total.toLocaleString('en-IN')}`;

  const lower = (method || "").toLowerCase();
  if (lower.includes("phonepe")) {
    if (logoBadge) logoBadge.innerHTML = `<span style="font-weight:800;color:#5F259F;font-size:18px;">Phone<span style="color:#6739B6;">Pe</span></span>`;
    if (btnLabel) btnLabel.textContent = `Pay ₹${total.toLocaleString('en-IN')} with PhonePe →`;
    if (bankIcon) bankIcon.textContent = "HDFC";
    if (bankName) bankName.textContent = "HDFC Bank •••• 5120";
    if (upiIdDisplay) upiIdDisplay.textContent = "UPI ID: merchant@reasonpress";
  } else if (lower.includes("paypal")) {
    if (logoBadge) logoBadge.innerHTML = `<span style="font-weight:800;color:#003087;font-size:18px;">Pay<span style="color:#0079C1;">Pal</span> Express</span>`;
    if (btnLabel) btnLabel.textContent = `Authorize ₹${total.toLocaleString('en-IN')} with PayPal →`;
    if (bankIcon) bankIcon.textContent = "PP";
    if (bankName) bankName.textContent = "PayPal Balance / Linked Visa";
    if (upiIdDisplay) upiIdDisplay.textContent = "merchant@reasonpress.com";
  } else if (lower.includes("card")) {
    if (logoBadge) logoBadge.innerHTML = `<span style="font-weight:800;color:#0F172A;font-size:18px;">RuPay / Visa 3D Secure</span>`;
    if (btnLabel) btnLabel.textContent = `Pay ₹${total.toLocaleString('en-IN')} via Bank Gateway →`;
    if (bankIcon) bankIcon.textContent = "CARD";
    if (bankName) bankName.textContent = "Verified by RuPay / Visa";
    if (upiIdDisplay) upiIdDisplay.textContent = "Reason Press . Caliph & Delhi";
  } else {
    // Default Google Pay
    if (logoBadge) logoBadge.innerHTML = `<span style="font-weight:800;color:#1A73E8;font-size:18px;">G<span style="color:#EA4335;">o</span><span style="color:#FBBC05;">o</span><span style="color:#1A73E8;">g</span><span style="color:#34A853;">l</span><span style="color:#EA4335;">e</span> Pay</span>`;
    if (btnLabel) btnLabel.textContent = `Pay ₹${total.toLocaleString('en-IN')} with Google Pay →`;
    if (bankIcon) bankIcon.textContent = "SBI";
    if (bankName) bankName.textContent = "State Bank of India";
    if (upiIdDisplay) upiIdDisplay.textContent = "UPI ID: reasonpress@okaxis";
  }

  const sAuth = document.getElementById("gw-step-auth");
  const sPin = document.getElementById("gw-step-pin");
  const sProc = document.getElementById("gw-step-processing");
  const sSucc = document.getElementById("gw-step-success");

  if (sAuth) sAuth.style.display = "block";
  if (sPin) sPin.style.display = "none";
  if (sProc) sProc.style.display = "none";
  if (sSucc) sSucc.style.display = "none";

  renderPinDots();
  overlay.classList.add("active");
  overlay.style.display = "flex";
  document.body.style.overflow = "hidden";
};

window.cancelGatewayPayment = function() {
  const overlay = document.getElementById("gateway-overlay");
  if (overlay) {
    overlay.classList.remove("active");
    overlay.style.display = "none";
  }
  document.body.style.overflow = "";
  const placeBtn = document.getElementById("place-order-btn");
  if (placeBtn) {
    placeBtn.disabled = false;
    updatePlaceOrderBtnText();
  }
  showToast("Payment window closed. You can retry anytime.");
};

window.goToUpiPinStep = function() {
  const sAuth = document.getElementById("gw-step-auth");
  const sPin = document.getElementById("gw-step-pin");
  if (sAuth) sAuth.style.display = "none";
  if (sPin) sPin.style.display = "block";
  currentUpiPin = "";
  renderPinDots();
};

window.enterUpiPinDigit = function(digit) {
  if (currentUpiPin.length < 4) {
    currentUpiPin += String(digit);
    renderPinDots();
    if (currentUpiPin.length === 4) {
      setTimeout(() => {
        window.submitUpiPin();
      }, 250);
    }
  }
};

window.clearUpiPin = function() {
  currentUpiPin = "";
  renderPinDots();
};

window.autoFillDemoPin = function() {
  currentUpiPin = "1234";
  renderPinDots();
  setTimeout(() => {
    window.submitUpiPin();
  }, 300);
};

window.submitUpiPin = function() {
  if (currentUpiPin.length < 4) {
    showToast("Please enter all 4 digits of your UPI PIN.");
    return;
  }

  const sPin = document.getElementById("gw-step-pin");
  const sProc = document.getElementById("gw-step-processing");
  const sSucc = document.getElementById("gw-step-success");

  if (sPin) sPin.style.display = "none";
  if (sProc) sProc.style.display = "block";

  // Simulate bank clearing switch
  setTimeout(() => {
    if (sProc) sProc.style.display = "none";
    if (sSucc) sSucc.style.display = "block";

    const total = currentGatewayOrder ? currentGatewayOrder.total : 1999;
    const utrRef = `UPI-${Math.floor(100000000000 + Math.random() * 900000000000)}`;

    const sAmt = document.getElementById("gw-success-amount");
    const sUtr = document.getElementById("gw-success-utr");
    if (sAmt) sAmt.textContent = `₹${total.toLocaleString('en-IN')} Paid`;
    if (sUtr) sUtr.textContent = `UTR Ref: ${utrRef}`;

    // Finish after viewing approval pulse
    setTimeout(() => {
      const overlay = document.getElementById("gateway-overlay");
      if (overlay) {
        overlay.classList.remove("active");
        overlay.style.display = "none";
      }
      document.body.style.overflow = "";

      executeOrderCompletion({
        ...currentGatewayOrder,
        utrRef: utrRef
      });
    }, 1200);

  }, 1300);
};

// ── Complete Order & Access Confirmation ───────────────────────
function executeOrderCompletion(orderData) {
  const { customerName, customerPhone, customerEmail, customerAddress, customerPin, total, paymentMethod, items, utrRef } = orderData;
  const orderId = `RP-IN-${Math.floor(100000 + Math.random() * 900000)}`;
  const finalUtr = utrRef || `UPI-${Math.floor(100000000000 + Math.random() * 900000000000)}`;
  const purchasedItems = items || [...cart];

  // Prepare Email Modal HTML Content
  const emailContentEl = document.getElementById("email-preview-content");
  if (emailContentEl) {
    emailContentEl.innerHTML = `
      <div style="background:#F7FAFC;border:1px solid #E2E8F0;padding:16px;border-radius:4px;margin-bottom:20px;font-size:12px;color:#4A5568;">
        <div><strong>From:</strong> Reason Press Orders &lt;orders@reasonpress.com&gt;</div>
        <div><strong>To:</strong> ${customerName} &lt;${customerEmail}&gt;</div>
        <div><strong>Subject:</strong> Order Confirmed #${orderId} &mdash; Reason Press: Books With Purpose</div>
        <div><strong>Date:</strong> ${new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
      </div>

      <div style="text-align:center;padding:16px 0;border-bottom:1px solid #E2E8F0;margin-bottom:20px;">
        <h2 style="font-family:var(--font-display);font-size:24px;color:var(--ink);margin:0 0 6px;">Reason Press</h2>
        <div style="font-size:11px;font-weight:700;letter-spacing:0.14em;color:var(--accent-dark);text-transform:uppercase;">BOOKS WITH PURPOSE &bull; OFFICIAL RECEIPT</div>
      </div>

      <p style="font-size:15px;line-height:1.6;margin-bottom:16px;">
        Dear <strong>${customerName}</strong>,
      </p>
      <p style="font-size:14px;color:#4A5568;line-height:1.6;margin-bottom:20px;">
        Thank you for supporting independent literature. Your payment of <strong>₹${total.toLocaleString('en-IN')}</strong> has been successfully received via <strong>${paymentMethod}</strong> (UTR: ${finalUtr}).
      </p>

      <div style="background:#EDF2F7;padding:12px 16px;border-radius:4px;margin-bottom:20px;font-size:13px;">
        <div style="font-weight:700;margin-bottom:8px;color:var(--ink);">Delivery Address:</div>
        <div>${customerAddress}</div>
        <div>PIN Code: <strong>${customerPin}</strong> &bull; Contact: ${customerPhone}</div>
      </div>

      <div style="font-weight:700;font-size:14px;margin-bottom:10px;color:var(--ink);">Ordered Editions:</div>
      <table style="width:100%;border-collapse:collapse;margin-bottom:20px;font-size:13px;">
        <thead>
          <tr style="border-bottom:2px solid #CBD5E0;text-align:left;">
            <th style="padding:6px 0;">Item</th>
            <th style="padding:6px 0;">Format</th>
            <th style="padding:6px 0;text-align:right;">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          ${purchasedItems.map(item => `
            <tr style="border-bottom:1px solid #E2E8F0;">
              <td style="padding:10px 0;"><strong>${item.title}</strong> &times; ${item.qty}</td>
              <td style="padding:10px 0;"><span style="color:var(--accent-dark);font-weight:600;">${item.format}</span></td>
              <td style="padding:10px 0;text-align:right;">₹${(getItemINR(item) * item.qty).toLocaleString('en-IN')}</td>
            </tr>
          `).join("")}
          <tr>
            <td colspan="2" style="padding:12px 0;font-weight:700;font-size:15px;">Total Paid:</td>
            <td style="padding:12px 0;font-weight:700;font-size:15px;text-align:right;color:var(--accent-dark);">₹${total.toLocaleString('en-IN')}</td>
          </tr>
        </tbody>
      </table>

      <div style="background:var(--accent-subtle);border:1px solid var(--accent-border);padding:14px;border-radius:4px;margin-bottom:20px;text-align:center;">
        <div style="font-weight:700;color:var(--ink);font-size:13px;margin-bottom:4px;">Digital Editions Ready for Reading &amp; Download</div>
        <div style="font-size:12px;color:var(--ink-muted);margin-bottom:10px;">Your books have been loaded directly into your Personal Library.</div>
        <a href="library.html" style="display:inline-block;background:var(--ink);color:var(--white);padding:8px 16px;border-radius:2px;font-size:12px;font-weight:600;text-decoration:none;">Open Personal Library &rarr;</a>
      </div>

      <div style="font-size:11px;color:#718096;border-top:1px solid #E2E8F0;padding-top:14px;text-align:center;">
        Reason Press . Caliph &bull; Registered Publishers &bull; GST/Tax Invoice Attached &bull; Support: orders@reasonpress.com
      </div>
    `;
  }

  // Save order to Cloud Firestore & localStorage backup
  try {
    const currentUser = getCurrentUser();
    const orderDoc = {
      orderId: orderId,
      utrRef: finalUtr,
      userId: currentUser?.uid || null,
      date: `Today, ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
      dateFormatted: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      customerName: customerName,
      customerPhone: customerPhone,
      customerEmail: customerEmail,
      customerAddress: customerAddress,
      customerPin: customerPin,
      paymentMethod: paymentMethod,
      total: total,
      status: "confirmed",
      items: purchasedItems.map(item => ({
        id: String(item.id),
        title: item.title,
        author: item.author || "Reason Press Author",
        format: item.format || "Hardcover",
        qty: item.qty,
        cover: item.cover || 1,
        coverImage: item.coverImage || null,
        price: getItemINR(item)
      }))
    };

    // Save directly to Cloud Firestore
    if (typeof FirebaseService !== "undefined" && FirebaseService.createOrder) {
      FirebaseService.createOrder(orderDoc).catch(err => console.error("Firestore order error:", err));
    }

    let storedOrders = JSON.parse(localStorage.getItem("rp_orders") || "[]");
    storedOrders.unshift({
      id: orderId,
      ...orderDoc
    });
    localStorage.setItem("rp_orders", JSON.stringify(storedOrders));

    // Save purchased books to My Library for the customer
    let myLib = [];
    try { myLib = JSON.parse(localStorage.getItem("rp_my_library") || "[]"); } catch(e){}
    purchasedItems.forEach(item => {
      const exists = myLib.some(b => String(b.id) === String(item.id));
      if (!exists) {
        myLib.unshift({
          id: String(item.id),
          title: item.title,
          author: item.author || "Reason Press Author",
          format: item.format || "Digital PDF & In-Browser Edition",
          cover: item.cover || 1,
          coverImage: item.coverImage || null,
          purchasedAt: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
          orderId: orderId,
          customerEmail: customerEmail
        });
      }
    });
    localStorage.setItem("rp_my_library", JSON.stringify(myLib));

    // If no user is logged in, auto-authenticate with customer details
    if (!getCurrentUser()) {
      const displayName = customerName.split(" ")[0] || "Reader";
      setCurrentUser({
        name: customerName,
        email: customerEmail,
        role: "reader",
        avatar: displayName.charAt(0).toUpperCase()
      });
    }
  } catch(e) {
    console.error("Order completion processing error:", e);
  }

  // Clear cart
  cart.length = 0;
  saveCart();
  updateCartCount();

  // Render Order Confirmation Page
  const main = document.querySelector(".checkout-layout");
  if (main) {
    main.innerHTML = `
      <div class="checkout-success" style="grid-column:1/-1;padding:var(--space-12) 0;max-width:760px;margin:0 auto;text-align:center;">
        <div class="checkout-success__icon" style="width:72px;height:72px;border-radius:50%;background:#EBF7EE;color:#2B7A4B;display:inline-flex;align-items:center;justify-content:center;margin-bottom:var(--space-6);border:2px solid #B8E6C3;">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </div>

        <div class="guest-pill" style="margin-bottom:var(--space-3);background:#DCFCE7;color:#166534;border-color:#BBF7D0;">
          ✓ Payment Verified &bull; Books Added to Your Personal Library
        </div>

        <h1 class="checkout-success__title" style="font-family:var(--font-display);font-size:clamp(var(--text-3xl),4vw,var(--text-4xl));font-weight:700;margin-bottom:var(--space-2);color:var(--ink);">
          Payment Received &bull; Order Confirmed
        </h1>
        
        <p style="font-family:var(--font-serif);font-size:var(--text-xl);color:var(--ink-muted);max-width:54ch;margin:0 auto var(--space-8);line-height:1.6;">
          Thank you, <strong>${customerName}</strong>. Your payment of <strong>₹${total.toLocaleString('en-IN')}</strong> has been confirmed via <strong>${paymentMethod}</strong>.
        </p>

        <!-- Payment & Shipping Details Card -->
        <div style="background:var(--paper);border:1px solid var(--rule);border-radius:3px;padding:var(--space-8);text-align:left;box-shadow:0 6px 24px rgba(25, 42, 62, 0.04);margin-bottom:var(--space-8);">
          <div style="display:flex;justify-content:space-between;align-items:baseline;padding-bottom:var(--space-4);border-bottom:1px solid var(--rule);margin-bottom:var(--space-4);flex-wrap:wrap;gap:8px;">
            <div>
              <span style="font-size:var(--text-xs);color:var(--ink-muted);text-transform:uppercase;letter-spacing:0.08em;font-weight:700;">Order ID</span>
              <div style="font-family:var(--font-display);font-size:var(--text-xl);font-weight:700;color:var(--ink);">#${orderId}</div>
            </div>
            <div style="text-align:right;">
              <span style="font-size:var(--text-xs);color:var(--ink-muted);text-transform:uppercase;letter-spacing:0.08em;font-weight:700;">Payment Reference (UTR)</span>
              <div style="font-size:var(--text-xs);font-weight:700;color:var(--accent-dark);">${finalUtr}</div>
            </div>
          </div>

          <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-6);margin-bottom:var(--space-6);">
            <div>
              <div style="font-size:var(--text-xs);font-weight:700;color:var(--ink-muted);text-transform:uppercase;margin-bottom:4px;">Customer Info</div>
              <div style="font-size:var(--text-sm);font-weight:600;color:var(--ink);">${customerName}</div>
              <div style="font-size:var(--text-xs);color:var(--ink-light);">${customerEmail}</div>
              <div style="font-size:var(--text-xs);color:var(--ink-light);">${customerPhone}</div>
            </div>
            <div>
              <div style="font-size:var(--text-xs);font-weight:700;color:var(--ink-muted);text-transform:uppercase;margin-bottom:4px;">Delivery Destination</div>
              <div style="font-size:var(--text-sm);color:var(--ink);line-height:1.5;">${customerAddress}</div>
              <div style="font-size:var(--text-xs);font-weight:700;color:var(--ink);margin-top:2px;">PIN Code: ${customerPin}</div>
            </div>
          </div>

          <!-- Items Breakdown -->
          <div style="font-size:var(--text-xs);font-weight:700;color:var(--ink-muted);text-transform:uppercase;margin-bottom:var(--space-2);letter-spacing:0.08em;">
            Acquired Titles
          </div>
          ${purchasedItems.map(item => `
            <div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-top:1px solid var(--rule-light);">
              <div>
                <strong style="color:var(--ink);font-size:var(--text-sm);">${item.title}</strong>
                <span style="display:inline-block;margin-left:8px;padding:1px 6px;font-size:10px;font-weight:700;background:var(--paper-mid);border:1px solid var(--rule);border-radius:2px;color:var(--accent-dark);">${item.format}</span>
                <span style="font-size:var(--text-xs);color:var(--ink-faint);margin-left:6px;">&times; ${item.qty}</span>
              </div>
              <div style="font-weight:700;color:var(--ink);font-size:var(--text-sm);">
                ₹${(getItemINR(item) * item.qty).toLocaleString('en-IN')}
              </div>
            </div>
          `).join("")}

          <div style="display:flex;justify-content:space-between;padding-top:var(--space-4);border-top:2px solid var(--rule);margin-top:var(--space-4);font-size:var(--text-lg);font-weight:700;color:var(--ink);">
            <span>Total Paid via ${paymentMethod}</span>
            <span style="color:var(--accent-dark);">₹${total.toLocaleString('en-IN')}</span>
          </div>
        </div>

        <!-- Instant Library Access Banner -->
        <div style="background:var(--paper-mid);border:2px solid var(--accent);border-radius:4px;padding:var(--space-6);margin-bottom:var(--space-8);text-align:left;display:flex;align-items:center;justify-content:space-between;gap:var(--space-4);flex-wrap:wrap;">
          <div style="display:flex;align-items:center;gap:var(--space-4);">
            <div style="font-size:32px;"></div>
            <div>
              <h3 style="font-family:var(--font-display);font-size:1.15rem;margin:0 0 4px;color:var(--ink);">
                Your Books are Now in Your Library!
              </h3>
              <div style="font-size:12px;color:var(--ink-muted);line-height:1.5;">
                Read right now in your distraction-free browser reader or download high-res PDFs.
              </div>
            </div>
          </div>
          <a href="library.html" class="btn btn--primary" style="padding:12px 20px;font-size:13px;white-space:nowrap;">
            <span> Open My Library &amp; Start Reading &rarr;</span>
          </a>
        </div>

        <!-- Email Sent Notification Box -->
        <div style="background:#EBF4FC;border:1px solid #B5D6F2;padding:var(--space-6);border-radius:3px;margin-bottom:var(--space-8);text-align:left;display:flex;align-items:center;justify-content:space-between;gap:var(--space-4);flex-wrap:wrap;">
          <div style="display:flex;align-items:center;gap:var(--space-3);">
            <div style="width:36px;height:36px;background:rgba(30,96,145,0.1);border-radius:50%;display:flex;align-items:center;justify-content:center;color:#1E6091;">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            </div>
            <div>
              <div style="font-weight:700;font-size:var(--text-sm);color:#1E6091;">Confirmation Email Dispatched</div>
              <div style="font-size:var(--text-xs);color:#2C5282;">
                An itemized tax invoice and instant PDF keys have been transmitted to <strong>${customerEmail}</strong>.
              </div>
            </div>
          </div>
          <button type="button" class="btn btn--outline" style="background:var(--white);font-size:var(--text-xs);padding:10px 18px;" onclick="openEmailPreview()">
            <span>Preview Sent Email Receipt &rarr;</span>
          </button>
        </div>

        <!-- Action Links -->
        <div style="display:flex;justify-content:center;gap:var(--space-4);flex-wrap:wrap;">
          <button type="button" class="btn btn--primary" onclick="window.print()">
            <span>Print Tax Invoice (PDF)</span>
          </button>
          <a href="books.html" class="btn btn--outline">
            <span>Continue Browsing Catalogue</span>
          </a>
        </div>
      </div>
    `;
  }

  showToast(`✓ Payment successful via ${paymentMethod}! Books added to your Library.`);
}

// ── Checkout Page Render & Form Submission ──────────────────
function renderCheckoutSummary() {
  const container = document.getElementById("checkout-items");
  const subtotalEl = document.getElementById("checkout-subtotal");
  const shippingEl = document.getElementById("checkout-shipping");
  const totalEl   = document.getElementById("checkout-total");
  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = `
      <div style="text-align:center;padding:var(--space-8) var(--space-4);color:var(--ink-muted);">
        <div style="font-size:32px;margin-bottom:8px;"></div>
        <p style="font-family:var(--font-serif);font-size:15px;margin-bottom:12px;">Your reading bag is currently empty.</p>
        <a href="books.html" class="btn btn--outline" style="font-size:12px;padding:8px 16px;">
          <span>Browse Catalogue &rarr;</span>
        </a>
      </div>
    `;
    if (subtotalEl) subtotalEl.textContent = "₹0.00";
    if (shippingEl) shippingEl.textContent = "₹0.00";
    if (totalEl) totalEl.textContent = "₹0.00";
    const placeBtn = document.getElementById("place-order-btn");
    if (placeBtn) placeBtn.disabled = true;
    return;
  }

  container.innerHTML = cart.map(item => {
    const unitPrice = getItemINR(item);
    return `
      <div class="checkout-summary-row">
        <div class="checkout-summary-row__name">
          <span class="checkout-summary-row__title">${item.title}</span>
          <span style="font-size:10px;color:var(--accent-dark);font-weight:700;display:block;">${item.format || "Hardcover"}</span>
          <span class="checkout-summary-row__qty">&times; ${item.qty}</span>
        </div>
        <span class="checkout-summary-row__price">₹${(unitPrice * item.qty).toLocaleString('en-IN')}</span>
      </div>
    `;
  }).join("");

  const subtotal = cart.reduce((a, b) => a + getItemINR(b) * b.qty, 0);
  const isAllDigital = cart.every(i => (i.format || "").includes("PDF") || (i.format || "").includes("Digital"));
  const shipping = isAllDigital ? 0 : (subtotal >= 1500 ? 0 : 150);
  const total = subtotal + shipping;

  if (subtotalEl) subtotalEl.textContent = `₹${subtotal.toLocaleString('en-IN')}`;
  if (shippingEl) shippingEl.textContent = shipping === 0 ? (isAllDigital ? "Digital Free" : "Free Delivery") : `₹${shipping}`;
  if (totalEl)    totalEl.textContent    = `₹${total.toLocaleString('en-IN')}`;

  // Auto-fill from saved reader profile
  const profile = getSavedUserProfile();
  if (profile) {
    const nameEl = document.getElementById("co-name");
    const phoneEl = document.getElementById("co-phone");
    const emailEl = document.getElementById("co-email");
    const addrEl = document.getElementById("co-address");
    const cityEl = document.getElementById("co-city");
    const pinEl = document.getElementById("co-pin");
    const countryEl = document.getElementById("co-country");
    const upiEl = document.getElementById("co-upi-id");
    const banner = document.getElementById("checkout-profile-autofill-banner");

    if (nameEl) nameEl.value = profile.name || "";
    if (phoneEl) phoneEl.value = profile.phone || "";
    if (emailEl) emailEl.value = profile.email || "";
    if (addrEl) addrEl.value = profile.address || "";
    if (cityEl) cityEl.value = profile.city || "";
    if (pinEl) pinEl.value = profile.pin || "";
    if (countryEl && profile.country) countryEl.value = profile.country;
    if (upiEl && profile.upiId) upiEl.value = profile.upiId;

    if (banner) {
      banner.style.display = "flex";
      banner.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
        <div style="flex:1;">
          <strong>Profile Address Auto-Filled</strong> for ${profile.name} (${profile.city || 'Saved Address'}, ${profile.pin || ''}). No retyping needed!
        </div>
        <a href="profile.html" style="font-size:11px;color:var(--accent-dark);font-weight:700;text-decoration:underline;white-space:nowrap;">Edit in Profile &rarr;</a>
      `;
    }

    if (profile.paymentPref === "phonepe") {
      selectedPaymentMethod = "PhonePe (UPI)";
      const appCard = document.querySelector(`.upi-app-card[data-app="phonepe"]`);
      if (appCard) window.selectUpiApp(appCard, "phonepe");
    } else if (profile.paymentPref === "paytm") {
      selectedPaymentMethod = "Paytm (UPI)";
      const appCard = document.querySelector(`.upi-app-card[data-app="paytm"]`);
      if (appCard) window.selectUpiApp(appCard, "paytm");
    }
  }

  // Initialize Payment Tabs
  const tabBtns = document.querySelectorAll(".payment-tab-btn");
  tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      tabBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const tab = btn.dataset.tab;
      document.querySelectorAll(".payment-panel").forEach(p => p.classList.remove("active"));
      const targetPanel = document.getElementById("panel-" + tab);
      if (targetPanel) targetPanel.classList.add("active");

      if (tab === "upi") selectedPaymentMethod = "Google Pay (UPI)";
      else if (tab === "cards") selectedPaymentMethod = "Credit / Debit Card";
      else if (tab === "netbanking") selectedPaymentMethod = "Net Banking";
      else if (tab === "paypal") selectedPaymentMethod = "PayPal";
      updatePlaceOrderBtnText();
    });
  });

  updatePlaceOrderBtnText();

  // Form submission -> Triggers realistic Payment Gateway
  const form = document.getElementById("checkout-form");
  if (form) {
    form.addEventListener("submit", function(e) {
      e.preventDefault();

      const customerName = (document.getElementById("co-name")?.value || "Distinguished Reader").trim();
      const customerPhone = (document.getElementById("co-phone")?.value || "+91 98765 43210").trim();
      const customerEmail = (document.getElementById("co-email")?.value || "reader@domain.com").trim();
      const customerAddress = (document.getElementById("co-address")?.value || "221B Baker Street, Mumbai").trim();
      const customerPin = (document.getElementById("co-pin")?.value || "400001").trim();

      const orderPayload = {
        customerName,
        customerPhone,
        customerEmail,
        customerAddress,
        customerPin,
        total,
        paymentMethod: selectedPaymentMethod,
        items: [...cart]
      };

      const placeBtn = document.getElementById("place-order-btn");
      if (placeBtn) {
        placeBtn.disabled = true;
        placeBtn.innerHTML = `<span>Connecting to ${selectedPaymentMethod}...</span>`;
      }

      // Open realistic payment gateway modal
      setTimeout(() => {
        window.openPaymentGateway(total, selectedPaymentMethod, orderPayload);
      }, 500);
    });
  }
}

// ── Publish Form Submission & File Uploads (publish.html) ──────
function initPublishForm() {
  const form = document.getElementById("publish-submission-form");
  if (!form) return;

  // Manuscript dropzone & input
  const msDropzone = document.getElementById("manuscript-dropzone");
  const msInput = document.getElementById("manuscript-file-input");
  const msBadge = document.getElementById("manuscript-file-badge");
  const msFilename = document.getElementById("manuscript-filename");
  const msFilesize = document.getElementById("manuscript-filesize");
  const msRemove = document.getElementById("manuscript-file-remove");

  function formatBytes(bytes) {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / 1048576).toFixed(1) + " MB";
  }

  if (msInput) {
    msInput.addEventListener("change", function() {
      if (this.files && this.files[0]) {
        const file = this.files[0];
        if (msFilename) msFilename.textContent = file.name;
        if (msFilesize) msFilesize.textContent = "(" + formatBytes(file.size) + ")";
        if (msBadge) msBadge.style.display = "flex";
        if (msDropzone) msDropzone.style.display = "none";

        // Read real PDF into Data URL if under 6MB
        if (file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf")) {
          const reader = new FileReader();
          reader.onload = function(e) {
            msInput._uploadedPdfDataUrl = e.target.result;
          };
          reader.readAsDataURL(file);
        } else {
          msInput._uploadedPdfDataUrl = null;
        }

        showToast("Manuscript attached: " + file.name);
      }
    });
  }

  if (msRemove) {
    msRemove.addEventListener("click", function() {
      if (msInput) {
        msInput.value = "";
        msInput._uploadedPdfDataUrl = null;
      }
      if (msBadge) msBadge.style.display = "none";
      if (msDropzone) msDropzone.style.display = "block";
    });
  }

  // Cover art dropzone & input
  const coverDropzone = document.getElementById("cover-dropzone");
  const coverInput = document.getElementById("cover-file-input");
  const coverBadge = document.getElementById("cover-file-badge");
  const coverFilename = document.getElementById("cover-filename");
  const coverRemove = document.getElementById("cover-file-remove");
  const coverPreview = document.getElementById("cover-preview-card");
  const coverImg = document.getElementById("cover-preview-img");
  const reqCoverCheck = document.getElementById("request-cover-design");

  if (coverInput) {
    coverInput.addEventListener("change", function() {
      if (this.files && this.files[0]) {
        const file = this.files[0];
        if (coverFilename) coverFilename.textContent = file.name;
        if (coverBadge) coverBadge.style.display = "flex";
        if (coverDropzone) coverDropzone.style.display = "none";

        if (file.type.startsWith("image/") && coverPreview && coverImg) {
          const reader = new FileReader();
          reader.onload = function(e) {
            coverImg.src = e.target.result;
            coverPreview.style.display = "block";
            coverInput._uploadedBase64 = e.target.result;
          };
          reader.readAsDataURL(file);
        }
        showToast("Cover artwork attached: " + file.name);
      }
    });
  }

  if (coverRemove) {
    coverRemove.addEventListener("click", function() {
      if (coverInput) {
        coverInput.value = "";
        coverInput._uploadedBase64 = null;
      }
      if (coverBadge) coverBadge.style.display = "none";
      if (coverPreview) coverPreview.style.display = "none";
      if (coverDropzone) coverDropzone.style.display = "block";
    });
  }

  if (reqCoverCheck) {
    reqCoverCheck.addEventListener("change", function() {
      if (this.checked) {
        if (coverDropzone) coverDropzone.style.opacity = "0.4";
        showToast("Reason Press in-house cover design requested");
      } else {
        if (coverDropzone) coverDropzone.style.opacity = "1";
      }
    });
  }

  // Submission handler
  form.addEventListener("submit", async function(e) {
    e.preventDefault();

    const currentUser = typeof getCurrentUser === "function" ? getCurrentUser() : null;
    if (!currentUser) {
      showToast("Please sign in to submit your manuscript for peer review.");
      openAccountModal('signin');
      return;
    }
    const authorName = (document.getElementById("author-name")?.value || currentUser.name || "Author").trim();
    const authorEmail = (document.getElementById("author-email")?.value || currentUser.email).trim();
    const authorPhone = (document.getElementById("author-phone")?.value || "").trim();
    const authorLocation = (document.getElementById("author-location")?.value || "").trim();
    const bookTitle = (document.getElementById("manuscript-title")?.value || "Untitled Book").trim();
    const bookSubtitle = (document.getElementById("manuscript-subtitle")?.value || "").trim();
    const category = (document.getElementById("manuscript-category")?.value || "philosophy");
    const wordCount = (document.getElementById("manuscript-words")?.value || "50,000 words").trim();
    const purpose = (document.getElementById("manuscript-purpose")?.value || "Submitted manuscript.").trim();
    const sampleText = (document.getElementById("manuscript-sample-text")?.value || "").trim();

    const submitBtn = document.getElementById("publish-submit-btn");
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>Uploading Files to Storage...</span>`;
    }

    let manuscriptFileUrl = null;
    let msFile = msInput?.files[0]?.name || "manuscript.pdf";
    if (msInput?.files && msInput.files[0]) {
      try {
        manuscriptFileUrl = await FirebaseService.uploadFile(msInput.files[0], "manuscripts");
      } catch (err) {
        console.warn("Storage upload error for manuscript:", err);
      }
    }

    let coverFileUrl = null;
    const coverChoice = reqCoverCheck?.checked 
      ? "Bespoke Cover Design by Reason Press Art Dept" 
      : (coverInput?.files[0]?.name || "Author Submitted Cover Art");
    if (!reqCoverCheck?.checked && coverInput?.files && coverInput.files[0]) {
      try {
        coverFileUrl = await FirebaseService.uploadFile(coverInput.files[0], "covers");
      } catch (err) {
        console.warn("Storage upload error for cover:", err);
      }
    }

    const newSubmission = {
      author: authorName,
      email: authorEmail,
      phone: authorPhone || "Not provided",
      location: authorLocation || "Global",
      title: bookTitle,
      subtitle: bookSubtitle,
      category: category,
      wordCount: wordCount,
      purpose: purpose,
      sampleText: sampleText || null,
      manuscriptName: msFile,
      manuscriptUrl: manuscriptFileUrl,
      coverTreatment: coverChoice,
      coverImage: coverFileUrl,
      coverPreset: Math.floor(1 + Math.random() * 8),
      status: "pending",
      submittedAt: "Just now",
      submittedBy: currentUser.email,
      userId: currentUser.uid || null
    };

    let createdDoc = null;
    if (typeof FirebaseService !== "undefined") {
      try {
        createdDoc = await FirebaseService.submitManuscript(newSubmission);
      } catch (err) {
        console.error("Firestore submission error:", err);
      }
    }

    const submissionId = createdDoc?.id || ("SUB-" + Math.floor(10000 + Math.random() * 90000));
      form.innerHTML = `
        <div style="padding:var(--space-10);background:var(--paper-mid);border:1px solid var(--rule);border-radius:3px;text-align:center;">
          <div style="width:60px;height:60px;border-radius:50%;background:var(--accent-subtle);color:var(--accent);display:inline-flex;align-items:center;justify-content:center;margin-bottom:var(--space-4);">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
          </div>
          <h3 style="font-family:var(--font-display);font-size:var(--text-3xl);color:var(--ink);margin-bottom:var(--space-2);">Manuscript &amp; Cover Received</h3>
          <p style="font-family:var(--font-serif);font-size:var(--text-lg);color:var(--ink-light);line-height:1.7;max-width:52ch;margin:0 auto var(--space-6);">
            Thank you, <strong style="color:var(--ink);">${authorName}</strong>. Your proposal for <em style="color:var(--ink);">&ldquo;${bookTitle}&rdquo;</em> has been transmitted to our editorial desk.
          </p>

          <div style="background:var(--paper);border:1px solid var(--rule);border-radius:2px;padding:var(--space-6);max-width:480px;margin:0 auto var(--space-8);text-align:left;font-size:var(--text-xs);display:flex;flex-direction:column;gap:8px;">
            <div style="display:flex;justify-content:space-between;"><span style="color:var(--ink-muted);">Manuscript File:</span> <strong style="color:var(--ink);">${msFile}</strong></div>
            <div style="display:flex;justify-content:space-between;"><span style="color:var(--ink-muted);">Cover Treatment:</span> <strong style="color:var(--ink);">${coverChoice}</strong></div>
            <div style="display:flex;justify-content:space-between;"><span style="color:var(--ink-muted);">Editorial Queue:</span> <strong style="color:var(--accent-dark);">Priority Review (#MS-${Math.floor(10000 + Math.random() * 90000)})</strong></div>
            <div style="display:flex;justify-content:space-between;"><span style="color:var(--ink-muted);">Evaluation Period:</span> <strong style="color:var(--ink);">10&ndash;14 Business Days</strong></div>
          </div>

          <div style="display:flex;justify-content:center;gap:var(--space-4);flex-wrap:wrap;">
            <a href="community.html" class="btn btn--primary"><span>Join Author Community &rarr;</span></a>
            <a href="books.html" class="btn btn--outline"><span>Explore Published Catalogue</span></a>
          </div>
        </div>
      `;
      showToast("Manuscript successfully uploaded and submitted!");
  });
}

// ── Reddit-Style Literary Community (community.html) ──────────
const DEFAULT_COMMUNITY_POSTS = [
  {
    id: 1,
    type: "suggestion",
    flair: "Book Suggestion",
    flairClass: "flair--suggestion",
    author: "u/stoic_scholar",
    time: "3 hours ago",
    book: "Classical Philosophy",
    title: "Suggestion: Please publish a bespoke annotated translation of Seneca's 'Letters from a Stoic'",
    content: "Reason Press's typography and linen hardcovers would do immense justice to Seneca. Most available bookstore editions are mass-market paperbacks with paper so thin the ink bleeds. An edition produced on Reason Press's acid-free paper with wide editorial margins for personal reflections would be an immediate purchase for our philosophy salon.",
    votes: 246,
    userVoted: null,
    comments: [
      {
        id: 101,
        author: "Reason Press Editorial Board",
        isEditor: true,
        time: "1 hour ago",
        text: "Thank you for this wonderful suggestion. We are actually exploring a curated 'Epistolary Ethics' series for Autumn 2027 that includes Seneca, Marcus Aurelius, and Montaigne with contemporary contextual introductions."
      },
      {
        id: 102,
        author: "u/claire_reads",
        isEditor: false,
        time: "45 minutes ago",
        text: "Wholeheartedly second this! Especially if it includes the unabridged 124 letters rather than the abridged selections usually sold in shops."
      }
    ]
  },
  {
    id: 2,
    type: "question",
    flair: "Question",
    flairClass: "flair--question",
    author: "u/david_k_arch",
    time: "5 hours ago",
    book: "The Architecture of Thought",
    title: "Question: Does the digital PDF edition include the vector schematics and margin plates?",
    content: "I want to purchase the PDF edition for my tablet before investing in the linen Hardcover collector's copy. Can someone from the press or a reader confirm whether the architectural drawings in Chapter 3 are rendered in crisp vector paths, or are they compressed bitmaps?",
    votes: 182,
    userVoted: null,
    comments: [
      {
        id: 201,
        author: "Reason Press Production Team",
        isEditor: true,
        time: "3 hours ago",
        text: "Yes, absolutely! All Reason Press digital PDF editions are typeset from our original vector typographic plates. You can zoom to 500% on any Retina display and every line in Chapter 3 remains razor-sharp."
      },
      {
        id: 202,
        author: "u/david_k_arch",
        isEditor: false,
        time: "2 hours ago",
        text: "Brilliant, ordering the PDF now. Appreciate the fast confirmation!"
      }
    ]
  },
  {
    id: 3,
    type: "suggestion",
    flair: "Book Suggestion",
    flairClass: "flair--suggestion",
    author: "u/sound_and_silence",
    time: "Yesterday",
    book: "Quiet Hours",
    title: "Suggestion: Consider an author-narrated companion recording or vinyl pressing for Quiet Hours",
    content: "Sharma's prose on stillness and uncrowded thought reads like cadence poetry. Has Reason Press considered releasing an acoustic spoken-word companion or vinyl edition to accompany evening reading sessions?",
    votes: 94,
    userVoted: null,
    comments: [
      {
        id: 301,
        author: "u/elena_m",
        isEditor: false,
        time: "18 hours ago",
        text: "That would be extraordinary. Chapter 4 ('On Uncrowded Mornings') would sound incredible as a meditation audio piece."
      }
    ]
  },
  {
    id: 4,
    type: "question",
    flair: "Question",
    flairClass: "flair--question",
    author: "u/novelist_james",
    time: "2 days ago",
    book: "Publishing & Submissions",
    title: "Question for Editors: How detailed is editorial feedback on unsolicited manuscript submissions?",
    content: "I just reviewed the new submission form on the website where we can upload DOCX and PDF manuscripts directly. Does every submission receive a constructive assessment memo, even if not selected for publication this season?",
    votes: 79,
    userVoted: null,
    comments: [
      {
        id: 401,
        author: "Reason Press Editorial Board",
        isEditor: true,
        time: "1 day ago",
        text: "Because we deliberately publish fewer than eight titles per year, our editorial board reads every proposal. While we cannot provide full developmental line-edits to unselected manuscripts, every author receives a personalized 2-paragraph editorial appraisal outlining our assessment."
      }
    ]
  },
  {
    id: 5,
    type: "discussion",
    flair: "Book Discussion",
    flairClass: "flair--discussion",
    author: "u/marcus_inquiry",
    time: "3 days ago",
    book: "Terra Firma",
    title: "Discussion: The concept of 'Enduring Shelf Life' vs ephemeral digital feeds",
    content: "In Chapter 2 of Terra Firma, the author argues that reading on algorithms destroys cognitive depth because the medium is designed for immediate displacement. How has deliberate reading of physical or offline PDF books changed your concentration over the last year?",
    votes: 215,
    userVoted: null,
    comments: [
      {
        id: 501,
        author: "u/sophia_read",
        isEditor: false,
        time: "2 days ago",
        text: "I switched off all notifications during my 8-10 PM reading block. Within three weeks, my ability to hold multifaceted philosophical arguments returned."
      },
      {
        id: 502,
        author: "u/harper_b",
        isEditor: false,
        time: "2 days ago",
        text: "Physical books have a spatial geography. You remember that an idea was on the top-left of a page about two-thirds through. Digital feeds have no geography."
      }
    ]
  }
];

let communityPosts = [];
let currentForumSort = "hot";
let currentForumFilter = "all";

function loadCommunityPosts() {
  const saved = localStorage.getItem("reason_press_forum_posts");
  if (saved) {
    try {
      communityPosts = JSON.parse(saved);
    } catch(e) {
      communityPosts = [...DEFAULT_COMMUNITY_POSTS];
    }
  } else {
    communityPosts = [...DEFAULT_COMMUNITY_POSTS];
    saveCommunityPosts();
  }
}

function saveCommunityPosts() {
  try {
    localStorage.setItem("reason_press_forum_posts", JSON.stringify(communityPosts));
  } catch(e) {}
}

function renderCommunityFeed() {
  const container = document.getElementById("forum-posts-container");
  if (!container) return;

  // Filter
  let filtered = communityPosts.filter(post => {
    if (currentForumFilter === "all") return true;
    return post.type === currentForumFilter;
  });

  // Sort
  if (currentForumSort === "hot") {
    filtered.sort((a, b) => (b.votes + b.comments.length * 2) - (a.votes + a.comments.length * 2));
  } else if (currentForumSort === "top") {
    filtered.sort((a, b) => b.votes - a.votes);
  } else if (currentForumSort === "new") {
    filtered.sort((a, b) => b.id - a.id);
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="text-align:center;padding:var(--space-12) 0;color:var(--ink-muted);">
        <p style="font-family:var(--font-serif);font-size:var(--text-lg);">No posts found in this filter.</p>
        <button class="btn btn--primary" style="margin-top:var(--space-4);" onclick="togglePostForm()">
          <span>+ Be the first to ask or suggest</span>
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(post => `
    <div class="reddit-post" id="post-${post.id}">
      <!-- Vote Pillar -->
      <div class="reddit-post__vote-pillar">
        <button class="vote-arrow ${post.userVoted === 'up' ? 'voted-up' : ''}" 
                onclick="voteCommunityPost(${post.id}, 'up')" 
                title="Upvote" 
                aria-label="Upvote post">▲</button>
        <span class="vote-count">${post.votes}</span>
        <button class="vote-arrow ${post.userVoted === 'down' ? 'voted-down' : ''}" 
                onclick="voteCommunityPost(${post.id}, 'down')" 
                title="Downvote" 
                aria-label="Downvote post">▼</button>
      </div>

      <!-- Main Content -->
      <div class="reddit-post__main">
        <div class="reddit-post__meta">
          <span class="flair ${post.flairClass}">${post.flair}</span>
          <span class="reddit-post__author">${post.author}</span>
          <span>&bull;</span>
          <span>${post.time}</span>
          ${post.book ? `<span>&bull;</span> <span style="color:var(--ink);font-weight:500;">Re: <em>${post.book}</em></span>` : ""}
        </div>

        <h3 class="reddit-post__title">${post.title}</h3>
        <div class="reddit-post__body">${post.content}</div>

        <div class="reddit-post__footer">
          <button class="reddit-post__btn" onclick="togglePostComments(${post.id})">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
            <span>${post.comments.length} Comments</span>
          </button>
          <button class="reddit-post__btn" onclick="shareCommunityPost(${post.id})">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
            <span>Share</span>
          </button>
          <button class="reddit-post__btn" onclick="showToast('Post bookmarked to your reading list')">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
            <span>Save</span>
          </button>
        </div>

        <!-- Threaded Comments -->
        <div class="comments-thread" id="comments-${post.id}">
          <div class="comments-list">
            ${post.comments.map(c => `
              <div class="comment-item ${c.isEditor ? 'comment-item--editor' : ''}">
                <div class="comment-item__header">
                  <span style="font-weight:700;color:var(--ink);">${c.author}</span>
                  ${c.isEditor ? `<span class="comment-badge-editor">Verified Editor</span>` : ''}
                  <span>&bull; ${c.time}</span>
                </div>
                <div class="comment-item__body">${c.text}</div>
              </div>
            `).join("")}
          </div>

          <!-- Add Comment Box -->
          <div class="comment-reply-box">
            <input type="text" class="comment-reply-input" id="reply-input-${post.id}" placeholder="Write a response or answer to this post..." onkeydown="if(event.key==='Enter') submitComment(${post.id})">
            <button class="comment-reply-btn" onclick="submitComment(${post.id})">Reply</button>
          </div>
        </div>

      </div>
    </div>
  `).join("");
}

function voteCommunityPost(postId, direction) {
  const post = communityPosts.find(p => p.id === postId);
  if (!post) return;

  if (post.userVoted === direction) {
    // Undo vote
    post.votes += (direction === "up" ? -1 : 1);
    post.userVoted = null;
  } else if (post.userVoted) {
    // Switch vote
    post.votes += (direction === "up" ? 2 : -2);
    post.userVoted = direction;
  } else {
    // New vote
    post.votes += (direction === "up" ? 1 : -1);
    post.userVoted = direction;
  }

  saveCommunityPosts();
  renderCommunityFeed();
}

function togglePostComments(postId) {
  const drawer = document.getElementById("comments-" + postId);
  if (drawer) {
    drawer.classList.toggle("open");
  }
}

function submitComment(postId) {
  const user = getCurrentUser();
  if (!user) {
    showToast("Please sign in to reply to this discussion.");
    openAccountModal('signin');
    return;
  }
  const input = document.getElementById("reply-input-" + postId);
  if (!input) return;
  const text = input.value.trim();
  if (!text) return;

  const post = communityPosts.find(p => p.id === postId);
  if (!post) return;

  post.comments.push({
    id: Date.now(),
    author: user.name,
    isEditor: user.role === "admin",
    time: "Just now",
    text: text
  });

  saveCommunityPosts();
  renderCommunityFeed();
  const drawer = document.getElementById("comments-" + postId);
  if (drawer) drawer.classList.add("open");
  showToast("Comment posted to thread");
}

function shareCommunityPost(postId) {
  const url = window.location.origin + window.location.pathname + "#post-" + postId;
  if (navigator.clipboard) {
    navigator.clipboard.writeText(url).catch(() => {});
  }
  showToast("Thread link copied to clipboard");
}

function changeForumSort(sort) {
  currentForumSort = sort;
  document.querySelectorAll("#sort-filters .forum-filter-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.sort === sort);
  });
  renderCommunityFeed();
}

function changeForumFilter(filter) {
  currentForumFilter = filter;
  document.querySelectorAll("#flair-filters .forum-filter-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.filter === filter);
  });
  renderCommunityFeed();
}

function togglePostForm() {
  const user = getCurrentUser();
  if (!user) {
    showToast("Please sign in to start a new discussion topic.");
    openAccountModal('signin');
    return;
  }
  const card = document.getElementById("create-post-card");
  if (card) {
    const isHidden = card.style.display === "none";
    card.style.display = isHidden ? "block" : "none";
    if (isHidden) {
      card.scrollIntoView({ behavior: "smooth", block: "nearest" });
      document.getElementById("post-title")?.focus();
    }
  }
}

function selectPostType(type) {
  const input = document.getElementById("post-type");
  if (input) input.value = type;
  document.querySelectorAll(".forum-type-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.type === type);
  });
}

function submitCommunityPost() {
  const user = getCurrentUser();
  if (!user) {
    showToast("Please sign in to publish a community thread.");
    openAccountModal('signin');
    return;
  }
  const type = document.getElementById("post-type")?.value || "question";
  let author = user ? user.name : "u/anonymous_reader";
  const book = document.getElementById("post-book")?.value || "";
  const title = document.getElementById("post-title")?.value.trim();
  const content = document.getElementById("post-content")?.value.trim();

  if (!title || !content) {
    showToast("Please provide both a title and description");
    return;
  }

  const flairMap = {
    question: { name: "Question", cls: "flair--question" },
    suggestion: { name: "Book Suggestion", cls: "flair--suggestion" },
    discussion: { name: "Book Discussion", cls: "flair--discussion" }
  };

  const newPost = {
    id: Date.now(),
    type: type,
    flair: flairMap[type]?.name || "Discussion",
    flairClass: flairMap[type]?.cls || "flair--discussion",
    author: author,
    time: "Just now",
    book: book,
    title: title,
    content: content,
    votes: 1,
    userVoted: "up",
    comments: []
  };

  communityPosts.unshift(newPost);
  saveCommunityPosts();
  renderCommunityFeed();
  togglePostForm();
  document.getElementById("community-create-form")?.reset();
  showToast("Your post has been published to r/ReasonPress!");
}

function initCommunityForum() {
  if (document.getElementById("forum-posts-container")) {
    loadCommunityPosts();
    renderCommunityFeed();
  }
}

// ── Homepage Dynamic Book Wall ──────────────────────────────
function renderHomeBookWall() {
  const wall = document.querySelector(".book-wall");
  if (!wall) return;

  const books = getBooks();
  const featured = books.filter(b => b.isFeatured !== false);
  const displayBooks = featured.length >= 4 ? featured.slice(0, 6) : books.slice(0, 6);

  wall.innerHTML = displayBooks.map((book, idx) => {
    const delayClass = idx % 3 === 1 ? "reveal--delay-1" : idx % 3 === 2 ? "reveal--delay-2" : "";
    const priceHardcover = book.priceHardcoverINR ?? (book.price && book.price > 100 ? book.price : Math.round(book.price * 75 || 1999));
    const pricePdf = book.priceDigitalINR ?? 899;

    const coverHtml = book.coverImage
      ? `<div class="book-cover book-cover--custom book-wall__cover" style="position:relative;overflow:hidden;box-shadow:var(--shadow-book);">
          <img src="${book.coverImage}" alt="${book.title}">
          <div class="book-cover__binding"></div>
          ${book.isNew ? '<span class="badge-tag badge-tag--new" style="position:absolute;top:8px;right:8px;z-index:4;box-shadow:0 2px 6px rgba(0,0,0,0.15);">New</span>' : ''}
        </div>`
      : `<div class="book-cover book-cover--${book.cover || 1} book-wall__cover" style="position:relative;">
          <div class="book-cover__art"></div>
          <div class="book-cover__content">
            <div>
              <div class="book-cover__title">${book.title}</div>
              <div class="book-cover__author">${book.author}</div>
            </div>
            <div class="book-cover__press">Reason Press</div>
          </div>
          <div class="book-cover__binding"></div>
          ${book.isNew ? '<span class="badge-tag badge-tag--new" style="position:absolute;top:8px;right:8px;z-index:4;">New</span>' : ''}
        </div>`;

    return `
      <div class="book-wall__item reveal visible ${delayClass}" onclick="location.href='book.html?id=${book.id}'" id="wall-book-${book.id}" tabindex="0" role="button" aria-label="${book.title} by ${book.author}">
        ${coverHtml}
        <div class="book-wall__info">
          <div class="book-wall__title">${book.title}</div>
          <div class="book-wall__author">${book.author}</div>
          <div class="book-wall__meta-row">
            <span class="book-wall__price">₹${priceHardcover.toLocaleString('en-IN')} / PDF ₹${pricePdf.toLocaleString('en-IN')}</span>
            <span class="badge-format">Print + PDF</span>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

// ── Books Catalogue Dynamic Grid (books.html) ───────────────
function renderCatalogueGrid() {
  const grid = document.getElementById("books-grid");
  if (!grid) return;

  const tabsWrap = document.querySelector(".books-tabs");
  const cats = getCategories();
  const activeTabEl = document.querySelector(".books-tab.active");
  const activeCat = activeTabEl ? activeTabEl.dataset.cat : "all";

  if (tabsWrap) {
    tabsWrap.innerHTML = `
      <button class="books-tab ${activeCat === 'all' ? 'active' : ''}" role="tab" aria-selected="${activeCat === 'all'}" data-cat="all">All Works</button>
    ` + cats.filter(c => c.id !== 'all').map(c => `
      <button class="books-tab ${activeCat === c.id ? 'active' : ''}" role="tab" aria-selected="${activeCat === c.id}" data-cat="${c.id}">${c.label}</button>
    `).join("");

    // Wire tab clicks
    tabsWrap.querySelectorAll(".books-tab").forEach(tab => {
      tab.addEventListener("click", () => {
        tabsWrap.querySelectorAll(".books-tab").forEach(t => {
          t.classList.remove("active");
          t.setAttribute("aria-selected", "false");
        });
        tab.classList.add("active");
        tab.setAttribute("aria-selected", "true");
        filterDynamicBooks();
      });
    });
  }

  const books = getBooks();
  const sortSelect = document.getElementById("sort-select");
  const sortVal = sortSelect ? sortSelect.value : "Curated Order";

  let sorted = [...books];
  if (sortVal === "Price: Low to High") {
    sorted.sort((a, b) => {
      const pA = a.priceHardcoverINR ?? (a.price > 100 ? a.price : Math.round(a.price * 75 || 1999));
      const pB = b.priceHardcoverINR ?? (b.price > 100 ? b.price : Math.round(b.price * 75 || 1999));
      return pA - pB;
    });
  } else if (sortVal === "Price: High to Low") {
    sorted.sort((a, b) => {
      const pA = a.priceHardcoverINR ?? (a.price > 100 ? a.price : Math.round(a.price * 75 || 1999));
      const pB = b.priceHardcoverINR ?? (b.price > 100 ? b.price : Math.round(b.price * 75 || 1999));
      return pB - pA;
    });
  }

  grid.innerHTML = sorted.map((book, idx) => {
    const delayClass = idx % 3 === 1 ? "reveal--delay-1" : idx % 3 === 2 ? "reveal--delay-2" : "";
    const priceHardcover = book.priceHardcoverINR ?? (book.price && book.price > 100 ? book.price : Math.round(book.price * 75 || 1999));
    const pricePdf = book.priceDigitalINR ?? 899;

    const coverHtml = book.coverImage
      ? `<div class="book-cover book-cover--custom" style="position:relative;overflow:hidden;box-shadow:var(--shadow-book);">
          <img src="${book.coverImage}" alt="${book.title}">
          <div class="book-cover__binding"></div>
          ${book.isNew ? '<span class="badge-tag badge-tag--new" style="position:absolute;top:8px;right:8px;z-index:4;box-shadow:0 2px 6px rgba(0,0,0,0.15);">New</span>' : ''}
        </div>`
      : `<div class="book-cover book-cover--${book.cover || 1}" style="position:relative;">
          <div class="book-cover__art"></div>
          <div class="book-cover__content">
            <div>
              <div class="book-cover__title">${book.title}</div>
              <div class="book-cover__author">${book.author}</div>
            </div>
            <div class="book-cover__press">Reason Press</div>
          </div>
          <div class="book-cover__binding"></div>
          ${book.isNew ? '<span class="badge-tag badge-tag--new" style="position:absolute;top:8px;right:8px;z-index:4;">New</span>' : ''}
        </div>`;

    return `
      <div data-item data-cat="${book.category}" class="reveal visible ${delayClass}">
        <div class="book-item" data-cat="${book.category}">
          <div class="book-item__cover-wrap">
            ${coverHtml}
            <div class="book-item__overlay">
              <a href="book.html?id=${book.id}" class="book-item__overlay-btn" id="grid-book-${book.id}">View Book</a>
            </div>
          </div>
          <div class="book-item__meta">
            <a href="book.html?id=${book.id}" class="book-item__title">${book.title}</a>
            <div class="book-item__author">${book.author}</div>
            <div class="book-item__row">
              <span class="book-item__category">${book.categoryLabel || book.category}</span>
              <span class="book-item__price">₹${priceHardcover.toLocaleString('en-IN')} / PDF ₹${pricePdf.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join("");

  if (sortSelect) {
    sortSelect.onchange = () => renderCatalogueGrid();
  }

  filterDynamicBooks();
}

function filterDynamicBooks() {
  const activeTab = document.querySelector(".books-tab.active");
  const cat = activeTab ? activeTab.dataset.cat : "all";
  document.querySelectorAll("#books-grid [data-item]").forEach(cell => {
    const itemCat = cell.dataset.cat || "";
    const match = cat === "all" || itemCat === cat;
    cell.style.display = match ? "" : "none";
  });
}

// ── Live Site Settings Synchronization ──────────────────────
function applySiteSettingsToPage() {
  const settings = getSiteSettings();

  // Motto / Taglines
  document.querySelectorAll(".hero__tagline, #hero-tagline, .brand-motto").forEach(el => {
    if (settings.motto) el.textContent = settings.motto;
  });

  // Manifesto Heading & Text
  const manifestoHead = document.getElementById("manifesto-heading");
  if (manifestoHead && settings.manifestoHeading) manifestoHead.textContent = settings.manifestoHeading;

  const manifestoText = document.getElementById("manifesto-text");
  if (manifestoText && settings.manifestoText) manifestoText.textContent = settings.manifestoText;

  // About Page
  const aboutLead = document.querySelector(".about-manifesto__body p:first-child");
  if (aboutLead && settings.manifestoText) aboutLead.textContent = settings.manifestoText;

  // Contact info
  document.querySelectorAll(".site-contact-email").forEach(el => {
    if (settings.contactEmail) {
      el.textContent = settings.contactEmail;
      if (el.tagName === "A") el.href = `mailto:${settings.contactEmail}`;
    }
  });

  document.querySelectorAll(".site-orders-email").forEach(el => {
    if (settings.ordersEmail) {
      el.textContent = settings.ordersEmail;
      if (el.tagName === "A") el.href = `mailto:${settings.ordersEmail}`;
    }
  });

  document.querySelectorAll(".site-contact-phone").forEach(el => {
    if (settings.contactPhone) el.textContent = settings.contactPhone;
  });

  document.querySelectorAll(".site-contact-address").forEach(el => {
    if (settings.address) el.textContent = settings.address;
  });
}

// ── Secret 5-Click Admin Access on Navbar Contact ────────────
// ── Secret 5-Click Admin Access on Navbar Contact ────────────
function initAdminSecretAccess() {
  const contactLinks = document.querySelectorAll('a[href*="contact.html"]');

  contactLinks.forEach(link => {
    link.addEventListener("click", function(e) {
      const isHeaderOrDrawer = this.closest(".nav") || this.closest(".nav-drawer") || this.closest("header") || this.closest(".footer");
      if (!isHeaderOrDrawer) return;

      const now = Date.now();
      const lastClick = parseInt(sessionStorage.getItem("rp_contact_click_time") || "0", 10);
      let count = parseInt(sessionStorage.getItem("rp_contact_clicks") || "0", 10);

      // If clicked within 4 seconds of previous click, increment counter
      if (now - lastClick < 4000) {
        count++;
      } else {
        count = 1;
      }

      sessionStorage.setItem("rp_contact_click_time", String(now));
      sessionStorage.setItem("rp_contact_clicks", String(count));

      if (count >= 5) {
        e.preventDefault();
        e.stopPropagation();
        sessionStorage.removeItem("rp_contact_clicks");
        sessionStorage.removeItem("rp_contact_click_time");
        window.location.href = "admin-login.html";
        return;
      }

      // If already on contact.html, prevent reloading page so user can tap 5 times comfortably
      const isAlreadyOnContact = window.location.pathname.endsWith("contact.html") || window.location.pathname.endsWith("contact");
      if (isAlreadyOnContact) {
        e.preventDefault();
      }
    });
  });
}

// ── Universal Account & Authentication System ─────────────────
function getCurrentUser() {
  try {
    const raw = localStorage.getItem("rp_current_user");
    return raw ? JSON.parse(raw) : null;
  } catch(e) {
    return null;
  }
}

function setCurrentUser(user) {
  try {
    if (user) {
      localStorage.setItem("rp_current_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("rp_current_user");
    }
    renderNavAccount();
  } catch(e) {}
}

function initAccountSystem() {
  // Auto-inject nav account button if not present in .nav__actions
  const navActions = document.querySelector(".nav__actions");
  if (navActions && !document.getElementById("nav-account-wrap")) {
    const wrap = document.createElement("div");
    wrap.className = "nav__account-wrapper";
    wrap.id = "nav-account-wrap";
    wrap.innerHTML = `
      <button type="button" class="nav__account-btn" id="nav-account-btn" aria-label="Account" aria-haspopup="true" aria-expanded="false" onclick="handleNavAccountClick()">
        <span class="nav__account-avatar" id="nav-account-avatar">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
        </span>
        <span class="nav__account-name" id="nav-account-name">Sign In</span>
        <span class="nav__account-caret" aria-hidden="true">&caron;</span>
      </button>
      <div class="nav__account-dropdown" id="nav-account-dropdown" role="menu" style="display:none;"></div>
    `;
    navActions.insertBefore(wrap, navActions.firstChild);
  }

  // Auto-inject Auth Modal if missing from DOM
  if (!document.getElementById("account-modal")) {
    const modalEl = document.createElement("div");
    modalEl.className = "auth-modal-overlay";
    modalEl.id = "account-modal";
    modalEl.innerHTML = `
      <div class="auth-modal" role="dialog" aria-modal="true">
        <div class="auth-modal__header">
          <div style="display:flex;align-items:center;gap:10px;">
            <img src="assets/favicon.png" alt="Reason Press" style="height:26px;">
            <h3 style="font-family:var(--font-display);font-size:var(--text-lg);margin:0;color:var(--ink);">
              Reason Press Account
            </h3>
          </div>
          <button type="button" onclick="closeAccountModal()" style="background:none;border:none;font-size:24px;cursor:pointer;color:var(--ink-muted);">&times;</button>
        </div>
        <div class="auth-modal__tabs">
          <button type="button" class="auth-tab-btn active" id="tab-btn-signin" onclick="switchAuthTab('signin')">Sign In</button>
          <button type="button" class="auth-tab-btn" id="tab-btn-register" onclick="switchAuthTab('register')">Create Account</button>
        </div>
        <div style="padding:var(--space-6);">
          <form id="form-signin" onsubmit="event.preventDefault(); handleUserSignInSubmit();">
            <button type="button" class="btn-google-auth" onclick="handleGlobalGoogleSignIn()" style="margin-bottom:var(--space-4);">
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.02h3.87c2.26-2.09 3.67-5.17 3.67-9.12z"/>
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.87-3.02c-1.08.72-2.45 1.16-4.06 1.16-3.13 0-5.78-2.11-6.73-4.96H1.28v3.11C3.26 21.3 7.36 24 12 24z"/>
                <path fill="#FBBC05" d="M5.27 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.62H1.28C.46 8.24 0 10.06 0 12s.46 3.76 1.28 5.38l3.99-3.11z"/>
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.36 0 3.26 2.7 1.28 6.62l3.99 3.11c.95-2.85 3.6-4.98 6.73-4.98z"/>
              </svg>
              <span>Continue with Google</span>
            </button>
            <div class="auth-divider">
              <div class="auth-divider-line"></div>
              <span class="auth-divider-text">or with email</span>
              <div class="auth-divider-line"></div>
            </div>
            <div class="form-field" style="margin-bottom:var(--space-4);">
              <label class="form-label" for="signin-email">Email Address <span style="color:var(--accent);">*</span></label>
              <input class="form-input" type="email" id="signin-email" placeholder="name@domain.com" required autocomplete="email">
            </div>
            <div class="form-field" style="margin-bottom:var(--space-2);">
              <div style="display:flex;justify-content:space-between;align-items:center;">
                <label class="form-label" for="signin-password" style="margin:0;">Password <span style="color:var(--accent);">*</span></label>
                <button type="button" onclick="handleModalForgotPassword()" style="background:none;border:none;color:var(--accent-dark);font-size:11px;text-decoration:underline;cursor:pointer;">Forgot?</button>
              </div>
              <input class="form-input" type="password" id="signin-password" placeholder="••••••••" required autocomplete="current-password">
            </div>
            <button type="submit" class="btn btn--primary" id="signin-submit-btn" style="width:100%;justify-content:center;margin-top:var(--space-4);">
              <span>Sign In &rarr;</span>
            </button>
            <div style="text-align:center;margin-top:var(--space-4);">
              <a href="login.html" style="font-size:12px;color:var(--accent-dark);text-decoration:none;">Open full sign-in page &rarr;</a>
            </div>
          </form>
          <form id="form-register" style="display:none;" onsubmit="event.preventDefault(); handleUserRegisterSubmit();">
            <button type="button" class="btn-google-auth" onclick="handleGlobalGoogleSignIn()" style="margin-bottom:var(--space-4);">
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.02h3.87c2.26-2.09 3.67-5.17 3.67-9.12z"/>
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.87-3.02c-1.08.72-2.45 1.16-4.06 1.16-3.13 0-5.78-2.11-6.73-4.96H1.28v3.11C3.26 21.3 7.36 24 12 24z"/>
                <path fill="#FBBC05" d="M5.27 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.62H1.28C.46 8.24 0 10.06 0 12s.46 3.76 1.28 5.38l3.99-3.11z"/>
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.36 0 3.26 2.7 1.28 6.62l3.99 3.11c.95-2.85 3.6-4.98 6.73-4.98z"/>
              </svg>
              <span>Continue with Google</span>
            </button>
            <div class="auth-divider">
              <div class="auth-divider-line"></div>
              <span class="auth-divider-text">or with email</span>
              <div class="auth-divider-line"></div>
            </div>
            <div class="form-field" style="margin-bottom:var(--space-3);">
              <label class="form-label" for="reg-name">Full Name <span style="color:var(--accent);">*</span></label>
              <input class="form-input" type="text" id="reg-name" placeholder="Dr. Thomas Ashworth" required autocomplete="name">
            </div>
            <div class="form-field" style="margin-bottom:var(--space-3);">
              <label class="form-label" for="reg-email">Email Address <span style="color:var(--accent);">*</span></label>
              <input class="form-input" type="email" id="reg-email" placeholder="name@domain.com" required autocomplete="email">
            </div>
            <div class="form-field" style="margin-bottom:var(--space-4);">
              <label class="form-label" for="reg-password">Password (6+ chars) <span style="color:var(--accent);">*</span></label>
              <input class="form-input" type="password" id="reg-password" placeholder="••••••••" required autocomplete="new-password" minlength="6">
            </div>
            <button type="submit" class="btn btn--primary" id="reg-submit-btn" style="width:100%;justify-content:center;">
              <span>Create Account &amp; Send Verification &rarr;</span>
            </button>
            <div style="text-align:center;margin-top:var(--space-4);">
              <a href="login.html" style="font-size:12px;color:var(--accent-dark);text-decoration:none;">Open full sign-in page &rarr;</a>
            </div>
          </form>
        </div>
      </div>
    `;
    document.body.appendChild(modalEl);
  }

  // Close dropdown on outside click
  document.addEventListener("click", (e) => {
    const wrap = document.getElementById("nav-account-wrap");
    const dropdown = document.getElementById("nav-account-dropdown");
    if (wrap && dropdown && !wrap.contains(e.target)) {
      dropdown.style.display = "none";
      const btn = document.getElementById("nav-account-btn");
      if (btn) btn.setAttribute("aria-expanded", "false");
    }
  });

  renderNavAccount();
  window.addEventListener("storage", renderNavAccount);
  window.addEventListener("focus", renderNavAccount);

  // Initialize Live Firebase Authentication Listener
  if (typeof FirebaseService !== "undefined" && typeof FirebaseService.initAuth === "function") {
    FirebaseService.initAuth(async (user, profile) => {
      if (user) {
        const userObj = {
          uid: user.uid,
          name: profile?.name || user.displayName || user.email.split("@")[0],
          email: user.email,
          role: profile?.role || "user",
          emailVerified: user.emailVerified,
          avatar: (profile?.name || user.email).charAt(0).toUpperCase()
        };
        setCurrentUser(userObj);
        if (userObj.role === "admin") {
          sessionStorage.setItem("rp_admin_logged_in", "true");
        }
        renderVerificationBanner(user);

        // Sync user cart from Cloud Firestore
        try {
          const remoteCart = await FirebaseService.getCart(user.uid);
          if (Array.isArray(remoteCart) && remoteCart.length > 0 && cart.length === 0) {
            cart.push(...remoteCart);
            saveCart();
          }
        } catch(e) {}
      } else {
        removeVerificationBanner();
      }
    });
  }
}

function renderVerificationBanner(firebaseUser) {
  if (!firebaseUser || firebaseUser.emailVerified) {
    removeVerificationBanner();
    return;
  }
  let banner = document.getElementById("rp-verification-banner");
  if (!banner) {
    banner = document.createElement("div");
    banner.id = "rp-verification-banner";
    banner.style.cssText = "background:#FFFBEB;border-bottom:1px solid #FDE68A;color:#92400E;padding:8px 16px;font-size:12px;display:flex;align-items:center;justify-content:center;gap:12px;flex-wrap:wrap;position:sticky;top:0;z-index:9999;";
    document.body.prepend(banner);
  }
  banner.innerHTML = `
    <span>Please verify your email (<strong>${firebaseUser.email}</strong>) to activate all reader features.</span>
    <button type="button" onclick="handleResendVerification()" style="background:#FEF3C7;border:1px solid #F59E0B;border-radius:3px;padding:3px 10px;font-size:11px;font-weight:600;color:#92400E;cursor:pointer;">Resend Link</button>
    <button type="button" onclick="handleCheckVerified()" style="background:#10B981;border:none;border-radius:3px;padding:3px 10px;font-size:11px;font-weight:600;color:#fff;cursor:pointer;">I've Verified</button>
    <button type="button" onclick="removeVerificationBanner()" style="background:none;border:none;color:#92400E;cursor:pointer;font-size:16px;line-height:1;" aria-label="Dismiss">&times;</button>
  `;
}

function removeVerificationBanner() {
  const banner = document.getElementById("rp-verification-banner");
  if (banner) banner.remove();
}

window.handleResendVerification = async function() {
  try {
    if (typeof FirebaseService !== "undefined") {
      await FirebaseService.resendVerificationEmail();
      showToast("Verification email sent! Check your inbox & spam folder.");
    }
  } catch(err) {
    showToast(err.message || "Could not resend email.");
  }
};

window.handleCheckVerified = async function() {
  try {
    if (typeof FirebaseService !== "undefined") {
      const u = await FirebaseService.reloadUserAuth();
      if (u && u.emailVerified) {
        removeVerificationBanner();
        showToast("✓ Email verified successfully! Thank you.");
        const user = getCurrentUser();
        if (user) {
          user.emailVerified = true;
          setCurrentUser(user);
        }
      } else {
        showToast("Email not yet verified. Please click the link in your email first.");
      }
    }
  } catch(err) {
    showToast("Error checking verification status.");
  }
};

function renderNavAccount() {
  const user = getCurrentUser();
  const btns = document.querySelectorAll(".nav__account-btn, #nav-account-btn");
  const avatarEls = document.querySelectorAll(".nav__account-avatar, #nav-account-avatar");
  const nameEls = document.querySelectorAll(".nav__account-name, #nav-account-name");
  const dropdown = document.getElementById("nav-account-dropdown");
  const mobileSlot = document.getElementById("mobile-account-slot");

  if (!btns.length && !document.getElementById("nav-account-btn")) return;

  btns.forEach(btn => {
    if (user) {
      btn.classList.add("signed-in");
    } else {
      btn.classList.remove("signed-in");
    }
  });

  avatarEls.forEach(el => {
    if (user) {
      el.textContent = user.avatar || user.name.charAt(0).toUpperCase();
    } else {
      el.innerHTML = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`;
    }
  });

  nameEls.forEach(el => {
    el.textContent = user ? user.name.split(" ")[0] : "Sign In";
  });

  if (user) {
    // Count user submissions
    let subs = [];
    try { subs = JSON.parse(localStorage.getItem("rp_submissions") || "[]"); } catch(e){}
    const userSubs = subs.filter(s => s.email === user.email || s.author === user.name || user.role === "admin");
    const pendingSubs = userSubs.filter(s => s.status === "pending").length;

    if (dropdown) {
      dropdown.innerHTML = `
        <div class="nav__account-header">
          <div class="nav__account-user-name">${user.name}</div>
          <div class="nav__account-user-email">${user.email}</div>
          <span class="nav__account-role-badge">
            ${user.role === "admin" ? "Press Editorial Director" : "Author &amp; Reader"}
          </span>
        </div>

        <a href="library.html" class="nav__account-menu-item">
          <span>My Personal Library &amp; Reader</span>
          <span class="badge-tag" style="background:#DCFCE7;color:#166534;">Online</span>
        </a>

        <a href="profile.html" class="nav__account-menu-item">
          <span>Reader Profile &amp; Address</span>
          <span class="badge-tag" style="background:#FEF3C7;color:#92400E;">Fast Checkout</span>
        </a>

        <button type="button" class="nav__account-menu-item" onclick="openUserManuscriptsModal()">
          <span>My Submitted Manuscripts</span>
          <span class="badge-tag" style="background:#EBF5FB;color:#1E6091;">${userSubs.length} (${pendingSubs} Pending)</span>
        </button>

        <a href="cart.html" class="nav__account-menu-item">
          <span>Reading Bag &amp; Orders</span>
          <span class="badge-tag" style="background:var(--accent-subtle);color:var(--accent-dark);">View Bag</span>
        </a>

        <button type="button" class="nav__account-menu-item logout-item" onclick="logoutUser()">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:8px;"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
          <span>Sign Out</span>
        </button>
      `;
    }

    if (mobileSlot) {
      mobileSlot.innerHTML = `
        <div style="display:flex;align-items:center;justify-content:space-between;padding:0 var(--space-4);">
          <div style="display:flex;align-items:center;gap:10px;">
            <div style="width:32px;height:32px;border-radius:50%;background:var(--accent);color:var(--white);display:flex;align-items:center;justify-content:center;font-weight:700;">
              ${user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <strong style="font-size:13px;color:var(--ink);">${user.name}</strong>
              <div style="font-size:11px;color:var(--ink-muted);">${user.email}</div>
            </div>
          </div>
          <button type="button" onclick="logoutUser()" style="background:none;border:none;color:#DC2626;font-size:12px;cursor:pointer;">
            Sign Out
          </button>
        </div>
      `;
    }

  } else {
    if (dropdown) dropdown.innerHTML = "";

    if (mobileSlot) {
      mobileSlot.innerHTML = `
        <div style="padding:0 var(--space-4);">
          <button type="button" class="btn btn--primary" style="width:100%;justify-content:center;font-size:12px;padding:10px;" onclick="openAccountModal()">
            <span>Sign In / Create Account</span>
          </button>
        </div>
      `;
    }
  }
}

function handleNavAccountClick() {
  const user = getCurrentUser();
  const dropdown = document.getElementById("nav-account-dropdown");
  const btn = document.getElementById("nav-account-btn");

  if (!user) {
    openAccountModal('signin');
  } else if (dropdown && btn) {
    const isOpen = dropdown.style.display === "block";
    dropdown.style.display = isOpen ? "none" : "block";
    btn.setAttribute("aria-expanded", !isOpen);
  }
}

// ── Mobile Bottom Navigation Bar (Icons Only, No Writings) ──
function initMobileBottomNav() {
  if (document.querySelector(".mobile-bottom-nav")) return;
  const path = (window.location.pathname || "").toLowerCase();
  const isHome = path.endsWith("index.html") || path === "" || path.endsWith("/");
  const isBooks = path.includes("books.html") || path.includes("book.html");
  const isLib = path.includes("library.html");
  const isPub = path.includes("publish.html");
  const isCart = path.includes("cart.html") || path.includes("checkout.html");
  const isProfile = path.includes("profile.html");

  const bar = document.createElement("nav");
  bar.className = "mobile-bottom-nav";
  bar.setAttribute("aria-label", "Mobile Bottom Navigation");
  bar.innerHTML = `
    <a href="index.html" class="mobile-nav-btn ${isHome ? 'active' : ''}" title="Home" aria-label="Home">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
    </a>
    <a href="books.html" class="mobile-nav-btn ${isBooks ? 'active' : ''}" title="Catalogue" aria-label="Books">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
    </a>
    <a href="library.html" class="mobile-nav-btn ${isLib ? 'active' : ''}" title="My Library" aria-label="My Library">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
    </a>
    <a href="publish.html" class="mobile-nav-btn ${isPub ? 'active' : ''}" title="Submit Manuscript" aria-label="Publish">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
    </a>
    <a href="cart.html" class="mobile-nav-btn ${isCart ? 'active' : ''}" title="Reading Bag" aria-label="Bag">
      <div style="position:relative;display:inline-flex;">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
        <span class="mobile-cart-badge cart-count" style="display:none;">0</span>
      </div>
    </a>
    <button type="button" class="mobile-nav-btn ${isProfile ? 'active' : ''}" title="Account" aria-label="Account" onclick="handleMobileAccountClick()">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
    </button>
  `;
  document.body.appendChild(bar);
  if (typeof updateCartCount === "function") updateCartCount();
}

function handleMobileAccountClick() {
  const user = getCurrentUser();
  if (user) {
    window.location.href = "profile.html";
  } else {
    openAccountModal('signin');
  }
}

function openAccountModal() {
  const modal = document.getElementById("account-modal");
  if (modal) modal.classList.add("open");
}

function closeAccountModal() {
  const modal = document.getElementById("account-modal");
  if (modal) modal.classList.remove("open");
}

function switchAuthTab(tab) {
  const signinForm = document.getElementById("form-signin");
  const registerForm = document.getElementById("form-register");
  const btnSignin = document.getElementById("tab-btn-signin");
  const btnReg = document.getElementById("tab-btn-register");

  if (signinForm) signinForm.style.display = tab === "signin" ? "block" : "none";
  if (registerForm) registerForm.style.display = tab === "register" ? "block" : "none";

  if (btnSignin) btnSignin.classList.toggle("active", tab === "signin");
  if (btnReg) btnReg.classList.toggle("active", tab === "register");
}

// ── User Accounts Registry (localStorage: rp_users) ───────────
const DEFAULT_REGISTERED_USERS = [];

function getRegisteredUsers() {
  const saved = localStorage.getItem("rp_users");
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) return parsed;
    } catch(e) {}
  }
  return [];
}

function saveRegisteredUsers(users) {
  localStorage.setItem("rp_users", JSON.stringify(users));
}

async function handleModalForgotPassword() {
  const emailInput = document.getElementById("signin-email");
  const email = (emailInput?.value || "").trim();
  if (!email) {
    showToast("Please enter your email address in the field above first.");
    if (emailInput) emailInput.focus();
    return;
  }
  try {
    await FirebaseService.sendPasswordReset(email);
    showToast(`✓ Password reset email sent to ${email}. Check your inbox.`);
  } catch (err) {
    showToast(err.message || "Could not send password reset email.");
  }
}

async function handleUserSignInSubmit() {
  const emailInput = document.getElementById("signin-email");
  const passInput = document.getElementById("signin-password");
  const email = (emailInput?.value || "").trim();
  const pass = (passInput?.value || "").trim();
  const submitBtn = document.getElementById("signin-submit-btn");

  if (!email || !pass) {
    showToast("Please enter both email and password.");
    return;
  }

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = "<span>Authenticating...</span>";
  }

  try {
    const { user, profile } = await FirebaseService.loginUser(email, pass);
    const userObj = {
      uid: user.uid,
      name: profile?.name || user.displayName || user.email.split("@")[0],
      email: user.email,
      role: profile?.role || "user",
      emailVerified: user.emailVerified,
      avatar: (profile?.name || user.email).charAt(0).toUpperCase()
    };
    setCurrentUser(userObj);
    closeAccountModal();
    showToast(`Welcome back, ${userObj.name}!`);

    if (userObj.role === "admin") {
      sessionStorage.setItem("rp_admin_logged_in", "true");
    }

    if (typeof renderNavAccount === "function") renderNavAccount();
    if (typeof renderLibraryPage === "function") renderLibraryPage();
    if (typeof renderProfilePage === "function") renderProfilePage();
  } catch (err) {
    console.error("Firebase Sign In Error:", err);
    let msg = "Invalid email or password. Please verify your credentials.";
    if (err.code === "auth/operation-not-allowed") {
      msg = "'Email/Password' provider is not enabled in Firebase Console yet. Please enable it in Firebase Console (reasonpress-0) > Authentication > Sign-in method, or sign in with Google below.";
    } else if (err.code === "auth/user-not-found" || err.code === "auth/invalid-credential") {
      msg = "No account found with this email or password.";
    } else if (err.code === "auth/wrong-password") {
      msg = "Incorrect password. Please try again.";
    } else if (err.code === "auth/too-many-requests") {
      msg = "Too many attempts. Please try again later or reset password.";
    } else if (err.code === "auth/network-request-failed") {
      msg = "Network connection error. Check your connection.";
    }
    showToast(msg);
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = "<span>Sign In &rarr;</span>";
    }
  }
}

async function handleUserRegisterSubmit() {
  const name = (document.getElementById("reg-name")?.value || "").trim();
  const email = (document.getElementById("reg-email")?.value || "").trim().toLowerCase();
  const pass = (document.getElementById("reg-password")?.value || "").trim();
  const submitBtn = document.getElementById("reg-submit-btn");

  if (!name || !email || !pass) {
    showToast("Please fill in all required fields.");
    return;
  }

  if (pass.length < 6) {
    showToast("Password must be at least 6 characters long.");
    return;
  }

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = "<span>Creating Account &amp; Sending Verification...</span>";
  }

  try {
    const { user, profile } = await FirebaseService.registerUser({ name, email, password: pass });
    const userObj = {
      uid: user.uid,
      name: name,
      email: email,
      role: "user",
      emailVerified: false,
      avatar: name.charAt(0).toUpperCase()
    };
    setCurrentUser(userObj);
    closeAccountModal();
    showToast(`Account created! Verification email sent to ${email}.`);

    if (typeof renderNavAccount === "function") renderNavAccount();
    if (typeof renderLibraryPage === "function") renderLibraryPage();
    if (typeof renderProfilePage === "function") renderProfilePage();
  } catch (err) {
    console.error("Firebase Registration Error:", err);
    let msg = "Could not create account. Please try again.";
    if (err.code === "auth/operation-not-allowed") {
      msg = "'Email/Password' provider is not enabled in Firebase Console yet. Please enable it in Firebase Console (reasonpress-0) > Authentication > Sign-in method, or sign in with Google below.";
    } else if (err.code === "auth/email-already-in-use") {
      msg = "An account with this email already exists. Please sign in.";
      switchAuthTab("signin");
      const signinEmail = document.getElementById("signin-email");
      if (signinEmail) signinEmail.value = email;
    } else if (err.code === "auth/weak-password") {
      msg = "Password is too weak. Please use at least 6 characters.";
    } else if (err.code === "auth/invalid-email") {
      msg = "Please provide a valid email address.";
    }
    showToast(msg);
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = "<span>Create Account &amp; Send Verification &rarr;</span>";
    }
  }
}

window.handleGlobalGoogleSignIn = async function() {
  try {
    if (typeof FirebaseService === "undefined" || typeof FirebaseService.loginWithGoogle !== "function") {
      showToast("Firebase authentication is not loaded.");
      return;
    }
    showToast("Connecting to Google Sign-In...");
    const { user, profile } = await FirebaseService.loginWithGoogle();
    const userObj = {
      uid: user.uid,
      name: profile?.name || user.displayName || user.email.split("@")[0],
      email: user.email,
      role: profile?.role || "user",
      emailVerified: user.emailVerified,
      avatar: (profile?.name || user.displayName || user.email).charAt(0).toUpperCase()
    };
    setCurrentUser(userObj);
    if (userObj.role === "admin") {
      sessionStorage.setItem("rp_admin_logged_in", "true");
    }
    closeAccountModal();
    showToast(`Welcome back, ${userObj.name}! Signed in with Google.`);

    if (typeof renderNavAccount === "function") renderNavAccount();
    if (typeof renderLibraryPage === "function") renderLibraryPage();
    if (typeof renderProfilePage === "function") renderProfilePage();
  } catch (err) {
    console.error("Global Google Sign-in Error:", err);
    if (err.code === "auth/popup-closed-by-user") {
      showToast("Google sign-in was closed before completing.");
      return;
    }
    let msg = err.message || "Could not sign in with Google.";
    if (err.code === "auth/operation-not-allowed") {
      msg = "Google sign-in is not enabled in your Firebase Console yet. Please open Firebase Console (reasonpress-0) > Authentication > Sign-in method and enable Google.";
    }
    showToast(msg);
  }
};

function logoutUser() {
  localStorage.removeItem("rp_current_user");
  sessionStorage.removeItem("rp_admin_logged_in");
  const dropdown = document.getElementById("nav-account-dropdown");
  if (dropdown) dropdown.style.display = "none";
  const btn = document.getElementById("nav-account-btn");
  if (btn) btn.setAttribute("aria-expanded", "false");
  renderNavAccount();

  if (typeof FirebaseService !== "undefined" && typeof FirebaseService.logoutUser === "function") {
    FirebaseService.logoutUser().catch(() => {});
  } else if (typeof rpAuth !== "undefined" && rpAuth) {
    rpAuth.signOut().catch(() => {});
  }

  showToast("You have been signed out.");

  if (window.location.pathname.includes("admin.html")) {
    window.location.href = "login.html";
  } else if (typeof renderLibraryPage === "function") {
    renderLibraryPage();
  }
}
window.logoutUser = logoutUser;

// User Submitted Manuscripts Tracker Modal
function openUserManuscriptsModal() {
  const modal = document.getElementById("user-manuscripts-modal");
  const list = document.getElementById("user-manuscripts-list");
  if (!modal || !list) return;

  const user = getCurrentUser();
  let subs = [];
  try { subs = JSON.parse(localStorage.getItem("rp_submissions") || "[]"); } catch(e){}

  const userSubs = subs.filter(s => !user || user.role === "admin" || s.email === user.email || s.author === user.name);

  if (userSubs.length === 0) {
    list.innerHTML = `
      <div style="text-align:center;padding:var(--space-8);color:var(--ink-muted);">
        <p style="font-size:var(--text-base);font-family:var(--font-serif);margin-bottom:var(--space-4);">
          You haven't submitted any manuscripts yet.
        </p>
        <a href="publish.html" class="btn btn--primary" style="display:inline-flex;">
          <span>Submit a Manuscript Now &rarr;</span>
        </a>
      </div>
    `;
  } else {
    list.innerHTML = userSubs.map(sub => {
      const isApproved = sub.status === "approved";
      return `
        <div style="background:var(--paper);border:1px solid var(--rule);border-radius:4px;padding:var(--space-4);margin-bottom:var(--space-3);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:var(--space-3);">
          <div>
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;">
              <strong style="font-size:15px;color:var(--ink);">${sub.title}</strong>
              ${isApproved 
                ? '<span class="badge-tag" style="background:#DCFCE7;color:#166534;">✓ Released &amp; Live</span>' 
                : '<span class="badge-tag" style="background:#FEF3C7;color:#92400E;">⏳ Editorial Appraisal in Progress</span>'}
            </div>
            <div style="font-size:11px;color:var(--ink-muted);">
              Ref #${sub.id} &bull; Category: ${sub.category} &bull; Document: ${sub.manuscriptName || 'manuscript.pdf'}
            </div>
            <div style="font-size:11px;color:var(--ink-muted);margin-top:2px;">
              Submitted by <strong>${sub.author}</strong> (${sub.email})
            </div>
          </div>
          <div>
            ${isApproved 
              ? `<a href="books.html" class="btn btn--outline" style="font-size:11px;padding:6px 12px;"><span> View in Store &rarr;</span></a>` 
              : `<span style="font-size:11px;color:var(--accent-dark);font-weight:700;">Under Senior Review</span>`}
          </div>
        </div>
      `;
    }).join("");
  }

  modal.classList.add("open");
}

function closeUserManuscriptsModal() {
  const modal = document.getElementById("user-manuscripts-modal");
  if (modal) modal.classList.remove("open");
}

// ── Hero 3D Perspective Book Dynamic Auto-Loop & Atmosphere System ─────────
let currentHeroBookList = [];
let activeHeroBookIdx = 0;
let heroBookLoopTimer = null;

const BOOK_THEME_PALETTES = {
  // 1: Oxford Navy & Slate
  1: {
    cover: "linear-gradient(135deg, #192A3E 0%, #101c2b 100%)",
    spine: "linear-gradient(to right, #090e16 0%, #172638 60%, #0c141e 100%)",
    ribbon: "linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)",
    heroBg: "radial-gradient(ellipse 75% 65% at 80% 25%, rgba(25, 42, 62, 0.12) 0%, transparent 70%), radial-gradient(ellipse 60% 60% at 15% 75%, rgba(15, 23, 42, 0.05) 0%, transparent 60%), #FAF8F5",
    titleColor: "#0F172A",
    accentColor: "#1E40AF",
    subtitleColor: "#334155",
    metricColor: "#0F172A",
    metricLabel: "#64748B",
    auraColor: "rgba(30, 64, 175, 0.22)",
    btnBg: "#0F172A"
  },
  // 2: Warm Amber / Chestnut Espresso ("Quiet Hours")
  2: {
    cover: "linear-gradient(135deg, #78350F 0%, #451A03 100%)",
    spine: "linear-gradient(to right, #240e02 0%, #4a2007 60%, #200c02 100%)",
    ribbon: "linear-gradient(135deg, #D97706 0%, #B45309 100%)",
    heroBg: "radial-gradient(ellipse 75% 65% at 80% 25%, rgba(180, 83, 9, 0.14) 0%, transparent 70%), radial-gradient(ellipse 60% 60% at 15% 75%, rgba(120, 53, 15, 0.06) 0%, transparent 60%), #FAF6F0",
    titleColor: "#2B1506",
    accentColor: "#B45309",
    subtitleColor: "#5A3D24",
    metricColor: "#2B1506",
    metricLabel: "#785338",
    auraColor: "rgba(217, 119, 6, 0.24)",
    btnBg: "#78350F"
  },
  // 3: Archival Forest Emerald ("Forms of Departure")
  3: {
    cover: "linear-gradient(135deg, #14532D 0%, #064E3B 100%)",
    spine: "linear-gradient(to right, #052110 0%, #0d381e 60%, #051d0e 100%)",
    ribbon: "linear-gradient(135deg, #16A34A 0%, #15803D 100%)",
    heroBg: "radial-gradient(ellipse 75% 65% at 80% 25%, rgba(20, 83, 45, 0.14) 0%, transparent 70%), radial-gradient(ellipse 60% 60% at 15% 75%, rgba(6, 78, 59, 0.06) 0%, transparent 60%), #F4F8F5",
    titleColor: "#0A2413",
    accentColor: "#15803D",
    subtitleColor: "#234930",
    metricColor: "#0A2413",
    metricLabel: "#4B7258",
    auraColor: "rgba(22, 163, 74, 0.22)",
    btnBg: "#14532D"
  },
  // 4: Archival Crimson & Wine Burgundy ("The Geometry of Stillness")
  4: {
    cover: "linear-gradient(135deg, #881337 0%, #4C0519 100%)",
    spine: "linear-gradient(to right, #30030c 0%, #540b1e 60%, #28020a 100%)",
    ribbon: "linear-gradient(135deg, #E11D48 0%, #BE123C 100%)",
    heroBg: "radial-gradient(ellipse 75% 65% at 80% 25%, rgba(185, 28, 28, 0.16) 0%, transparent 70%), radial-gradient(ellipse 60% 60% at 15% 75%, rgba(136, 19, 55, 0.08) 0%, transparent 60%), #FAF3F4",
    titleColor: "#2C050E",
    accentColor: "#9F1239",
    subtitleColor: "#58202C",
    metricColor: "#2C050E",
    metricLabel: "#753846",
    auraColor: "rgba(225, 29, 72, 0.25)",
    btnBg: "#881337"
  },
  // 5: Terracotta / Sienna
  5: {
    cover: "linear-gradient(135deg, #C2410C 0%, #7C2D12 100%)",
    spine: "linear-gradient(to right, #361104 0%, #631e08 60%, #300e03 100%)",
    ribbon: "linear-gradient(135deg, #F97316 0%, #EA580C 100%)",
    heroBg: "radial-gradient(ellipse 75% 65% at 80% 25%, rgba(194, 65, 12, 0.14) 0%, transparent 70%), radial-gradient(ellipse 60% 60% at 15% 75%, rgba(124, 45, 18, 0.06) 0%, transparent 60%), #FAF4F0",
    titleColor: "#2E0F06",
    accentColor: "#C2410C",
    subtitleColor: "#5A2B1D",
    metricColor: "#2E0F06",
    metricLabel: "#7A4434",
    auraColor: "rgba(249, 115, 22, 0.24)",
    btnBg: "#C2410C"
  },
  // 6: Deep Royal Violet / Plum
  6: {
    cover: "linear-gradient(135deg, #581C87 0%, #3B0764 100%)",
    spine: "linear-gradient(to right, #1d0333 0%, #3e1063 60%, #19022b 100%)",
    ribbon: "linear-gradient(135deg, #A855F7 0%, #9333EA 100%)",
    heroBg: "radial-gradient(ellipse 75% 65% at 80% 25%, rgba(88, 28, 135, 0.14) 0%, transparent 70%), radial-gradient(ellipse 60% 60% at 15% 75%, rgba(59, 7, 100, 0.06) 0%, transparent 60%), #F8F4FA",
    titleColor: "#1E0638",
    accentColor: "#7E22CE",
    subtitleColor: "#4B2469",
    metricColor: "#1E0638",
    metricLabel: "#6B448A",
    auraColor: "rgba(168, 85, 247, 0.22)",
    btnBg: "#581C87"
  },
  // 7: Royal Cobalt Blue
  7: {
    cover: "linear-gradient(135deg, #1E40AF 0%, #172554 100%)",
    spine: "linear-gradient(to right, #0a1738 0%, #152f75 60%, #09132d 100%)",
    ribbon: "linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)",
    heroBg: "radial-gradient(ellipse 75% 65% at 80% 25%, rgba(30, 64, 175, 0.14) 0%, transparent 70%), radial-gradient(ellipse 60% 60% at 15% 75%, rgba(23, 37, 84, 0.06) 0%, transparent 60%), #F3F6FB",
    titleColor: "#0A1738",
    accentColor: "#2563EB",
    subtitleColor: "#2A3C64",
    metricColor: "#0A1738",
    metricLabel: "#4B5E8A",
    auraColor: "rgba(59, 130, 246, 0.24)",
    btnBg: "#1E40AF"
  },
  // 8: Slate Charcoal
  8: {
    cover: "linear-gradient(135deg, #1F2937 0%, #111827 100%)",
    spine: "linear-gradient(to right, #0b0f16 0%, #1a222e 60%, #090c12 100%)",
    ribbon: "linear-gradient(135deg, #64748B 0%, #475569 100%)",
    heroBg: "radial-gradient(ellipse 75% 65% at 80% 25%, rgba(31, 41, 55, 0.12) 0%, transparent 70%), radial-gradient(ellipse 60% 60% at 15% 75%, rgba(17, 24, 39, 0.05) 0%, transparent 60%), #F7F8F9",
    titleColor: "#111827",
    accentColor: "#374151",
    subtitleColor: "#4B5563",
    metricColor: "#111827",
    metricLabel: "#6B7280",
    auraColor: "rgba(100, 116, 139, 0.20)",
    btnBg: "#1F2937"
  }
};

function getHeroCoverBg(book) {
  if (book && book.coverImage) {
    return `url('${book.coverImage}') center / cover no-repeat`;
  }
  const pal = BOOK_THEME_PALETTES[book?.cover || 1] || BOOK_THEME_PALETTES[1];
  return pal.cover;
}

function handleHero3DClick() {
  const current = currentHeroBookList[activeHeroBookIdx];
  if (current && current.id) {
    window.location.href = `book.html?id=${current.id}`;
  } else {
    window.location.href = "books.html";
  }
}

function switchHeroBook(idx, event) {
  if (event) event.stopPropagation();
  const book = currentHeroBookList[idx];
  if (!book) return;
  activeHeroBookIdx = idx;

  const pal = BOOK_THEME_PALETTES[book.cover || 1] || BOOK_THEME_PALETTES[1];

  const bookEl = document.getElementById("hero-interactive-book");
  const coverFace = document.getElementById("hero-3d-cover-face");
  const spineEl = document.getElementById("hero-3d-spine") || document.querySelector(".hero-3d-book__spine");
  const spineText = document.getElementById("hero-3d-spine-text") || document.querySelector(".hero-3d-book__spine-text");
  const ribbonEl = document.getElementById("hero-3d-ribbon") || document.querySelector(".hero-3d-book__ribbon");
  const titleEl = document.getElementById("hero-3d-title");
  const authorEl = document.getElementById("hero-3d-author");
  const badgeText = document.getElementById("hero-3d-badge-text");

  // Subtle 3D book rotation lift animation
  if (bookEl) {
    bookEl.style.transition = "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease";
    bookEl.style.transform = "rotateY(-10deg) rotateX(2deg) scale(1.02)";
    setTimeout(() => {
      bookEl.style.transform = "rotateY(-6deg) rotateX(4deg) scale(1)";
    }, 280);
  }

  // 1. Update Book Cover & Ribbon (Spine side completely removed as requested)
  if (coverFace) coverFace.style.background = getHeroCoverBg(book);
  if (ribbonEl) ribbonEl.style.background = pal.ribbon;
  if (titleEl) titleEl.textContent = book.title;
  if (authorEl) authorEl.textContent = book.author;
  if (badgeText) badgeText.textContent = book.isNew ? `NEW ARCHIVAL RELEASE` : `ARCHIVAL FIRST EDITION`;

  // 2. Dynamically Shift Hero Section Background & Atmosphere
  const heroSection = document.querySelector(".hero");
  if (heroSection) {
    heroSection.style.background = pal.heroBg;
  }

  // 3. Dynamically Shift Hero Font Colors to Match the Book
  const heroTitle = document.querySelector(".hero__title");
  if (heroTitle) {
    heroTitle.style.color = pal.titleColor;
  }
  const heroTitleEm = document.querySelector(".hero__title em");
  if (heroTitleEm) {
    heroTitleEm.style.color = pal.accentColor;
  }
  const heroSubtitle = document.querySelector(".hero__subtitle");
  if (heroSubtitle) {
    heroSubtitle.style.color = pal.subtitleColor;
  }
  const heroPrimaryBtn = document.getElementById("hero-explore-btn");
  if (heroPrimaryBtn) {
    heroPrimaryBtn.style.background = pal.btnBg;
    heroPrimaryBtn.style.borderColor = pal.btnBg;
  }
  const ambientGlow = document.querySelector(".hero__ambient-glow");
  if (ambientGlow) {
    ambientGlow.style.background = `radial-gradient(circle, ${pal.auraColor} 0%, transparent 70%)`;
  }
  const stageAura = document.getElementById("hero-3d-aura");
  if (stageAura) {
    stageAura.style.background = `radial-gradient(circle, ${pal.auraColor} 0%, transparent 65%)`;
  }
  const metricsNums = document.querySelectorAll(".hero__metric-num");
  metricsNums.forEach(el => { el.style.color = pal.metricColor; });
  const metricsLabels = document.querySelectorAll(".hero__metric-label");
  metricsLabels.forEach(el => { el.style.color = pal.metricLabel; });
}

function startHeroBookLoop() {
  stopHeroBookLoop();
  if (!currentHeroBookList || currentHeroBookList.length <= 1) return;

  heroBookLoopTimer = setInterval(() => {
    const nextIdx = (activeHeroBookIdx + 1) % currentHeroBookList.length;
    switchHeroBook(nextIdx);
  }, 4200); // Cycles automatically every 4.2 seconds
}

function stopHeroBookLoop() {
  if (heroBookLoopTimer) {
    clearInterval(heroBookLoopTimer);
    heroBookLoopTimer = null;
  }
}

function renderHero3DShowcase() {
  const allBooks = getBooks();
  if (!allBooks || allBooks.length === 0) return;

  // Filter newly published releases first, followed by curated classics
  const newBooks = allBooks.filter(b => b.isNew);
  const otherBooks = allBooks.filter(b => !b.isNew);
  const featured = [...newBooks, ...otherBooks];

  currentHeroBookList = featured;

  // Showcase newest release initially
  switchHeroBook(0);

  // Start automatic continuous looping
  startHeroBookLoop();
}

function initHero3DInteraction() {
  const stage = document.getElementById("hero-showcase-stage");
  const book = document.getElementById("hero-interactive-book");
  if (!stage || !book) return;

  // Mouse tilt tracking
  stage.addEventListener("mousemove", (e) => {
    const rect = stage.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const rotY = -6 + (x / rect.width) * 16;
    const rotX = 4 - (y / rect.height) * 10;

    book.style.transform = `rotateY(${rotY}deg) rotateX(${rotX}deg) translateY(-4px)`;
  });

  // Pause loop on hover so the user can inspect in 3D, resume on mouse leave
  stage.addEventListener("mouseenter", () => {
    stopHeroBookLoop();
  });

  stage.addEventListener("mouseleave", () => {
    book.style.transform = `rotateY(-6deg) rotateX(4deg)`;
    startHeroBookLoop();
  });

  // Pause loop when browser tab is inactive to preserve performance
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      stopHeroBookLoop();
    } else {
      startHeroBookLoop();
    }
  });

  renderHero3DShowcase();
}

function openHeroQuickPreview() {
  const modal = document.getElementById("hero-quick-preview-modal");
  if (modal) modal.classList.add("open");
}

function closeHeroQuickPreview() {
  const modal = document.getElementById("hero-quick-preview-modal");
  if (modal) modal.classList.remove("open");
}

// ── Personal Library & Reader System (Account-Gated) ──────────
const DEFAULT_USER_LIBRARY = [
  {
    id: "1",
    title: "The Architecture of Thought",
    author: "Julian Vance",
    format: "DRM-Free Vector PDF & Reader",
    cover: 1,
    purchasedAt: "24 Sep 2026",
    orderId: "RP-IN-893012",
    pages: "312 pages",
    chapters: [
      {
        num: 1,
        title: "The Scaffolding of Perception",
        sub: "On the implicit physics of threshold and traversal",
        content: `
          <p><span class="pdf-dropcap">W</span>e do not encounter the world unmediated. Every sensation, every glimpse of dawn or fracture of memory, arrives pre-shaped by an apparatus we rarely pause to inspect.</p>
          <p>Consider the simple act of recognizing a doorway. Long before geometry was codified in Alexandria, the creature navigating the forest had already internalized an implicit physics of threshold and traversal. We are builders of models before we are dwellers in rooms.</p>
          <p>When we speak of logic, we are not speaking of an external ruler placed against existence. We are examining the structural joints of human consciousness itself. In the chapters that follow, we shall disassemble these joints one by one &mdash; not to dismantle the cathedral of reason, but to understand why its vaults have held across millennia of storm.</p>
          <div style="background:var(--paper-mid);border-left:3px solid var(--accent);padding:14px;margin:24px 0;font-style:italic;">
            "The mind does not merely observe architecture; the mind is architecture itself, continually scaffolding its horizons against vertigo."
          </div>
          <p>If perception is a construction, then understanding is maintenance. The philosopher's role is not to invent new materials out of whole cloth, but to inspect the mortar of daily cognition.</p>
        `
      },
      {
        num: 2,
        title: "Schemata and Computational Shadows",
        sub: "From Kant's synthetic principles to algorithmic cognition",
        content: `
          <p><span class="pdf-dropcap">K</span>ant called them <em>schemata</em> &mdash; the bridge between bare sensory intuitions and pure intellectual concepts. Without schemata, the data of the senses would remain a buzzing, blooming confusion.</p>
          <p>In our twenty-first century inquiries, we witness this bridge reincarnated in neural weights and loss landscapes. Yet the fundamental philosophical dilemma has not receded: can an apparatus entirely contained within a system ever comprehend the boundary conditions of its own framework?</p>
          <p>We trace here the intellectual genealogy of mediation, demonstrating that algorithmic inference is not an alien logic, but an exteriorization of the very schemata humanity has practiced since Aristotle.</p>
        `
      },
      {
        num: 3,
        title: "The Threshold of Meaning",
        sub: "Linguistic scaffolds and the illusion of certainty",
        content: `
          <p><span class="pdf-dropcap">W</span>ords are not labels stuck onto pre-existing objects. They are the scaffolding that enables certain objects to coalesce out of the visual stream.</p>
          <p>To name a phenomenon is to carve an incision into the continuum of reality. When language shifts, the joints of human interaction groan under the realignment. Here we examine how linguistic precision preserves ethical clarity in turbulent eras.</p>
        `
      },
      {
        num: 4,
        title: "The Vault of Reason",
        sub: "A defense of rigorous reflection in an era of volatility",
        content: `
          <p><span class="pdf-dropcap">T</span>o conclude our investigation, we return to the cathedral metaphor. A building that stands for centuries is not one that avoids tension; it is one that distributes tension through calibrated arches.</p>
          <p>Human reasoning is that very arch. By confronting uncertainty with structural discipline, we build interior sanctuaries capable of sheltering purpose, empathy, and truth.</p>
        `
      }
    ]
  },
  {
    id: "2",
    title: "Quiet Hours",
    author: "Anya Sharma",
    format: "Digital PDF & In-Browser Edition",
    cover: 2,
    purchasedAt: "18 Sep 2026",
    orderId: "RP-IN-764109",
    pages: "224 pages",
    chapters: [
      {
        num: 1,
        title: "The Decibel of Modernity",
        sub: "On the physical scarcity of silence and interior space",
        content: `
          <p><span class="pdf-dropcap">S</span>ilence is not empty; it is merely uncrowded. In our current century, silence has acquired the scarcity value of ambergris or clean groundwater.</p>
          <p>When we turn down the volume of the world, we do not discover nothingness. We discover the steady, rhythmic pulse of our own consciousness asking to be heard.</p>
          <p>Modern noise is not merely acoustic; it is ideological. It insists that every second be colonized by stimulation, depriving the soul of the fallow fields necessary for deep intellectual harvest.</p>
        `
      },
      {
        num: 2,
        title: "The Solitary Walk",
        sub: "Pedestrian contemplation as counter-cultural practice",
        content: `
          <p><span class="pdf-dropcap">W</span>alking without headphones has become a minor act of rebellion. When you walk unshielded through the morning street, the rhythm of your strides becomes a metronome for unhurried thought.</p>
          <p>To give oneself three uninterrupted miles of sky and stone is to restore proportion between one's immediate worries and the vast, unhurried continuum of the world.</p>
        `
      },
      {
        num: 3,
        title: "The Geometry of Rest",
        sub: "Reclaiming the night from artificial luminosity",
        content: `
          <p><span class="pdf-dropcap">N</span>ight was once an unconditional treaty signed between humanity and darkness. In the quiet hours between midnight and dawn, the mind sheds its defensive armor.</p>
          <p>Here we explore how historical creators &mdash; from Dickinson to Proust &mdash; protected their nocturnal reverie from the intrusions of commerce and social vanity.</p>
        `
      },
      {
        num: 4,
        title: "The Unburdened Mind",
        sub: "Stillness as an ethical imperative",
        content: `
          <p><span class="pdf-dropcap">F</span>ar from being a withdrawal from the world, chosen silence is the only soil in which genuine compassion can take root.</p>
          <p>Only when we cease reacting to every momentary provocation can we discern what truly demands our courage, our devotion, and our love.</p>
        `
      }
    ]
  }
];

function getMyLibraryBooks() {
  const saved = localStorage.getItem("rp_my_library");
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) return parsed;
    } catch(e) {}
  }
  return [];
}

function handleNavLibraryClick(event) {
  if (event) event.preventDefault();
  window.location.href = "library.html";
}

// ── Standalone library.html Page Controller ───────────────────
async function renderLibraryPage() {
  const loggedOutView = document.getElementById("library-logged-out-view");
  const loggedInView = document.getElementById("library-logged-in-view");
  const grid = document.getElementById("library-page-books-grid");
  if (!grid && !loggedOutView && !loggedInView) return;

  const user = getCurrentUser();

  if (!user) {
    if (loggedOutView) loggedOutView.style.display = "block";
    if (loggedInView) loggedInView.style.display = "none";
    return;
  }

  // User is authenticated
  if (loggedOutView) loggedOutView.style.display = "none";
  if (loggedInView) loggedInView.style.display = "block";

  // Update Profile Card Information
  const displayName = document.getElementById("profile-display-name");
  const displayEmail = document.getElementById("profile-display-email");
  const avatarInitials = document.getElementById("profile-avatar-initials");
  const roleBadge = document.getElementById("profile-role-badge");
  const joinedDate = document.getElementById("profile-joined-date");
  const booksCount = document.getElementById("stat-books-count");

  if (displayName) displayName.textContent = user.name;
  if (displayEmail) displayEmail.textContent = user.email;
  if (avatarInitials) avatarInitials.textContent = user.avatar || user.name.charAt(0).toUpperCase();
  if (roleBadge) {
    roleBadge.textContent = user.role === "author" ? "Author & Contributor" : user.role === "admin" ? "Press Director" : "Reader & Collector";
  }
  if (joinedDate) joinedDate.textContent = user.joinedDate || "September 2025";

  // Query Cloud Firestore for user library
  if (typeof FirebaseService !== "undefined" && user.uid) {
    try {
      const remoteLib = await FirebaseService.getUserLibrary(user.uid);
      if (Array.isArray(remoteLib) && remoteLib.length > 0) {
        let localLib = getMyLibraryBooks();
        remoteLib.forEach(item => {
          const exists = localLib.some(b => String(b.id) === String(item.id || item.bookId));
          if (!exists) {
            localLib.unshift({
              id: String(item.id || item.bookId),
              title: item.title,
              author: item.author || "Reason Press Author",
              format: item.format || "Digital PDF & In-Browser Edition",
              cover: item.cover || 1,
              coverImage: item.coverImage || null,
              purchasedAt: item.purchasedAt || "Recent Order",
              orderId: item.orderId || "RP-ONLINE"
            });
          }
        });
        localStorage.setItem("rp_my_library", JSON.stringify(localLib));
      }
    } catch(err) {
      console.warn("Firestore library load:", err);
    }
  }

  // Render Purchased Books
  const libraryBooks = getMyLibraryBooks();
  const allBooks = getBooks();

  if (booksCount) booksCount.textContent = libraryBooks.length;

  if (grid) {
    if (libraryBooks.length === 0) {
      grid.innerHTML = `
        <div style="grid-column:1/-1;text-align:center;padding:48px 16px;background:var(--paper);border:1px dashed var(--rule);border-radius:4px;">
          <div style="font-size:36px;margin-bottom:12px;"></div>
          <h4 style="font-family:var(--font-display);font-size:1.25rem;margin:0 0 8px;color:var(--ink);">Your Personal Library is Ready</h4>
          <p style="font-size:var(--text-sm);color:var(--ink-muted);max-width:44ch;margin:0 auto 20px;">
            When you order books or digital editions with Reason Press, your lifetime DRM-free access appears here automatically.
          </p>
          <a href="books.html" class="btn btn--primary"><span>Explore Catalogue &rarr;</span></a>
        </div>
      `;
      return;
    }

    grid.innerHTML = libraryBooks.map(item => {
      const catalogBook = allBooks.find(b => String(b.id) === String(item.id)) || {};
      const coverNum = item.cover || catalogBook.cover || 1;
      const coverImg = item.coverImage || catalogBook.coverImage;
      const coverStyle = coverImg ? `background:url('${coverImg}') center/cover no-repeat;` : '';

      return `
        <div class="library-book-card">
          <div class="library-book-card__top">
            <div class="book-cover book-cover--${coverNum}" style="width:64px;height:92px;flex-shrink:0;border-radius:2px;box-shadow:var(--shadow-book);position:relative;${coverStyle}">
              <div class="book-cover__art"></div>
              <div class="book-cover__content" style="padding:4px;">
                <div class="book-cover__title" style="font-size:0.55rem;line-height:1.1;">${item.title}</div>
              </div>
            </div>
            <div>
              <span class="badge-tag" style="background:#DCFCE7;color:#166534;font-size:10px;padding:2px 6px;">✓ Lifetime Reader License</span>
              <h3 style="font-family:var(--font-display);font-size:1.1rem;font-weight:700;margin:6px 0 2px;color:var(--ink);">${item.title}</h3>
              <div style="font-size:12px;color:var(--ink-muted);">By ${item.author}</div>
              <div style="font-size:10px;color:var(--ink-faint);margin-top:4px;">Acquired: ${item.purchasedAt || 'Recent Release'} &bull; ${item.orderId || 'RP-ARCHIVE'}</div>
            </div>
          </div>

          <div class="library-book-card__body">
            <div style="font-size:11px;color:var(--ink-muted);line-height:1.6;">
              Format: <strong style="color:var(--ink);">${item.format || 'Digital PDF Edition'}</strong>
              <br>Calibrated for high-contrast reading, OLED tablets, and archival printing.
            </div>

            <div style="display:flex;gap:8px;flex-wrap:wrap;padding-top:12px;border-top:1px solid var(--rule-light);">
              <button type="button" class="btn btn--primary" style="flex:1;padding:10px 14px;font-size:12px;justify-content:center;" onclick="openEmbeddedReader('${item.id}')">
                <span> Read in Browser</span>
              </button>
              <button type="button" class="btn btn--outline" style="padding:10px 14px;font-size:12px;" onclick="downloadBookPdf('${item.id}', '${item.title.replace(/'/g, "\\'")}')" title="Download DRM-free PDF">
                <span> PDF</span>
              </button>
              <a href="book.html?id=${item.id}" class="btn btn--ghost" style="padding:10px 12px;font-size:12px;" title="View in Catalogue">
                <span> Info</span>
              </a>
            </div>
          </div>
        </div>
      `;
    }).join("");
  }
}

// ── Embedded Reader for library.html ──────────────────────────
function openEmbeddedReader(bookId) {
  const libraryBooks = getMyLibraryBooks();
  const allBooks = getBooks();
  
  let book = libraryBooks.find(b => String(b.id) === String(bookId));
  if (!book) book = allBooks.find(b => String(b.id) === String(bookId));
  if (!book) book = DEFAULT_USER_LIBRARY[0];

  if (!book.chapters || book.chapters.length === 0) {
    const defaultTemplate = DEFAULT_USER_LIBRARY.find(b => String(b.id) === String(bookId)) || DEFAULT_USER_LIBRARY[0];
    book.chapters = defaultTemplate.chapters;
  }

  currentReaderBook = book;
  currentReaderChapterIndex = 0;

  const readerContainer = document.getElementById("library-embedded-reader");
  const titleEl = document.getElementById("emb-reader-title");
  const authorEl = document.getElementById("emb-reader-author");
  const selectEl = document.getElementById("emb-chapter-select");

  if (titleEl) titleEl.textContent = book.title;
  if (authorEl) authorEl.textContent = `By ${book.author} • Reason Press Archival Edition`;

  if (selectEl && book.chapters) {
    selectEl.innerHTML = book.chapters.map((ch, idx) => `
      <option value="${idx}">Chapter ${ch.num}: ${ch.title}</option>
    `).join("");
    selectEl.value = "0";
  }

  renderReaderCurrentChapter();

  if (readerContainer) {
    readerContainer.classList.add("active");
    readerContainer.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function closeEmbeddedReader() {
  const readerContainer = document.getElementById("library-embedded-reader");
  if (readerContainer) {
    readerContainer.classList.remove("active");
  }
}

// ── In-Page Auth Switcher & Form Handlers on library.html ──────
function switchLibraryAuthTab(tab) {
  const signinForm = document.getElementById("lib-form-signin");
  const registerForm = document.getElementById("lib-form-register");
  const tabSignin = document.getElementById("lib-auth-tab-signin");
  const tabReg = document.getElementById("lib-auth-tab-register");

  if (signinForm) signinForm.style.display = tab === "signin" ? "block" : "none";
  if (registerForm) registerForm.style.display = tab === "register" ? "block" : "none";

  if (tabSignin) tabSignin.classList.toggle("active", tab === "signin");
  if (tabReg) tabReg.classList.toggle("active", tab === "register");
}

async function handleLibrarySignIn() {
  const email = (document.getElementById("lib-signin-email")?.value || "").trim().toLowerCase();
  const pass = (document.getElementById("lib-signin-pass")?.value || "").trim();
  const btn = document.getElementById("lib-signin-btn") || document.querySelector("#lib-form-signin button[type='submit']");

  if (!email || !pass) {
    showToast("Please enter email and password.");
    return;
  }

  if (btn) {
    btn.disabled = true;
    btn.innerHTML = "<span>Signing in...</span>";
  }

  try {
    const { user, profile } = await FirebaseService.loginUser(email, pass);
    const userObj = {
      uid: user.uid,
      name: profile?.name || user.displayName || user.email.split("@")[0],
      email: user.email,
      role: profile?.role || "user",
      emailVerified: user.emailVerified,
      avatar: (profile?.name || user.email).charAt(0).toUpperCase()
    };
    setCurrentUser(userObj);
    showToast(`Welcome back, ${userObj.name}!`);
    renderLibraryPage();
  } catch (err) {
    console.error("Library sign in error:", err);
    let msg = "Invalid email or password. Please verify your credentials.";
    if (err.code === "auth/operation-not-allowed") {
      msg = "'Email/Password' provider is not enabled in Firebase Console yet. Please enable it in Firebase Console (reasonpress-0) > Authentication > Sign-in method, or sign in with Google.";
    } else if (err.code === "auth/user-not-found" || err.code === "auth/invalid-credential") {
      msg = "No account found with this email or password.";
    } else if (err.code === "auth/wrong-password") {
      msg = "Incorrect password. Please try again.";
    }
    showToast(msg);
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = "<span>Sign In to My Library &rarr;</span>";
    }
  }
}

async function handleLibraryRegister() {
  const name = (document.getElementById("lib-reg-name")?.value || "").trim();
  const email = (document.getElementById("lib-reg-email")?.value || "").trim().toLowerCase();
  const pass = (document.getElementById("lib-reg-pass")?.value || "").trim();
  const btn = document.querySelector("#lib-form-register button[type='submit']");

  if (!name || !email || !pass) {
    showToast("Please fill in all required fields.");
    return;
  }

  if (pass.length < 6) {
    showToast("Password must be at least 6 characters.");
    return;
  }

  if (btn) {
    btn.disabled = true;
    btn.innerHTML = "<span>Creating Account &amp; Sending Verification...</span>";
  }

  try {
    const { user, profile } = await FirebaseService.registerUser({ name, email, password: pass });
    const userObj = {
      uid: user.uid,
      name: name,
      email: email,
      role: "user",
      emailVerified: false,
      avatar: name.charAt(0).toUpperCase()
    };
    setCurrentUser(userObj);
    showToast(`Account created! Verification email sent to ${email}.`);
    renderLibraryPage();
  } catch (err) {
    console.error("Library register error:", err);
    let msg = "Could not create account. Please try again.";
    if (err.code === "auth/operation-not-allowed") {
      msg = "'Email/Password' provider is not enabled in Firebase Console yet. Please enable it in Firebase Console (reasonpress-0) > Authentication > Sign-in method, or sign in with Google.";
    } else if (err.code === "auth/email-already-in-use") {
      msg = "An account with this email already exists. Please sign in.";
      switchLibraryAuthTab('signin');
      const signinEmail = document.getElementById("lib-signin-email");
      if (signinEmail) signinEmail.value = email;
    } else if (err.code === "auth/weak-password") {
      msg = "Password is too weak. Please use at least 6 characters.";
    }
    showToast(msg);
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = "<span>Create Free Reader Account &rarr;</span>";
    }
  }
}

window.handleLibraryGoogleSignIn = async function() {
  try {
    if (typeof FirebaseService === "undefined" || typeof FirebaseService.loginWithGoogle !== "function") {
      showToast("Firebase authentication is not loaded.");
      return;
    }
    showToast("Connecting to Google Sign-In...");
    const { user, profile } = await FirebaseService.loginWithGoogle();
    const userObj = {
      uid: user.uid,
      name: profile?.name || user.displayName || user.email.split("@")[0],
      email: user.email,
      role: profile?.role || "user",
      emailVerified: user.emailVerified,
      avatar: (profile?.name || user.displayName || user.email).charAt(0).toUpperCase()
    };
    setCurrentUser(userObj);
    if (userObj.role === "admin") {
      sessionStorage.setItem("rp_admin_logged_in", "true");
    }
    showToast(`Welcome back, ${userObj.name}! Signed in with Google.`);
    renderLibraryPage();
    if (typeof renderNavAccount === "function") renderNavAccount();
  } catch (err) {
    console.error("Library Google Sign-in error:", err);
    if (err.code === "auth/popup-closed-by-user") {
      showToast("Google sign-in was closed before completing.");
      return;
    }
    let msg = err.message || "Could not sign in with Google.";
    if (err.code === "auth/operation-not-allowed") {
      msg = "Google sign-in is not enabled in your Firebase Console yet. Please open Firebase Console (reasonpress-0) > Authentication > Sign-in method and enable 'Google'.";
    }
    showToast(msg);
  }
};

// ── In-Browser eBook / PDF Reader Canvas ────────────────────────
let currentReaderBook = null;
let currentReaderChapterIndex = 0;
let currentReaderFontSize = 17;
let currentReaderTheme = 'paper'; // paper, sepia, night

function renderReaderCurrentChapter() {
  if (!currentReaderBook || !currentReaderBook.chapters) return;
  const chapter = currentReaderBook.chapters[currentReaderChapterIndex];
  if (!chapter) return;

  const contentEl = document.getElementById("library-reader-content");
  const pageIndicator = document.getElementById("reader-page-indicator");
  const selectEl = document.getElementById("emb-chapter-select") || document.getElementById("reader-chapter-select");
  const viewport = document.getElementById("library-reader-viewport");

  if (selectEl) selectEl.value = String(currentReaderChapterIndex);
  if (pageIndicator) {
    pageIndicator.textContent = `Chapter ${chapter.num} of ${currentReaderBook.chapters.length} • Section ${chapter.num}`;
  }

  if (contentEl) {
    contentEl.innerHTML = `
      <div style="border-bottom:1px solid rgba(0,0,0,0.1);padding-bottom:16px;margin-bottom:32px;display:flex;justify-content:space-between;font-size:11px;font-family:var(--font-sans);letter-spacing:0.12em;text-transform:uppercase;color:var(--ink-muted);">
        <span>${currentReaderBook.title}</span>
        <span>CHAPTER ${chapter.num}</span>
      </div>
      <h2 style="font-family:var(--font-display);font-size:clamp(1.6rem,3vw,2.2rem);margin:0 0 8px;font-weight:700;letter-spacing:-0.01em;">
        ${chapter.title}
      </h2>
      <div style="font-size:14px;color:var(--ink-muted);font-style:italic;margin-bottom:32px;">
        ${chapter.sub || 'Reason Press Typeset Edition'}
      </div>
      <div class="reader-body-copy">
        ${chapter.content}
      </div>
      <div style="margin-top:48px;padding-top:24px;border-top:1px solid rgba(0,0,0,0.1);display:flex;justify-content:space-between;align-items:center;font-size:11px;color:var(--ink-faint);font-family:var(--font-sans);">
        <span>REASON PRESS &bull; ARCHIVAL PRINTING</span>
        <span>PAGE ${chapter.num * 4 - 3}&ndash;${chapter.num * 4} OF ${currentReaderBook.pages || '280 PAGES'}</span>
      </div>
    `;
  }

  if (viewport) viewport.scrollTop = 0;
}

function changeReaderChapter(idx) {
  currentReaderChapterIndex = parseInt(idx) || 0;
  renderReaderCurrentChapter();
}

function stepReaderChapter(delta) {
  if (!currentReaderBook || !currentReaderBook.chapters) return;
  const nextIdx = currentReaderChapterIndex + delta;
  if (nextIdx >= 0 && nextIdx < currentReaderBook.chapters.length) {
    currentReaderChapterIndex = nextIdx;
    renderReaderCurrentChapter();
  } else if (nextIdx < 0) {
    showToast("You are on the first chapter.");
  } else {
    showToast("You have reached the end of this digital monograph.");
  }
}

function adjustReaderFontSize(delta) {
  currentReaderFontSize = Math.min(26, Math.max(13, currentReaderFontSize + delta));
  const sheet = document.getElementById("library-reader-sheet");
  if (sheet) sheet.style.fontSize = `${currentReaderFontSize}px`;
  showToast(`Font size: ${currentReaderFontSize}px`);
}

function toggleReaderTheme() {
  const sheet = document.getElementById("library-reader-sheet");
  const viewport = document.getElementById("library-reader-viewport");
  const themeBtn = document.getElementById("emb-theme-btn") || document.getElementById("reader-theme-btn");
  if (!sheet || !viewport) return;

  if (currentReaderTheme === 'paper') {
    currentReaderTheme = 'sepia';
    viewport.style.background = '#EFE3C3';
    sheet.style.background = '#FBF0D9';
    sheet.style.color = '#382816';
    if (themeBtn) themeBtn.textContent = 'Sepia';
    showToast('Warm Sepia reading theme applied.');
  } else if (currentReaderTheme === 'sepia') {
    currentReaderTheme = 'night';
    viewport.style.background = '#0F172A';
    sheet.style.background = '#1E293B';
    sheet.style.color = '#E2E8F0';
    if (themeBtn) themeBtn.textContent = 'Night';
    showToast('Dark / Night reading theme applied.');
  } else {
    currentReaderTheme = 'paper';
    viewport.style.background = '#FAF8F5';
    sheet.style.background = '#FFFFFF';
    sheet.style.color = '#1E293B';
    if (themeBtn) themeBtn.textContent = 'Paper';
    showToast('Clean Paper reading theme applied.');
  }
}

function downloadBookPdf(bookId, bookTitle) {
  showToast(`Generating DRM-free PDF package for "${bookTitle || 'Book'}"...`);
  setTimeout(() => {
    const element = document.createElement("a");
    const sampleContent = `%PDF-1.4\n% Reason Press Archival Edition: ${bookTitle}\n% Calibrated Vector PDF with interactive footnotes\n1 0 obj << /Title (${bookTitle}) /Author (Reason Press) >> endobj\nxref\n0 2\ntrailer << /Root 1 0 R >>\n%%EOF`;
    const file = new Blob([sampleContent], { type: "application/pdf" });
    element.href = URL.createObjectURL(file);
    element.download = `${(bookTitle || "Reason_Press_Book").replace(/[^a-zA-Z0-9]/g, "_")}_Edition.pdf`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    showToast(`✓ Download started: ${element.download}`);
  }, 600);
}

// ── Contact Inquiries Form Handler ──────────────────────────
function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = (document.getElementById("contact-name")?.value || "").trim();
    const email = (document.getElementById("contact-email")?.value || "").trim();
    const subject = (document.getElementById("contact-subject")?.value || "").trim();
    const message = (document.getElementById("contact-message")?.value || "").trim();
    const submitBtn = document.getElementById("contact-submit");

    if (!name || !email || !message) {
      showToast("Please provide your name, email, and message.");
      return;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = "<span>Transmitting Message...</span>";
    }

    const messageData = {
      name,
      email,
      subject: subject || "General Inquiry",
      message,
      status: "unread",
      dateFormatted: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })
    };

    if (typeof FirebaseService !== "undefined" && FirebaseService.sendMessage) {
      try {
        await FirebaseService.sendMessage(messageData);
      } catch (err) {
        console.warn("Firestore message dispatch error:", err);
      }
    } else {
      try {
        const msgs = JSON.parse(localStorage.getItem("rp_messages") || "[]");
        msgs.unshift({ id: "msg_" + Date.now(), ...messageData });
        localStorage.setItem("rp_messages", JSON.stringify(msgs));
      } catch(e) {}
    }

    showToast("✓ Message delivered to Reason Press editorial desk.");
    form.reset();
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = "<span>Message Delivered ✓</span>";
      setTimeout(() => {
        submitBtn.innerHTML = "<span>Send Message</span>";
      }, 3000);
    }
  });
}

// ── Global Initializer ──────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  initNav();
  initAccountSystem();
  syncBooksFromFirestore();
  initHero3DInteraction();
  initQuotesRotator();
  initReveal();
  renderHomeBookWall();
  renderCatalogueGrid();
  initBookTabs();
  initQty();
  initBookDetailPage();
  updateCartCount();
  renderCartPage();
  renderCheckoutSummary();
  initPublishForm();
  initCommunityForum();
  initContactForm();
  applySiteSettingsToPage();
  initAdminSecretAccess();
  renderLibraryPage();
  initProfilePage();
  initMobileBottomNav();

  // Handle post-checkout library redirect
  if (sessionStorage.getItem("rp_open_library_on_load") === "true") {
    sessionStorage.removeItem("rp_open_library_on_load");
    window.location.href = "library.html";
  }
});

