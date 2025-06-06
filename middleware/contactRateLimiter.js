const rateLimitMap = new Map();

const contactRateLimiter = (req, res, next) => {
  // Pak het IP uit de header of socket
  const rawIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

  // Soms is het een lijst (bij proxies), pak dan de eerste (echte) client-IP
  const ip = Array.isArray(rawIp)
    ? rawIp[0]
    : rawIp.split(',')[0].trim();

  // Log het IP zodat je kunt controleren of het werkt
  console.log(`[RateLimiter] IP van bezoeker: ${ip}`);

  const now = Date.now();
  const twentyFourHours = 24 * 60 * 60 * 1000;

  const lastSent = rateLimitMap.get(ip);

  if (lastSent && now - lastSent < twentyFourHours) {
    return res.render('contact', {
      title: 'Contact',
      stylesheet: 'contact',
      year: new Date().getFullYear(),
      rateLimitMessage: 'Je hebt al een bericht gestuurd. Probeer het later opnieuw (binnen 24u).',
    });
  }

  // IP nog niet bekend of 24u verstreken → doorgaan en tijd opslaan
  rateLimitMap.set(ip, now);
  next();
};

module.exports = { contactRateLimiter };
