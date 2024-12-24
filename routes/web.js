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







router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.get('/register', (req, res) => {
    res.render('auth/register');
});

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);

router.get('/categories', (req, res) => {
    res.render('categories');
});

module.exports = router;