const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const app = express();
const port = 3000;

// Set Handlebars as view engine
app.engine('handlebars', exphbs.engine({
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views', 'layouts'),
  partialsDir: path.join(__dirname, 'views', 'partials')
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Static files (optional, for css/js/images)
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
  res.render('index', { 
    title: 'Home', 
    year: new Date().getFullYear(),
    styles: '<link rel="stylesheet" href="/css/index.css">'
  });
});

app.get('/about', (req, res) => {
  res.render('about', { 
    title: 'About', 
    year: new Date().getFullYear(),
    styles: '<link rel="stylesheet" href="/css/about.css">'
  });
});

app.get('/contact', (req, res) => {
  res.render('contact', { 
    title: 'Contact', 
    year: new Date().getFullYear(),
    styles: '<link rel="stylesheet" href="/css/contact.css">'
  });
});

app.get('/projects', (req, res) => {
  res.render('projects', { 
    title: 'Projects', 
    year: new Date().getFullYear(),
    styles: '<link rel="stylesheet" href="/css/projects.css">'
  });
});

app.listen(port, () => {
  console.log(`Server draait op http://localhost:${port}`);
});