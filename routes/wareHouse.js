const express = require('express');
const router = express.Router();
const checkWareHouse = require('../middleware/WareHouseAuthentication');
const ProductsController = require('../controllers/wareHouse/ProductsController');
const CategoriesController = require('../controllers/wareHouse/CategorysController');

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
router.post('/products', checkWareHouse, ProductsController.upload.single('image'),ProductsController.StoreProduct);
router.get('/api/products', checkWareHouse, ProductsController.getProducts);
router.get('/api/suplliers', checkWareHouse, ProductsController.getSuplliers);
router.get('/api/warehouses', checkWareHouse, ProductsController.getWarehouses);



// categories routes

router.get('/Categories', checkWareHouse, (req, res) => {
    res.render('wareHouse/Categories');
});
router.get('/api/categories', checkWareHouse, CategoriesController.getCategories);
router.post('/categories', checkWareHouse, CategoriesController.addCategory);
router.post('/categories/delete', checkWareHouse, CategoriesController.deleteCategory);





router.get('/orders', (req, res) => {
    res.render('wareHouse/orders');
});

router.get('/settings', (req, res) => {
    res.render('wareHouse/settings');
});

router.get('/suppliers', (req, res) => {
    res.render('wareHouse/suppliers');
});



module.exports = router;