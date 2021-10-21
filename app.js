const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const adminRouter = require('./router/admin');
const shopRouter = require('./router/shop');

app.use(bodyParser.urlencoded({extended: true})) ;

app.use('/admin',adminRouter);
app.use(shopRouter);

app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'))
})

app.listen(3000, console.log(`App running at http://localhost:3000`));