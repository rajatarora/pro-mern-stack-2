/*
This is a simple Express server that serves static files present in the public folder on port 3000.
 */

const express = require('express');

const app = express();
app.use(express.static('public'));

app.listen(3000, function() {
    console.log('App started on port 3000');
});