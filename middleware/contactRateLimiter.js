const rateLimitMap = new Map();

const contactRateLimiter = (req, res, next) => {
  const ip = req.ip;
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
