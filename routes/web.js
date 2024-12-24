const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');
const AuthController = require('../controllers/AuthController');

const viewsDir = path.join(__dirname, '/../views');


router.get('/', (req, res) => {
    res.render('homePage');
});


router.get('/admin/', (req, res) => {
    res.render('admin/dashboard');
});


router.get('/admin/login', (req, res) => {
    res.render('admin/auth/login');
});


router.post('/admin/login', AuthController.login);


router.get('/admin/products', (req, res) => {
    res.render('admin/products');
});


router.get('/admin/orders', (req, res) => {
    res.render('admin/orders');
});


router.get('/admin/employees', (req, res) => {
    res.render('admin/employees');
});


router.get('/admin/settings', (req, res) => {
    res.render('admin/settings');
});


router.get('/admin/suppliers', (req, res) => {
    res.render('admin/suppliers');
});


router.get('/admin/wareHouses', (req, res) => {
    res.render('admin/wareHouses');
});




// wear house routes


router.get('/wearHouse/', (req, res) => {
    res.render('wearHouse/dashboard');
});

router.get('/wearHouse/login', (req, res) => {
    res.render('wearHouse/auth/login');
});

router.post('/wearHouse/login', AuthController.login);

router.get('/wearHouse/products', (req, res) => {
    res.render('wearHouse/products');
});

router.get('/wearHouse/orders', (req, res) => {
    res.render('wearHouse/orders');
});

router.get('/wearHouse/settings', (req, res) => {
    res.render('wearHouse/settings');
});

router.get('/wearHouse/suppliers', (req, res) => {
    res.render('wearHouse/suppliers');
});

router.get('/wearHouse/Categories', (req, res) => {
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