const express = require('express');
const router = express.Router();
const checkWareHouse = require('../middleware/WareHouseAuthentication');
const ProductsController = require('../controllers/wareHouse/ProductsController');
const CategoriesController = require('../controllers/wareHouse/CategorysController');
const HomeController = require('../controllers/wareHouse/HomeController');
const OrdersController = require('../controllers/wareHouse/OrdersController');

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
router.get('/api/products/:id', checkWareHouse, ProductsController.getProductById);
router.get('/api/suplliers', checkWareHouse, ProductsController.getSuplliers);
router.get('/api/warehouses', checkWareHouse, ProductsController.getWarehouses);
router.post('/products/delete', checkWareHouse, ProductsController.deleteProduct);
router.post('/products/update', checkWareHouse, ProductsController.upload.single('image'), ProductsController.updateProduct)


// categories routes

router.get('/Categories', checkWareHouse, (req, res) => {
    res.render('wareHouse/Categories');
});
router.get('/api/categories', checkWareHouse, CategoriesController.getCategories);
router.post('/categories', checkWareHouse, CategoriesController.addCategory);
router.post('/categories/delete', checkWareHouse, CategoriesController.deleteCategory);
router.post('/categories/edit', checkWareHouse, CategoriesController.editCategory);
router.post('/categories/update', checkWareHouse, CategoriesController.updateCategory);


router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.redirect('/');
        }
        res.redirect('/login');
    });
});

router.get('/orders', checkWareHouse, (req, res) => {
    res.render('wareHouse/orders');
});
router.get('/api/orders', checkWareHouse, OrdersController.getOrders);
router.get('/api/orders/pending', checkWareHouse, HomeController.CountPendingOrders);
router.get('/api/orders/completed', checkWareHouse, HomeController.CountCompletedOrders);
// router.post('/orders/delete', checkWareHouse, OrdersController.deleteOrder);

router.get('/settings', (req, res) => {
    res.render('wareHouse/settings');
});

router.get('/suppliers', (req, res) => {
    res.render('wareHouse/suppliers');
});

module.exports = router;