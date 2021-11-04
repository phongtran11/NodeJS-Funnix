const express = require('express');
const app = express();

const router = require('./router/index');
const db = require('./config/db');

// Connect to MongoDB
db();

app.use(express.static('public'));

// Parse body
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// View engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Init router
router(app);

app.listen(3000, () => {
    console.log('App running at http://localhost:3000');
});
