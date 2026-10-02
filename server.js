const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const ROOT_DIR = __dirname;
const DATA_DIR = path.join(ROOT_DIR, 'data');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Helpers for reading and writing JSON files
function readDataFile(name, fallback = []) {
  const filePath = path.join(DATA_DIR, `${name}.json`);
  try {
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(content);
    }
  } catch (err) {
    console.error(`Error reading ${name}.json:`, err.message);
  }
  return fallback;
}

function writeDataFile(name, data) {
  const filePath = path.join(DATA_DIR, `${name}.json`);
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error(`Error writing ${name}.json:`, err.message);
    return false;
  }
}

// Initialize default seed data if missing
function initSeedData() {
  const booksFile = path.join(DATA_DIR, 'books.json');
  if (!fs.existsSync(booksFile)) {
    const seedBooks = [
      {
        id: "1",
        title: "The Architecture of Thought",
        subtitle: "A philosophical investigation into the structures of human reasoning",
        author: "Julian Vance",
        priceHardcover: 28.00,
        priceDigital: 12.00,
        price: 1999,
        priceHardcoverINR: 1999,
        priceDigitalINR: 899,
        stock: 45,
        isFeatured: true,
        isNew: true,
        cover: 1,
        coverImage: null,
        category: "philosophy",
        categoryLabel: "Philosophy & Ideas",
        year: "March 2026",
        pages: "312 pages",
        isbn: "978-1-9999-0001-3",
        dimensions: "234 × 153 mm",
        format: "Hardcover, Linen Bound & Digital PDF",
        description: [
          "In The Architecture of Thought, Julian Vance offers a rare and rigorous account of how the mind builds the structures through which it understands the world. Beginning with Kant's schemata and ending with computational models of the twenty-first century, Vance traces the long conversation between philosophers and scientists about what it means to think.",
          "Available both in our signature archival hardcover printed on Munken acid-free paper, and in our typographically calibrated DRM-free Digital PDF Edition with interactive footnotes."
        ],
        sampleExcerpt: [
          "Chapter 1: The Scaffolding of Perception",
          "We do not encounter the world unmediated. Every sensation, every glimpse of dawn or fracture of memory, arrives pre-shaped by an apparatus we rarely pause to inspect."
        ],
        available: true
      },
      {
        id: "2",
        title: "Quiet Hours",
        subtitle: "Essays on silence, attention, and the modern condition",
        author: "Anya Sharma",
        priceHardcover: 24.00,
        priceDigital: 10.00,
        price: 1799,
        priceHardcoverINR: 1799,
        priceDigitalINR: 749,
        stock: 60,
        isFeatured: true,
        isNew: true,
        cover: 2,
        coverImage: null,
        category: "essays",
        categoryLabel: "Essays & Reflection",
        year: "January 2026",
        pages: "224 pages",
        isbn: "978-1-9999-0002-0",
        dimensions: "216 × 140 mm",
        format: "Hardcover, Cloth Spine & Digital PDF",
        description: [
          "Quiet Hours is a collection of twelve meditative essays examining what happens to our interior lives when silence is extinguished from daily life."
        ],
        sampleExcerpt: [
          "Prologue: The Decibel of Modernity",
          "Silence is not empty; it is merely uncrowded. In our current century, silence has acquired the scarcity value of ambergris or clean groundwater."
        ],
        available: true
      },
      {
        id: "3",
        title: "Terra Firma",
        subtitle: "A geological and social chronicle of earth and community",
        author: "Marcus Croft",
        priceHardcover: 32.00,
        priceDigital: 14.00,
        price: 2399,
        priceHardcoverINR: 2399,
        priceDigitalINR: 1049,
        stock: 35,
        isFeatured: true,
        isNew: false,
        cover: 3,
        coverImage: null,
        category: "history",
        categoryLabel: "History & Geography",
        year: "November 2025",
        pages: "448 pages",
        isbn: "978-1-9999-0003-7",
        dimensions: "240 × 160 mm",
        format: "Hardcover with Dust Jacket & Digital PDF",
        description: [
          "Part field journal, part political treatise, Terra Firma investigates the land as both physical substance and social compact."
        ],
        available: true
      },
      {
        id: "4",
        title: "The Winter Garden",
        subtitle: "A novella of memory, family, and the passage of time",
        author: "Claire Dupont",
        priceHardcover: 22.00,
        priceDigital: 9.00,
        price: 1649,
        priceHardcoverINR: 1649,
        priceDigitalINR: 679,
        stock: 50,
        isFeatured: true,
        isNew: false,
        cover: 4,
        coverImage: null,
        category: "fiction",
        categoryLabel: "Literary Fiction",
        year: "October 2025",
        pages: "176 pages",
        isbn: "978-1-9999-0004-4",
        dimensions: "198 × 129 mm",
        format: "Paperback, French Flaps & Digital PDF",
        description: [
          "Set over three days in a decaying conservatory in Normandy, The Winter Garden follows an estranged daughter returning to inventory her late father's botanical collection."
        ],
        available: true
      },
      {
        id: "5",
        title: "On Form & Distance",
        subtitle: "Critical essays on aesthetics, architecture, and distance",
        author: "Elias Thorne",
        priceHardcover: 26.00,
        priceDigital: 11.00,
        price: 1949,
        priceHardcoverINR: 1949,
        priceDigitalINR: 825,
        stock: 25,
        isFeatured: true,
        isNew: false,
        cover: 5,
        coverImage: null,
        category: "essays",
        categoryLabel: "Essays & Reflection",
        year: "August 2025",
        pages: "256 pages",
        isbn: "978-1-9999-0005-1",
        dimensions: "216 × 140 mm",
        format: "Hardcover, Linen Bound & Digital PDF",
        description: [
          "Thorne interrogates the concept of aesthetic distance — the space between observer and object that makes contemplation possible."
        ],
        available: true
      },
      {
        id: "6",
        title: "The Northern Archive",
        subtitle: "Recovered letters, journals, and fragments 1890–1940",
        author: "Søren Lindqvist",
        priceHardcover: 35.00,
        priceDigital: 15.00,
        price: 2599,
        priceHardcoverINR: 2599,
        priceDigitalINR: 1125,
        stock: 20,
        isFeatured: true,
        isNew: false,
        cover: 6,
        coverImage: null,
        category: "history",
        categoryLabel: "History & Geography",
        year: "June 2025",
        pages: "512 pages",
        isbn: "978-1-9999-0006-8",
        dimensions: "240 × 160 mm",
        format: "Two Volumes in Slipcase & Digital PDF",
        description: [
          "A monumental scholarly edition bringing together five decades of epistolary correspondence and expedition logs from the Scandinavian Arctic."
        ],
        available: true
      }
    ];
    writeDataFile('books', seedBooks);
  }

  const catFile = path.join(DATA_DIR, 'categories.json');
  if (!fs.existsSync(catFile)) {
    const seedCategories = [
      { id: "all", slug: "all", label: "All Works", desc: "Complete active catalogue" },
      { id: "philosophy", slug: "philosophy", label: "Philosophy & Ideas", desc: "Epistemology, ethics, mind & language" },
      { id: "essays", slug: "essays", label: "Essays & Reflection", desc: "Long-form reflections, solitude & cultural critique" },
      { id: "history", slug: "history", label: "History & Geography", desc: "Deep time, landscape & societal transformations" },
      { id: "fiction", slug: "fiction", label: "Literary Fiction", desc: "Novellas and literary narratives with enduring style" },
      { id: "monographs", slug: "monographs", label: "Monographs", desc: "Single-topic academic and intellectual inquiries" }
    ];
    writeDataFile('categories', seedCategories);
  }

  const collections = ['orders', 'submissions', 'messages', 'reviews', 'users', 'logs'];
  collections.forEach(col => {
    const file = path.join(DATA_DIR, `${col}.json`);
    if (!fs.existsSync(file)) writeDataFile(col, []);
  });
}

