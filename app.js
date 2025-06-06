
const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
require('dotenv').config();

app.set('trust proxy', true);



const contactRouter = require('./routes/contact');
app.use(express.urlencoded({ extended: true }));
app.use('/contact', contactRouter);

const routes = require('./routes/index');

app.engine('hbs', exphbs.engine({ extname: 'hbs', defaultLayout: 'main' }));
app.set('view engine', 'hbs');
app.use(express.static('public'));

app.use('/', routes);



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

