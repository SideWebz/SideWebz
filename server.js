const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

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

  if (!name || !email || !message) {
    return res.render('contact', {
      title: 'Contact',
      year: new Date().getFullYear(),
      error: '❌ Vul alstublieft alle verplichte velden in.',
      styles: '<link rel="stylesheet" href="/css/contact.css">'
    });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      },
      tls: {
        rejectUnauthorized: false
      },
      connectionTimeout: 10000
    });

    const mailOptions = {
      from: process.env.MAIL_USER,
      replyTo: email,
      to: process.env.MAIL_RECEIVER || process.env.MAIL_USER,
      subject: `Nieuw bericht van ${name}`,
      html: `
        <h3>Nieuw bericht via je portfolio website</h3>
        <p><b>Naam:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Company:</b> ${company || 'Niet opgegeven'}</p>
        <p><b>Bericht:</b><br>${message}</p>
      `
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error('Mailer error:', err);

        return res.render('contact', {
          title: 'Contact',
          year: new Date().getFullYear(),
          error: '❌ Er ging iets mis bij het verzenden. Probeer het later opnieuw.',
          styles: '<link rel="stylesheet" href="/css/contact.css">'
        });
      }

      console.log('Mailer success:', info.response);

      res.render('contact', {
        title: 'Contact',
        year: new Date().getFullYear(),
        success: '✅ Bedankt! Je bericht is verstuurd.',
        styles: '<link rel="stylesheet" href="/css/contact.css">'
      });
    });

  } catch (err) {
    console.error('Unexpected error:', err);

    res.render('contact', {
      title: 'Contact',
      year: new Date().getFullYear(),
      error: '❌ Er ging iets mis. Probeer het later opnieuw.',
      styles: '<link rel="stylesheet" href="/css/contact.css">'
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server draait op http://localhost:${PORT}`);
});