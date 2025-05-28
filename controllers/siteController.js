exports.home = (req, res) => {
  const currentYear = new Date().getFullYear();
  res.render('home', { title: 'Sidewebz', stylesheet: 'home', year: currentYear, isHome: true });
};

exports.projects = (req, res) => {
  const currentYear = new Date().getFullYear();
  res.render('projects', { title: 'Projecten', stylesheet: 'projects', year: currentYear });
};

exports.contact = (req, res) => {
  const currentYear = new Date().getFullYear();
  res.render('contact', { title: 'Contact', stylesheet: 'contact', year: currentYear });
};
