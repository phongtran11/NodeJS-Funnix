const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const adminRouter = require('./router/admin');
const shopRouter = require('./router/shop');

app.use(bodyParser.urlencoded({extended: true})) ;

app.use(adminRouter);
app.use(shopRouter);



app.listen(3000, console.log(`App running at http://localhost:3000`));