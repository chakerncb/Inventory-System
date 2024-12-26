const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');
const AuthController = require('../controllers/wearHouse/AuthController');

// wear house routes


router.get('/', (req, res) => {
    res.render('wearHouse/dashboard');
});

router.get('/login', (req, res) => {
    res.render('wearHouse/auth/login');
});

// router.post('/login', AuthController.login);

router.get('/products', (req, res) => {
    res.render('wearHouse/products');
});

router.get('/orders', (req, res) => {
    res.render('wearHouse/orders');
});

router.get('/settings', (req, res) => {
    res.render('wearHouse/settings');
});

router.get('/suppliers', (req, res) => {
    res.render('wearHouse/suppliers');
});

router.get('/Categories', (req, res) => {
    res.render('wearHouse/Categories');
});






// router.get('/login', (req, res) => {
//     res.render('auth/login');
// });

// router.get('/register', (req, res) => {
//     res.render('auth/register');
// });

// router.post('/register', AuthController.register);
// router.post('/login', AuthController.login);

// router.get('/categories', (req, res) => {
//     res.render('categories');
// });

module.exports = router;