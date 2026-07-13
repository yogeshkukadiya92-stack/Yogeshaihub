import cors from 'cors';
import express from 'express';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 4000;
const ADMIN_API_KEY = process.env.ADMIN_API_KEY?.trim();
if (!ADMIN_API_KEY) {
  throw new Error('ADMIN_API_KEY is required. Refusing to start without an administrator key.');
}
const DATA_FILE = path.join(__dirname, 'data', 'site-data.json');
const DIST_DIR = path.join(__dirname, '..', 'dist');

app.use(cors());
app.use(express.json({ limit: '4mb' }));

const readSiteData = async () => {
  try {
    const raw = await fs.readFile(DATA_FILE, 'utf8');
    return JSON.parse(raw);
  } catch {
    return {};
  }
};

const writeSiteData = async (data) => {
  await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
};

app.get('/health', (req, res) => {
  res.json({
    ok: true,
    service: 'yogesh-ai-hub-backend',
  });
});

app.get('/api/site-data', async (req, res) => {
  try {
    const data = await readSiteData();
    res.json(data);
  } catch {
    res.status(500).json({ error: 'Failed to load site data.' });
  }
});

app.post('/api/admin/verify', (req, res) => {
  const key = req.header('x-admin-key');
  if (!key || key !== ADMIN_API_KEY) return res.status(401).json({ error: 'Unauthorized: Invalid admin key.' });
  res.json({ ok: true });
});

app.put('/api/site-data', async (req, res) => {
  const key = req.header('x-admin-key');
  if (!key || key !== ADMIN_API_KEY) {
    return res.status(401).json({ error: 'Unauthorized: Invalid admin key.' });
  }
  const payload = req.body;
  if (!payload || typeof payload !== 'object') {
    return res.status(400).json({ error: 'Invalid payload.' });
  }
  try {
    await writeSiteData(payload);
    res.json({ ok: true, message: 'Site data updated successfully.' });
  } catch {
    res.status(500).json({ error: 'Failed to save site data.' });
  }
});

app.use(express.static(DIST_DIR));
app.use(async (req, res, next) => {
  if (req.path.startsWith('/api') || req.path === '/health') return next();
  try {
    const indexFile = path.join(DIST_DIR, 'index.html');
    await fs.access(indexFile);
    res.sendFile(indexFile);
  } catch {
    next();
  }
});

app.listen(PORT, () => {
  console.log(`\n🚀 Yogesh AI Hub backend running on http://localhost:${PORT}`);
  console.log('🔐 Administrator key configured.\n');
});
