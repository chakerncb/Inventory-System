const express = require('express');
const router = express.Router();
const checkSeller = require('../middleware/SellerAuthentication');
const PosController = require('../controllers/seller/PosController');

router.use((req, res, next) => {
    res.locals.session = req.session;
    next();
});

router.get('/', checkSeller, (req, res) => {
    res.render('pos/index');
});


router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.redirect('/');
        }
        res.redirect('/login');
    });
});



router.get('/api/warehouses', checkSeller, PosController.getWareHouses);
router.get('/api/products', checkSeller, PosController.getProducts);
router.get('/api/categories', checkSeller, PosController.getCategories);
router.get('/api/products/:id_P', checkSeller, PosController.getProduct);


// costumer routes

router.get('/costumers', checkSeller, PosController.getCostumers);
router.post('/costumers', checkSeller, PosController.addCostumer);



// orders routes

router.post('/orders', checkSeller, PosController.addOrder);









router.get('/orders', (req, res) => {
    res.render('wareHouse/orders');
});

router.get('/settings', (req, res) => {
    res.render('wareHouse/settings');
});


module.exports = router;