const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const adminRouter = require('./router/admin');
const shopRouter = require('./router/shop');

app.set('view engine', 'pug');
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended: true})) ;
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin',adminRouter.router);
app.use(shopRouter);

app.use((req, res) => {
    res.status(404).render('404', {pageTitle: 'Page not found'});
})

app.listen(3000, console.log(`App running at http://localhost:3000`));