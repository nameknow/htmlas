Quantum Creative Hub - Static HTML + JS + server.js (Express)
---------------------------------------------------------------

İçindekiler:
- public/           -> statik dosyalar (index.html, styles.css, main.js ve placeholder image)
- server.js         -> Express sunucu (static serve + /api/gemini/* proxy placeholder)
- package.json      -> npm start script

Hızlı başlatma (Replit veya yerel):
1) Replit'e import edin (Import from ZIP) veya yerelde açın.
2) Terminal'de: npm install
3) Ardından: npm start
4) Sunucu 3000 portunda çalışır (Replit otomatik port atayacak).

Gemini entegrasyonu:
- server.js içinde /api/gemini/text ve /api/gemini/image endpoint'leri mock yanıtlardır.
- Gerçek Gemini/OpenAI API çağrılarını sunucu tarafında yapın ve API anahtarını environment variable olarak saklayın (ör: GEMINI_API_KEY).
- İstersen sana server.js içine gerçek OpenAI/Gemini örneğini ekleyeyim (hangi API kullanacağınızı belirt).

Güvenlik:
- API anahtarlarınızı client-side kodda kesinlikle kullanmayın. Sunucu tarafında saklayın.

İstersen şimdi: (A) server.js içinde gerçek Gemini/OpenAI entegrasyonunu ekleyeyim, (B) Replit'e yüklemen için zip'i gönder. 
