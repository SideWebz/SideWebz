const nodemailer = require('nodemailer');

exports.handleForm = async (req, res) => {
  const { naam, email, bericht } = req.body;

  console.log('Contactformulier ingevuld met:', { naam, email, bericht });
  console.log('Gebruik MAIL_USER en MAIL_PASS uit .env:');
  console.log('MAIL_USER:', process.env.MAIL_USER);
  console.log('MAIL_PASS:', process.env.MAIL_PASS ? '*** verborgen ***' : 'NIET GEDEFINIEERD');

  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
      debug: true,
      logger: true,
      connectionTimeout: 30000, // 30 sec timeout voor meer zekerheid
    });

    console.log('Transports is aangemaakt, probeer mail te verzenden...');

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

    console.log('Mail verzonden!');

    res.render('contact', {
      title: 'Contact',
      stylesheet: 'contact',
      year: new Date().getFullYear(),
      success: true,
    });
  } catch (err) {
    console.error('Fout bij mail verzenden:', err);
    res.render('contact', {
      title: 'Contact',
      stylesheet: 'contact',
      year: new Date().getFullYear(),
      error: true,
      errorMessage: err.message || 'Er is een fout opgetreden',
    });
  }
};
