const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true})) ;

app.use('/add-product',(req, res, next) => {
    res.send('<form action="/product" method="POST"><input name="title" type="text"><button type="submit">Submit</button></form>');
})

app.post('/product', (req, res, next) =>{
    console.log(req.body)
    res.redirect('/');
})

app.use('/',(req, res, next) => {
    res.send('<h1>Hello World</h1>');
})

app.listen(3000, console.log(`App running at http://localhost:3000`));