initSeedData();

const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf',
  '.pdf': 'application/pdf',
  '.txt': 'text/plain; charset=UTF-8'
};

// Parse JSON request body
function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
      if (body.length > 25 * 1024 * 1024) { // 25MB max
        reject(new Error('Payload Too Large'));
      }
    });
    req.on('end', () => {
      if (!body) return resolve({});
      try {
        resolve(JSON.parse(body));
      } catch (err) {
        resolve({});
      }
    });
    req.on('error', reject);
  });
}

// REST API Handler
async function handleApi(req, res, pathname) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return true;
  }

  // Check Firestore live status endpoint
  if (pathname === '/api/firestore-status') {
    try {
      const resp = await fetch('https://firestore.googleapis.com/v1/projects/reasonpress-0/databases/(default)/documents/books');
      const data = await resp.json();
      if (resp.status === 404 && data?.error?.message?.includes('does not exist')) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          databaseExists: false,
          status: 'not_created',
          projectId: 'reasonpress-0',
          consoleUrl: 'https://console.firebase.google.com/project/reasonpress-0/firestore',
          message: 'The Cloud Firestore database (default) has not been initialized yet in the Firebase Console for project reasonpress-0.'
        }));
        return true;
      } else if (resp.ok || resp.status === 403) {
        // If 200 (ok) or 403 (security rules block unauthenticated reads), database exists!
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          databaseExists: true,
          status: resp.ok ? 'active' : 'rules_protected',
          projectId: 'reasonpress-0',
          consoleUrl: 'https://console.firebase.google.com/project/reasonpress-0/firestore',
          message: 'Cloud Firestore database is created and online.'
        }));
        return true;
      } else {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          databaseExists: false,
          status: 'unknown',
          error: data?.error?.message,
          projectId: 'reasonpress-0',
          consoleUrl: 'https://console.firebase.google.com/project/reasonpress-0/firestore'
        }));
        return true;
      }
    } catch (err) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        databaseExists: false,
        status: 'network_error',
        error: err.message,
        projectId: 'reasonpress-0',
        consoleUrl: 'https://console.firebase.google.com/project/reasonpress-0/firestore'
      }));
      return true;
    }
  }

  // Dynamic Firebase environment configuration endpoint
  if (pathname === '/api/config') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      apiKey: process.env.FIREBASE_API_KEY || "AIzaSyANTLroYdsN8WgbzGvLiYjEyaJ78dtE8gM",
      authDomain: process.env.FIREBASE_AUTH_DOMAIN || "reasonpress-0.firebaseapp.com",
      projectId: process.env.FIREBASE_PROJECT_ID || "reasonpress-0",
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "reasonpress-0.firebasestorage.app",
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || "896733398284",
      appId: process.env.FIREBASE_APP_ID || "1:896733398284:web:5214cc42496882d655f529",
      measurementId: process.env.FIREBASE_MEASUREMENT_ID || "G-FLK238Y61B"
    }));
    return true;
  }

  // Handle file upload endpoint /api/upload
  if (pathname === '/api/upload' && req.method === 'POST') {
    try {
      const body = await parseBody(req);
      if (body && body.dataUrl) {
        const matches = body.dataUrl.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
        if (matches && matches.length === 3) {
          const uploadsDir = path.join(ROOT_DIR, 'assets', 'uploads');
          if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

          const ext = (body.filename ? path.extname(body.filename) : '.jpg') || '.jpg';
          const cleanBase = path.basename(body.filename || 'cover', ext).replace(/[^a-zA-Z0-9_-]/g, '_');
          const finalFilename = `${Date.now()}_${cleanBase}${ext}`;
          const destPath = path.join(uploadsDir, finalFilename);
          const buffer = Buffer.from(matches[2], 'base64');
          fs.writeFileSync(destPath, buffer);

          const publicUrl = `/assets/uploads/${finalFilename}`;
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: true, url: publicUrl }));
          return true;
        }
      }
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Invalid dataUrl payload' }));
      return true;
    } catch (uploadErr) {
      console.error('File upload error:', uploadErr);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: uploadErr.message }));
      return true;
    }
  }

  // Match /api/:collection/:id?
  const match = pathname.match(/^\/api\/([a-zA-Z0-9_-]+)(?:\/([a-zA-Z0-9_.-]+))?$/);
  if (!match) return false;

  const collection = match[1].toLowerCase();
  const itemId = match[2] ? decodeURIComponent(match[2]) : null;

  const validCollections = ['books', 'categories', 'orders', 'submissions', 'messages', 'reviews', 'users', 'logs'];
  if (!validCollections.includes(collection)) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: `Collection ${collection} not found` }));
    return true;
  }

  let items = readDataFile(collection, []);

  // GET /api/:collection
  if (req.method === 'GET' && !itemId) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(items));
    return true;
  }

  // GET /api/:collection/:id
  if (req.method === 'GET' && itemId) {
    const item = items.find(i => String(i.id || i.slug || i.uid) === itemId);
    if (!item) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Item not found' }));
      return true;
    }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(item));
    return true;
  }

  // POST /api/:collection (Create item or batch replace)
  if (req.method === 'POST') {
    const body = await parseBody(req);

    // If batch sync: body is an array, merge rather than wipe
    if (Array.isArray(body)) {
      body.forEach(newDoc => {
        const id = newDoc.id || newDoc.slug || newDoc.uid;
        const idx = items.findIndex(i => String(i.id || i.slug || i.uid) === String(id));
        if (idx >= 0) {
          items[idx] = { ...items[idx], ...newDoc, updatedAt: new Date().toISOString() };
        } else {
          items.unshift({ ...newDoc, updatedAt: new Date().toISOString() });
        }
      });
      writeDataFile(collection, items);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, count: items.length }));
      return true;
    }

    const docId = body.id || itemId || `${collection.slice(0, -1)}_${Date.now()}`;
    const newDoc = {
      ...body,
      id: docId,
      updatedAt: new Date().toISOString()
    };
    if (!newDoc.createdAt) newDoc.createdAt = newDoc.updatedAt;

    const existingIdx = items.findIndex(i => String(i.id || i.slug || i.uid) === String(docId));
    if (existingIdx >= 0) {
      items[existingIdx] = { ...items[existingIdx], ...newDoc };
    } else {
      if (collection === 'books' || collection === 'submissions' || collection === 'orders' || collection === 'messages') {
        items.unshift(newDoc);
      } else {
        items.push(newDoc);
      }
    }

    writeDataFile(collection, items);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true, item: newDoc }));
    return true;
  }

  // PUT /api/:collection/:id (Update item)
  if (req.method === 'PUT' && itemId) {
    const body = await parseBody(req);
    const existingIdx = items.findIndex(i => String(i.id || i.slug || i.uid) === itemId);
    if (existingIdx >= 0) {
      items[existingIdx] = {
        ...items[existingIdx],
        ...body,
        id: itemId,
        updatedAt: new Date().toISOString()
      };
      writeDataFile(collection, items);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, item: items[existingIdx] }));
    } else {
      const newDoc = {
        ...body,
        id: itemId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      items.push(newDoc);
      writeDataFile(collection, items);
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, item: newDoc }));
    }
    return true;
  }

  // DELETE /api/:collection/:id (Remove item)
  if (req.method === 'DELETE' && itemId) {
    const initialLen = items.length;
    items = items.filter(i => String(i.id || i.slug || i.uid) !== itemId);
    writeDataFile(collection, items);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true, deleted: initialLen !== items.length }));
    return true;
  }

  return false;
}

