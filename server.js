const express = require('express');
const app = express();
const env = require('dotenv').config();
const port = process.env.APP_PORT;

// connect to mysql database using config/db.js
const db = require('./config/db');

app.use(express.json());
app.use('/public', express.static(__dirname + '/public'));
// app.use(express.static(path.join(__dirname, 'public')));
const routes = require('./routes/app');
app.use(routes);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

