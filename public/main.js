// main.js - static frontend logic for Quantum Creative Hub (HTML + JS)

document.addEventListener('DOMContentLoaded', () => {
  const pages = document.querySelectorAll('.page');
  const navLinks = document.querySelectorAll('.nav-link');
  const yearEl = document.getElementById('year');
  const toolArea = document.getElementById('tool-area');
  yearEl.textContent = new Date().getFullYear();

  function showPage(id) {
    pages.forEach(p => p.id === id ? p.classList.remove('hidden') : p.classList.add('hidden'));
    navLinks.forEach(a => a.dataset.page === id ? a.classList.add('active') : a.classList.remove('active'));
    window.scrollTo(0,0);
  }

  navLinks.forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const page = a.dataset.page;
      showPage(page);
    });
  });

  // Hero actions and service buttons
  document.querySelectorAll('[data-action="open-text"]').forEach(btn => {
    btn.addEventListener('click', () => openTextTool());
  });
  document.querySelectorAll('[data-action="open-image"]').forEach(btn => {
    btn.addEventListener('click', () => openImageTool());
  });
  document.querySelectorAll('[data-action="open-code"]').forEach(btn => {
    btn.addEventListener('click', () => openCodeTool());
  });

  // Contact form
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Mesaj gönderildi (demo).');
      contactForm.reset();
    });
  }

  // Tool renderers
  function openTextTool() {
    showPage('services');
    toolArea.innerHTML = `
      <div class="card">
        <h3>Metin Oluşturucu (Demo)</h3>
        <p>Bir prompt girin, sunucuya gönderilecek (mock cevap döner).</p>
        <input id="text-prompt" placeholder="örn: uzayda uçan bir kedi" style="width:100%;padding:10px;border-radius:8px;margin-top:8px" />
        <div style="margin-top:8px;display:flex;gap:8px">
          <button id="gen-text-btn" class="btn neon">Oluştur</button>
        </div>
        <pre id="text-result" style="white-space:pre-wrap;margin-top:12px;color:var(--muted)"></pre>
      </div>
    `;
    document.getElementById('gen-text-btn').addEventListener('click', async () => {
      const prompt = document.getElementById('text-prompt').value;
      if (!prompt) return alert('Lütfen prompt girin.');
      const resEl = document.getElementById('text-result');
      resEl.textContent = 'İstek gönderiliyor...';
      try {
        const resp = await fetch('/api/gemini/text', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ prompt, temperature:0.7 }) });
        const data = await resp.json();
        resEl.textContent = data.text || JSON.stringify(data);
      } catch (err) {
        resEl.textContent = 'Hata: ' + err.message;
      }
    });
  }

  function openImageTool() {
    showPage('services');
    toolArea.innerHTML = `
      <div class="card">
        <h3>Görsel Oluşturucu (Demo)</h3>
        <p>Prompt girin ve sunucuya gönderin; demo olarak placeholder döner.</p>
        <input id="img-prompt" placeholder="örn: neo-fütüristik uzay kedisi" style="width:100%;padding:10px;border-radius:8px;margin-top:8px" />
        <div style="margin-top:8px;display:flex;gap:8px">
          <button id="gen-img-btn" class="btn neon">Görsel Oluştur</button>
        </div>
        <div id="img-result" style="margin-top:12px"></div>
      </div>
    `;
    document.getElementById('gen-img-btn').addEventListener('click', async () => {
      const prompt = document.getElementById('img-prompt').value;
      if (!prompt) return alert('Lütfen prompt girin.');
      const resultDiv = document.getElementById('img-result');
      resultDiv.textContent = 'İstek gönderiliyor...';
      try {
        const resp = await fetch('/api/gemini/image', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ prompt, style:'neo-futuristic' }) });
        const data = await resp.json();
        if (data.url) {
          resultDiv.innerHTML = `<img src="${data.url}" alt="generated" style="max-width:100%;border-radius:8px" />`;
        } else {
          resultDiv.textContent = JSON.stringify(data);
        }
      } catch (err) {
        resultDiv.textContent = 'Hata: ' + err.message;
      }
    });
  }

  function openCodeTool() {
    showPage('services');
    toolArea.innerHTML = `
      <div class="card">
        <h3>Kod Desteği (Demo)</h3>
        <p>Kod veya soru gönderin, sunucudan demo cevap alın.</p>
        <textarea id="code-q" placeholder="örn: Bir React component nasıl yazılır?" style="width:100%;padding:10px;border-radius:8px;margin-top:8px"></textarea>
        <div style="margin-top:8px;display:flex;gap:8px">
          <button id="ask-code-btn" class="btn neon">Sor</button>
        </div>
        <pre id="code-result" style="white-space:pre-wrap;margin-top:12px;color:var(--muted)"></pre>
      </div>
    `;
    document.getElementById('ask-code-btn').addEventListener('click', async () => {
      const q = document.getElementById('code-q').value;
      if (!q) return alert('Lütfen soru girin.');
      const resEl = document.getElementById('code-result');
      resEl.textContent = 'İstek gönderiliyor...';
      try {
        const resp = await fetch('/api/gemini/text', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ prompt: q, temperature:0.2 }) });
        const data = await resp.json();
        resEl.textContent = data.text || JSON.stringify(data);
      } catch (err) {
        resEl.textContent = 'Hata: ' + err.message;
      }
    });
  }

  // init default
  showPage('home');
});