const server = http.createServer(async (req, res) => {
  const urlParts = req.url.split('?');
  const pathname = decodeURIComponent(urlParts[0]);

  // Try API routes first
  if (pathname.startsWith('/api/')) {
    try {
      const handled = await handleApi(req, res, pathname);
      if (handled) return;
    } catch (err) {
      console.error('API Error:', err);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: err.message || 'Internal Server Error' }));
      return;
    }
  }

  // Dynamically serve firebase-config.js with injected environment variables if provided
  if (pathname === '/firebase-config.js') {
    const configPath = path.join(ROOT_DIR, 'firebase-config.js');
    fs.readFile(configPath, 'utf8', (err, content) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Error reading firebase-config.js');
        return;
      }
      let rendered = content;
      if (process.env.FIREBASE_API_KEY) {
        rendered = rendered.replace(/apiKey:\s*"[^"]*"/, `apiKey: "${process.env.FIREBASE_API_KEY}"`);
      }
      if (process.env.FIREBASE_AUTH_DOMAIN) {
        rendered = rendered.replace(/authDomain:\s*"[^"]*"/, `authDomain: "${process.env.FIREBASE_AUTH_DOMAIN}"`);
      }
      if (process.env.FIREBASE_PROJECT_ID) {
        rendered = rendered.replace(/projectId:\s*"[^"]*"/, `projectId: "${process.env.FIREBASE_PROJECT_ID}"`);
      }
      if (process.env.FIREBASE_STORAGE_BUCKET) {
        rendered = rendered.replace(/storageBucket:\s*"[^"]*"/, `storageBucket: "${process.env.FIREBASE_STORAGE_BUCKET}"`);
      }
      if (process.env.FIREBASE_MESSAGING_SENDER_ID) {
        rendered = rendered.replace(/messagingSenderId:\s*"[^"]*"/, `messagingSenderId: "${process.env.FIREBASE_MESSAGING_SENDER_ID}"`);
      }
      if (process.env.FIREBASE_APP_ID) {
        rendered = rendered.replace(/appId:\s*"[^"]*"/, `appId: "${process.env.FIREBASE_APP_ID}"`);
      }
      if (process.env.FIREBASE_MEASUREMENT_ID) {
        rendered = rendered.replace(/measurementId:\s*"[^"]*"/, `measurementId: "${process.env.FIREBASE_MEASUREMENT_ID}"`);
      }
      res.writeHead(200, {
        'Content-Type': 'application/javascript; charset=UTF-8',
        'Cache-Control': 'no-store, no-cache, must-revalidate',
        'Access-Control-Allow-Origin': '*'
      });
      res.end(rendered);
    });
    return;
  }

  // Static file serving
  let safePath = path.normalize(pathname).replace(/^(\.\.[\/\\])+/, '');
  if (safePath === '/' || safePath === '\\') {
    safePath = '/index.html';
  }

  let filePath = path.join(ROOT_DIR, safePath);

  fs.stat(filePath, (err, stats) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=UTF-8' });
      res.end(`<h1>404 Not Found</h1><p>The requested file <code>${req.url}</code> was not found.</p>`);
      return;
    }

    if (stats.isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    }

    fs.readFile(filePath, (readErr, data) => {
      if (readErr) {
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=UTF-8' });
        res.end(`Internal Server Error: ${readErr.message}`);
        return;
      }

      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';

      res.writeHead(200, {
        'Content-Type': contentType,
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
        'Pragma': 'no-cache',
        'Expires': '0',
        'Access-Control-Allow-Origin': '*'
      });
      res.end(data);
    });
  });
});

server.listen(PORT, () => {
  console.log(`> Reason Press Server running at:`);
  console.log(`> Local:    http://localhost:${PORT}`);
  console.log(`> REST API: http://localhost:${PORT}/api/books`);
  console.log(`> Database: ${DATA_DIR}`);
});
