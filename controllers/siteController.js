exports.home = (req, res) => {
  const currentYear = new Date().getFullYear();
  res.render('home', { title: 'Sidewebz', stylesheet: 'home', year: currentYear, isHome: true });
};

exports.over = (req, res) => {
  const currentYear = new Date().getFullYear();
  res.render('over', { title: 'Over', stylesheet: 'over', year: currentYear });
};

exports.contact = (req, res) => {
  const currentYear = new Date().getFullYear();
  res.render('contact', { title: 'Contact', stylesheet: 'contact', year: currentYear });
};
