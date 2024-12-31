const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/admin/AuthController');
const authMiddleware = require('../middleware/AdminAuthentication');
const EmployeeController = require('../controllers/admin/employeeController');
const SuppliersController = require('../controllers/admin/SuppliersController');
const WareHouseController = require('../controllers/admin/WareHouseController');

router.use((req, res, next) => {
    res.locals.session = req.session;
    next();
});
router.get('/', authMiddleware, (req, res) => {
    res.render('admin/dashboard');
});


// 

router.get('/login', (req, res) => {
    res.render('admin/auth/login');
});

router.post('/login', AuthController.login);


router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.redirect('/admin');
        }
        res.redirect('/admin/login');
    });
});



//  


router.get('/products', authMiddleware, (req, res) => {
    res.render('admin/products');
});


router.get('/orders', authMiddleware, (req, res) => {
    res.render('admin/orders');
});


// employee routes :


router.get('/employees', authMiddleware, (req, res) => {
    res.render('admin/employees');
});

router.post('/employees', authMiddleware, EmployeeController.newEmployee);

router.get('/api/employees', authMiddleware, EmployeeController.getEmployees);
router.get('/api/roles', authMiddleware , EmployeeController.getRoles);
router.post('/employees/delete', authMiddleware, EmployeeController.deleteEmployee);
router.post('/employees/edit', authMiddleware, EmployeeController.editEmployee);
router.post('/employees/update', authMiddleware, EmployeeController.updateEmployee);




// supplier routes :


router.get('/suppliers', authMiddleware, (req, res) => {
    res.render('admin/suppliers');
});

router.post('/suppliers', authMiddleware, SuppliersController.newSupplier);

router.get('/api/suppliers', authMiddleware, SuppliersController.getSuppliers);
router.post('/suppliers/delete', authMiddleware, SuppliersController.deleteSupplier);
router.post('/suppliers/edit', authMiddleware, SuppliersController.editSupplier);
router.post('/suppliers/update', authMiddleware, SuppliersController.updateSupplier);




// wearhouse routes :


router.get('/wareHouses', authMiddleware, (req, res) => {
    res.render('admin/wareHouses');
});

router.post('/wareHouses', authMiddleware, WareHouseController.newWareHouse);

router.get('/api/wareHouses', authMiddleware, WareHouseController.getWarehouses);
router.post('/wareHouses/delete', authMiddleware, WareHouseController.deleteWarehouse);
router.post('/wareHouses/edit', authMiddleware, WareHouseController.editWarehouse);
router.post('/wareHouses/update', authMiddleware, WareHouseController.updateWarehouse);


// admin settings :


router.get('/settings', authMiddleware, (req, res) => {
    res.render('admin/settings');
});

module.exports = router;