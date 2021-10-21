const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const adminRouter = require('./router/admin');
const shopRouter = require('./router/shop');

app.use(bodyParser.urlencoded({extended: true})) ;

app.use(shopRouter);
app.use(adminRouter);

app.use((req, res) => {
    res.status(404).send('<h1>Page Not Found</h1>')
})

app.listen(3000, console.log(`App running at http://localhost:3000`));