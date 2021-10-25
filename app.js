const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const expressHbs = require('express-handlebars');
const adminRouter = require('./router/admin');
const shopRouter = require('./router/shop');
const errorController = require('./controllers/error');

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true})) ;
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin',adminRouter);
app.use(shopRouter);
app.use(errorController.get404);

app.listen(3000, console.log(`App running at http://localhost:3000`));
