const express = require('express');
const app = express();
const env = require('dotenv').config();
const port = process.env.APP_PORT;
const db = require('./config/db');

app.use(express.json());
app.use('/public', express.static(__dirname + '/public')); // Fixed path
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

const routes = require('./routes/web');
app.use(routes);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

