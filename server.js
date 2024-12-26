const express = require('express');
const app = express();
const env = require('dotenv').config();
const port = process.env.APP_PORT;
const db = require('./config/db');

app.use(express.json());
app.use('/public', express.static(__dirname + '/public'));
app.use('/scripts', express.static(__dirname + '/scripts')); 
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
const session = require('express-session');

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    // cookie: { secure: false }
}));

// admin routes

const adminRoutes = require('./routes/admin');
app.use('/admin',adminRoutes);

// employee routes

const wearHouseRoutes = require('./routes/wearHouse');
app.use('/wearHouse',wearHouseRoutes);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

