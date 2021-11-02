const express = require('express');
const app = express();
const router = require('./router/index');

// Init router
router(app);

app.listen(3000, () => {
    console.log('App running at http://localhost:3000');
});
