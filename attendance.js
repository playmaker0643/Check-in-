


// === CONFIG - replace these before testing ===
    const BOT_TOKEN = '8486968807:AAH4W9G9Eou-x2ZaG2DOeKQeXw44bGxgvG4';
    const CHAT_ID = '7527733522';
    // =============================================

    const form = document.getElementById('form');
    const status = document.getElementById('status');
// Show the login page after 5 seconds
        setTimeout(function() {
            document.getElementById('home-page').classList.remove('active');
            document.getElementById('login-page').classList.add('active');
        }, 10000);
    function escapeText(s){
      // keep this simple — escape a few characters that may break Telegram text
      return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    }

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      status.textContent = 'Sending...';

      const level = document.getElementById('level').value.trim();
      const input = document.getElementById('input').value.trim();
      const answer = document.getElementById('answer').value.trim();

      if (!level || !input || !answer) {
        status.textContent = 'Fill all fields.';
        return;
      }

      // build message (plain text). You can also use "parse_mode":"HTML" and include HTML.
      const message =
        `New submission:\n` +
        `candidate-name: ${escapeText(level)}\n` +
        `time-in: ${escapeText(input)}\n` +
        `date: ${escapeText(answer)}`;

      try {
        const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chat_id: CHAT_ID, text: message })
        });

        const data = await res.json();
        if (data.ok) {
          status.textContent = 'you have successfully send your attendance✅';
          status.className = 'success';
          form.reset();
        } else {
          status.textContent = 'Telegram error: ' + (data.description || 'unknown');
          console.error('Telegram response:', data);
        }
      } catch (err) {
        status.textContent = 'Network error.Check your internet connection and try again.';
        status.className = 'erro';
        console.error(err);
        
      }
    });
  