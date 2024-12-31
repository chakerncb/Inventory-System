const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');
const checkWareHouse = require('../middleware/WareHouseAuthentication');
// const AuthController = require('../controllers/wareHouse/AuthController');


router.use((req, res, next) => {
    res.locals.session = req.session;
    next();
});

router.get('/', checkWareHouse, (req, res) => {
    res.render('wareHouse/dashboard');
});

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