const nodemailer = require('nodemailer');

exports.showForm = (req, res) => {
  res.render('contact', {
    title: 'Contact',
    stylesheet: 'contact',
    year: new Date().getFullYear(),
  });
};

exports.handleForm = async (req, res) => {
  const { naam, email, bericht } = req.body;

  try {
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // Zorg dat dit op false staat voor STARTTLS (poort 587)
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  debug: true,
  logger: true,
});


    await transporter.sendMail({
      from: `"${naam}" <${email}>`,
      to: 'vragen@sidewebz.be',
      replyTo: email,
      subject: 'Nieuw bericht via contactformulier',
      html: `
        <h3>Nieuw bericht ontvangen</h3>
        <p><strong>Naam:</strong> ${naam}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Bericht:</strong><br>${bericht}</p>
      `,
    });

    res.render('contact', {
      title: 'Contact',
      stylesheet: 'contact',
      year: new Date().getFullYear(),
      success: true,
    });
  } catch (err) {
    console.error(err);
    res.render('contact', {
      title: 'Contact',
      stylesheet: 'contact',
      year: new Date().getFullYear(),
      error: true,
    });
  }
};
