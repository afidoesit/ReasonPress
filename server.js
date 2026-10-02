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

// Initialize default storage files if missing
function initSeedData() {
  const booksFile = path.join(DATA_DIR, 'books.json');
  if (!fs.existsSync(booksFile)) {
    writeDataFile('books', []);
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
  '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  '.doc': 'application/msword',
  '.epub': 'application/epub+zip',
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

// Automatically extract Base64 data URLs to disk in assets/uploads so database files remain tiny & super fast
function extractAndSaveBase64File(dataUrl, prefix = 'upload', originalName = '') {
  if (!dataUrl || typeof dataUrl !== 'string' || !dataUrl.startsWith('data:')) {
    return dataUrl;
  }
  try {
    const matches = dataUrl.match(/^data:([^;]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) return dataUrl;

    const mime = matches[1].toLowerCase();
    let ext = '.bin';
    if (originalName && path.extname(originalName)) {
      ext = path.extname(originalName).toLowerCase();
    } else if (mime.includes('pdf')) ext = '.pdf';
    else if (mime.includes('word') || mime.includes('document')) ext = '.docx';
    else if (mime.includes('png')) ext = '.png';
    else if (mime.includes('webp')) ext = '.webp';
    else if (mime.includes('jpeg') || mime.includes('jpg')) ext = '.jpg';
    else if (mime.includes('gif')) ext = '.gif';
    else if (mime.includes('svg')) ext = '.svg';
    else if (mime.includes('epub')) ext = '.epub';

    const uploadsDir = path.join(ROOT_DIR, 'assets', 'uploads');
    if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

    const safeBase = originalName ? path.basename(originalName, path.extname(originalName)).replace(/[^a-zA-Z0-9_-]/g, '_').substring(0, 40) : prefix;
    const filename = `${Date.now()}_${safeBase}_${Math.random().toString(36).substring(2, 7)}${ext}`;
    const destPath = path.join(uploadsDir, filename);
    fs.writeFileSync(destPath, Buffer.from(matches[2], 'base64'));

    return `/assets/uploads/${filename}`;
  } catch (err) {
    console.warn('Error saving base64 file:', err.message);
    return dataUrl;
  }
}

function extractAndSaveBase64Image(dataUrl, prefix = 'cover') {
  return extractAndSaveBase64File(dataUrl, prefix);
}

// Global Real-Time SSE (Server-Sent Events) Clients for zero-latency cross-visitor sync
let sseClients = [];

function broadcastSse(eventType, data = {}) {
  const payload = `event: ${eventType}\ndata: ${JSON.stringify(data)}\n\n`;
  for (let i = sseClients.length - 1; i >= 0; i--) {
    try {
      sseClients[i].write(payload);
    } catch (err) {
      sseClients.splice(i, 1);
    }
  }
}

// Keep-alive ping every 20s so proxies (Render, Cloudflare, Nginx) keep connections alive
setInterval(() => {
  for (let i = sseClients.length - 1; i >= 0; i--) {
    try {
      sseClients[i].write(': ping\n\n');
    } catch (err) {
      sseClients.splice(i, 1);
    }
  }
}, 20000);

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

  // SSE Real-Time Global Synchronization Stream
  if (pathname === '/api/events') {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': '*'
    });
    res.write('retry: 3000\n\n');
    sseClients.push(res);
    req.on('close', () => {
      sseClients = sseClients.filter(c => c !== res);
    });
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
        const matches = body.dataUrl.match(/^data:([^;]+);base64,(.+)$/);
        if (matches && matches.length === 3) {
          const uploadsDir = path.join(ROOT_DIR, 'assets', 'uploads');
          if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

          const rawExt = body.filename ? path.extname(body.filename).toLowerCase() : '';
          const mime = matches[1].toLowerCase();
          let ext = rawExt;
          if (!ext || !['.pdf', '.docx', '.doc', '.epub', '.png', '.jpg', '.jpeg', '.webp', '.svg'].includes(ext)) {
            if (mime.includes('pdf')) ext = '.pdf';
            else if (mime.includes('word') || mime.includes('document')) ext = '.docx';
            else if (mime.includes('epub')) ext = '.epub';
            else if (mime.includes('png')) ext = '.png';
            else if (mime.includes('webp')) ext = '.webp';
            else if (mime.includes('svg')) ext = '.svg';
            else ext = '.jpg';
          }

          const rawBase = body.filename ? path.basename(body.filename, path.extname(body.filename)) : 'upload';
          const cleanBase = rawBase.replace(/[^a-zA-Z0-9_-]/g, '_').substring(0, 50);
          const finalFilename = `${Date.now()}_${cleanBase}${ext}`;
          const destPath = path.join(uploadsDir, finalFilename);
          const buffer = Buffer.from(matches[2], 'base64');
          fs.writeFileSync(destPath, buffer);

          const publicUrl = `/assets/uploads/${finalFilename}`;
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: true, url: publicUrl, filename: finalFilename }));
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
        if (newDoc.coverImage) {
          newDoc.coverImage = extractAndSaveBase64Image(newDoc.coverImage, 'cover');
        }
        const id = newDoc.id || newDoc.slug || newDoc.uid;
        const idx = items.findIndex(i => String(i.id || i.slug || i.uid) === String(id));
        if (idx >= 0) {
          items[idx] = { ...items[idx], ...newDoc, updatedAt: new Date().toISOString() };
        } else {
          items.unshift({ ...newDoc, updatedAt: new Date().toISOString() });
        }
      });
      writeDataFile(collection, items);
      broadcastSse(`${collection}_updated`, { action: 'batch', count: items.length });
      if (collection === 'books') broadcastSse('catalogue_updated', { action: 'batch', count: items.length });
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, count: items.length }));
      return true;
    }

    if (body.coverImage) {
      body.coverImage = extractAndSaveBase64File(body.coverImage, 'cover', body.coverFilename || 'cover.jpg');
    }
    if (body.manuscriptUrl && typeof body.manuscriptUrl === 'string' && body.manuscriptUrl.startsWith('data:')) {
      body.manuscriptUrl = extractAndSaveBase64File(body.manuscriptUrl, 'manuscript', body.manuscriptName || 'manuscript.pdf');
      body.pdfDataUrl = body.manuscriptUrl;
    }
    if (body.pdfDataUrl && typeof body.pdfDataUrl === 'string' && body.pdfDataUrl.startsWith('data:')) {
      body.pdfDataUrl = extractAndSaveBase64File(body.pdfDataUrl, 'manuscript', body.manuscriptName || 'manuscript.pdf');
      if (!body.manuscriptUrl) body.manuscriptUrl = body.pdfDataUrl;
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
    broadcastSse(`${collection}_updated`, { action: 'create', id: docId });
    if (collection === 'books') broadcastSse('catalogue_updated', { action: 'create', id: docId });
    if (collection === 'categories') broadcastSse('categories_updated', { action: 'create', id: docId });
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true, item: newDoc }));
    return true;
  }

  // PUT /api/:collection/:id (Update item)
  if (req.method === 'PUT' && itemId) {
    const body = await parseBody(req);
    if (body.coverImage) {
      body.coverImage = extractAndSaveBase64File(body.coverImage, 'cover', body.coverFilename || 'cover.jpg');
    }
    if (body.manuscriptUrl && typeof body.manuscriptUrl === 'string' && body.manuscriptUrl.startsWith('data:')) {
      body.manuscriptUrl = extractAndSaveBase64File(body.manuscriptUrl, 'manuscript', body.manuscriptName || 'manuscript.pdf');
      body.pdfDataUrl = body.manuscriptUrl;
    }
    if (body.pdfDataUrl && typeof body.pdfDataUrl === 'string' && body.pdfDataUrl.startsWith('data:')) {
      body.pdfDataUrl = extractAndSaveBase64File(body.pdfDataUrl, 'manuscript', body.manuscriptName || 'manuscript.pdf');
      if (!body.manuscriptUrl) body.manuscriptUrl = body.pdfDataUrl;
    }
    const existingIdx = items.findIndex(i => String(i.id || i.slug || i.uid) === itemId);
    if (existingIdx >= 0) {
      items[existingIdx] = {
        ...items[existingIdx],
        ...body,
        id: itemId,
        updatedAt: new Date().toISOString()
      };
      writeDataFile(collection, items);
      broadcastSse(`${collection}_updated`, { action: 'update', id: itemId });
      if (collection === 'books') broadcastSse('catalogue_updated', { action: 'update', id: itemId });
      if (collection === 'categories') broadcastSse('categories_updated', { action: 'update', id: itemId });
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
      broadcastSse(`${collection}_updated`, { action: 'create', id: itemId });
      if (collection === 'books') broadcastSse('catalogue_updated', { action: 'create', id: itemId });
      if (collection === 'categories') broadcastSse('categories_updated', { action: 'create', id: itemId });
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
    broadcastSse(`${collection}_updated`, { action: 'delete', id: itemId });
    if (collection === 'books') broadcastSse('catalogue_updated', { action: 'delete', id: itemId });
    if (collection === 'categories') broadcastSse('categories_updated', { action: 'delete', id: itemId });
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

  // Static file serving with strict path traversal defense
  let safePath = path.normalize(pathname).replace(/^(\.\.[\/\\])+/, '');
  if (safePath === '/' || safePath === '\\') {
    safePath = '/index.html';
  }

  let filePath = path.resolve(ROOT_DIR, '.' + (safePath.startsWith('/') ? safePath : '/' + safePath));

  // Security: Prevent Directory Traversal outside ROOT_DIR
  if (!filePath.startsWith(ROOT_DIR)) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=UTF-8' });
    res.end('403 Forbidden: Directory traversal is not permitted.');
    return;
  }

  // Security: Block access to hidden files and sensitive credentials
  const baseName = path.basename(filePath);
  if (baseName.startsWith('.env') || baseName === '.git' || baseName.startsWith('.git') || baseName.includes('package-lock')) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=UTF-8' });
    res.end('403 Forbidden: Access to sensitive file is denied.');
    return;
  }

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
