const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');
const AuthController = require('../controllers/AuthController');

const viewsDir = path.join(__dirname, '/../views');

router.get('/', (req, res) => {
    res.render('index');
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