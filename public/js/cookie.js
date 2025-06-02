  // Toon banner als cookie nog niet geaccepteerd is
  if (!localStorage.getItem('cookiesAccepted')) {
    document.getElementById('cookie-banner').style.display = 'block';
  }

  // Bij akkoord knop
  document.getElementById('accept-cookies').addEventListener('click', function () {
    localStorage.setItem('cookiesAccepted', 'true');
    document.getElementById('cookie-banner').style.display = 'none';
  });
