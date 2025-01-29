const express = require('express');
const app = express();
const env = require('dotenv').config();
const port = process.env.APP_PORT;
const db = require('./config/db');
const AuthController = require('./controllers/AuthController');

app.use(express.json());
app.use('/public', express.static(__dirname + '/public'));
app.use('/scripts', express.static(__dirname + '/scripts')); 
app.use('/storage', express.static(__dirname + '/storage'));
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


// login routes

app.get('/login', (req, res) => {
    res.render('wareHouse/auth/login' );
});

app.post('/login', AuthController.login);

app.get('/logout' , (req,res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.redirect('/');
        }
        res.redirect('/login');
    });
});

// wearhouse routes

const wearHouseRoutes = require('./routes/wareHouse');
app.use('/wareHouse',wearHouseRoutes);

// seller routes

const sellerRoutes = require('./routes/seller');
app.use('/seller',sellerRoutes);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

