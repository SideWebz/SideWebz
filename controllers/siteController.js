exports.home = (req, res) => {
  const currentYear = new Date().getFullYear();
  res.render('home', { title: 'Sidewebz', stylesheet: 'home', year: currentYear, isHome: true });
};

exports.over = (req, res) => {
  const currentYear = new Date().getFullYear();
  res.render('over', { title: 'Sidewebz - Over', stylesheet: 'over', year: currentYear });
};

exports.contact = (req, res) => {
  const currentYear = new Date().getFullYear();
  res.render('contact', { title: 'Sidewebz - Contact', stylesheet: 'contact', year: currentYear });
};


const path = require('path');

exports.privacy = (req, res) => {
  const filePath = path.join(__dirname, '..', 'public', 'privacy.pdf');
  res.download(filePath, 'privacy.pdf', (err) => {
    if (err) {
      console.error('Fout bij downloaden privacy.pdf:', err);
      res.status(500).send('Kon het bestand niet downloaden.');
    }
  });
};

exports.cookie = (req, res) => {
  const filePath = path.join(__dirname, '..', 'public', 'cookiebeleid.pdf');
  res.download(filePath, 'cookiebeleid.pdf', (err) => {
    if (err) {
      console.error('Fout bij downloaden cookiebeleid.pdf:', err);
      res.status(500).send('Kon het bestand niet downloaden.');
    }
  });
};

exports.terms = (req, res) => {
  const filePath = path.join(__dirname, '..', 'public', 'algemene-voorwaarden.pdf');
  res.download(filePath, 'algemene-voorwaarden.pdf', (err) => {
    if (err) {
      console.error('Fout bij downloaden algemene-voorwaarden.pdf:', err);
      res.status(500).send('Kon het bestand niet downloaden.');
    }
  });
};
