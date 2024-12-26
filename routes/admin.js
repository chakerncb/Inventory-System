const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');
const AuthController = require('../controllers/admin/AuthController');
const authMiddleware = require('../middleware/AdminAuthification');
const EmployeeController = require('../controllers/admin/employeeController');
const e = require('express');


router.get('/', authMiddleware, (req, res) => {
    res.render('admin/dashboard' , {session: req.session});
});

router.get('/login', (req, res) => {
    res.render('admin/auth/login');
});


router.post('/login', AuthController.login);


router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.redirect('/admin');
        }
        // res.clearCookie('sid');
        res.redirect('/admin/login');
    });
});


router.get('/products', authMiddleware, (req, res) => {
    res.render('admin/products');
});


router.get('/orders', authMiddleware, (req, res) => {
    res.render('admin/orders');
});


router.get('/employees', authMiddleware, (req, res) => {
    res.render('admin/employees');
});


router.post('/employees', authMiddleware, EmployeeController.newEmployee);

router.get('/api/employees', authMiddleware, EmployeeController.getEmployees);


router.get('/api/roles', authMiddleware , (req, res) => {
    EmployeeController.getRoles(req, res);
});


router.get('/settings', authMiddleware, (req, res) => {
    res.render('admin/settings');
});


router.get('/suppliers', authMiddleware, (req, res) => {
    res.render('admin/suppliers');
});


router.get('/wareHouses', authMiddleware, (req, res) => {
    res.render('admin/wareHouses');
});

module.exports = router;