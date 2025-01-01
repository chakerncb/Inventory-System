const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');
const checkWareHouse = require('../middleware/WareHouseAuthentication');
const ProductsController = require('../controllers/wareHouse/ProductsController');

router.use((req, res, next) => {
    res.locals.session = req.session;
    next();
});

router.get('/', checkWareHouse, (req, res) => {
    res.render('wareHouse/dashboard');
});

router.get('/products', checkWareHouse , (req, res) => {
    res.render('wareHouse/products');
});
router.post('/products', checkWareHouse, ProductsController.StoreProduct);
router.get('/api/suplliers', checkWareHouse, ProductsController.getSuplliers);
router.post('/categories', checkWareHouse, ProductsController.addCategory);
router.get('/api/categories', checkWareHouse, ProductsController.getCategories);
router.get('/api/warehouses', checkWareHouse, ProductsController.getWarehouses);





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