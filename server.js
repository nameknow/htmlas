// server.js - simple Express server to serve static files and provide API proxy endpoints.
// IMPORTANT: This file contains placeholders for Gemini API calls. Replace with actual API calls in server-side code.
// Store API keys in environment variables (e.g., GEMINI_API_KEY) and never expose them to client-side JS.

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json({ limit: '1mb' }));
app.use(express.static(path.join(__dirname, 'public')));

// Health
app.get('/api/health', (req, res) => {
  res.json({ ok: true, timestamp: Date.now() });
});

// Example text-generation proxy endpoint (mocked)
app.post('/api/gemini/text', async (req, res) => {
  try {
    const { prompt, temperature } = req.body;
    // TODO: replace the mock with actual call to Gemini/OpenAI API from server side.
    // Example (pseudo-code):
    // const response = await fetch('https://api.gemini.example/v1/generate', { method: 'POST', headers: { Authorization: `Bearer ${process.env.GEMINI_API_KEY}` }, body: JSON.stringify({ prompt, temperature }) });
    // const data = await response.json();
    // res.json({ text: data.text });
    const mock = `Mocked response for prompt: \"${prompt || ''}\"\\n\\n(Replace this server-side with real Gemini API call and stream responses if needed.)`;
    res.json({ text: mock });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Example image-generation proxy endpoint (mocked)
app.post('/api/gemini/image', async (req, res) => {
  try {
    const { prompt, style } = req.body;
    // TODO: replace with actual server-side call to image API and return URL or base64
    const mockUrl = '/placeholder-image.png'; // you can place a placeholder image in /public
    res.json({ url: mockUrl, promptReceived: prompt, styleReceived: style });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Fallback to index.html for SPA routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
