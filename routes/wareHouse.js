const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');
const AuthController = require('../controllers/wareHouse/AuthController');

// wear house routes


router.get('/', (req, res) => {
    res.render('wareHouse/dashboard');
});

router.get('/login', (req, res) => {
    res.render('wareHouse/auth/login');
});

// router.post('/login', AuthController.login);

router.get('/products', (req, res) => {
    res.render('wareHouse/products');
});

router.get('/orders', (req, res) => {
    res.render('wareHouse/orders');
});

router.get('/settings', (req, res) => {
    res.render('wareHouse/settings');
});

router.get('/suppliers', (req, res) => {
    res.render('wareHouse/suppliers');
});

router.get('/Categories', (req, res) => {
    res.render('wareHouse/Categories');
});

module.exports = router;