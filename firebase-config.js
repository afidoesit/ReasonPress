// Reason Press — Firebase Initialization & Configuration
// Connected to Project: reasonpress-0

const firebaseConfig = {
  apiKey: "AIzaSyANTLroYdsN8WgbzGvLiYjEyaJ78dtE8gM",
  authDomain: "reasonpress-0.firebaseapp.com",
  projectId: "reasonpress-0",
  storageBucket: "reasonpress-0.firebasestorage.app",
  messagingSenderId: "896733398284",
  appId: "1:896733398284:web:5214cc42496882d655f529",
  measurementId: "G-FLK238Y61B"
};

// Initialize Firebase
if (typeof firebase !== "undefined" && !firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Global Firebase service instances
const rpAuth = typeof firebase !== "undefined" ? firebase.auth() : null;
const rpDb = typeof firebase !== "undefined" ? firebase.firestore() : null;
const rpStorage = typeof firebase !== "undefined" ? firebase.storage() : null;

// Enable offline persistence for Firestore if available
if (rpDb && typeof rpDb.enablePersistence === "function") {
  rpDb.enablePersistence({ synchronizeTabs: true }).catch(err => {
    if (err.code === "failed-precondition") {
      console.warn("Firestore persistence disabled: multiple tabs open.");
    } else if (err.code === "unimplemented") {
      console.warn("Firestore persistence is not supported by this browser.");
    }
  });
}
