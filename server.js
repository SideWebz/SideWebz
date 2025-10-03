const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

require('dotenv').config();


const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Handlebars setup
app.engine('handlebars', exphbs.engine({
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views', 'layouts'),
  partialsDir: path.join(__dirname, 'views', 'partials')
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Static
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

// POST route voor formulier
app.post('/send-message', async (req, res) => {
  const { name, email, company, message } = req.body;

  try {
    // Transporter configureren (voorbeeld met Gmail)
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
      }
    });

    // Mail opties
    let mailOptions = {
      from: `"${name}" <${email}>`,
      to: 'vragen@sidewebz.be', // waar jij de mails wil ontvangen
      subject: `Nieuw bericht van ${name}`,
      html: `
        <h3>Nieuw bericht via je portfolio website</h3>
        <p><b>Naam:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Company:</b> ${company || 'Niet opgegeven'}</p>
        <p><b>Bericht:</b><br>${message}</p>
      `
    };

    // Versturen
    await transporter.sendMail(mailOptions);

    res.render('contact', { 
      title: 'Contact',
      success: '✅ Bedankt! Je bericht is verstuurd.',
      styles: '<link rel="stylesheet" href="/css/contact.css">'
    });
  } catch (err) {
    console.error(err);
    res.render('contact', { 
      title: 'Contact',
      error: '❌ Er ging iets mis. Probeer het later opnieuw.',
      styles: '<link rel="stylesheet" href="/css/contact.css">'
    });
  }
});

app.listen(port, () => {
  console.log(`Server draait op http://localhost:${port}`);
});
