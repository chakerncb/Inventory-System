const express = require('express');
const router = express.Router();
const checkWareHouse = require('../middleware/SellerAuthentication');

router.use((req, res, next) => {
    res.locals.session = req.session;
    next();
});

router.get('/', checkWareHouse, (req, res) => {
    res.send('pos dashboard');
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


module.exports = router;