const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/admin/AuthController');
const authMiddleware = require('../middleware/AdminAuthentication');
const EmployeeController = require('../controllers/admin/employeeController');
const SuppliersController = require('../controllers/admin/SuppliersController');
const WareHouseController = require('../controllers/admin/WareHouseController');
const HomeController = require('../controllers/admin/HomeController');

router.use((req, res, next) => {
    res.locals.session = req.session;
    next();
});
router.get('/', authMiddleware, (req, res) => {
    res.render('admin/dashboard' , {title: 'Dashboard'} );
});


router.get('/login', (req, res) => {
    res.render('admin/auth/login' );
});

router.post('/login', AuthController.login);


router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.redirect('/');
        }
        res.redirect('/admin/login');
    });
});



//  


router.get('/products', authMiddleware, (req, res) => {
    res.render('admin/products' , {title: 'Manage Products'} );
});
router.get('/api/products/count', authMiddleware, HomeController.countProducts);


router.get('/orders', authMiddleware, (req, res) => {
    res.render('admin/orders' , {title: 'Manage Orders'} );
});


// employee routes :


router.get('/employees', authMiddleware, (req, res) => {
    res.render('admin/employees' , {title: 'Manage Employees'} );
});

router.post('/employees', authMiddleware, EmployeeController.newEmployee);

router.get('/api/employees', authMiddleware, EmployeeController.getEmployees);
router.get('/api/roles', authMiddleware , EmployeeController.getRoles);
router.post('/employees/delete', authMiddleware, EmployeeController.deleteEmployee);
router.post('/employees/edit', authMiddleware, EmployeeController.editEmployee);
router.post('/employees/update', authMiddleware, EmployeeController.updateEmployee);
router.get('/api/employees/count', authMiddleware, HomeController.countEmployees);


// supplier routes :


router.get('/suppliers', authMiddleware, (req, res) => {
    res.render('admin/suppliers' , {title: 'Manage Suppliers'} );
});

router.post('/suppliers', authMiddleware, SuppliersController.newSupplier);

router.get('/api/suppliers', authMiddleware, SuppliersController.getSuppliers);
router.post('/suppliers/delete', authMiddleware, SuppliersController.deleteSupplier);
router.post('/suppliers/edit', authMiddleware, SuppliersController.editSupplier);
router.post('/suppliers/update', authMiddleware, SuppliersController.updateSupplier);




// wearhouse routes :


router.get('/wareHouses', authMiddleware, (req, res) => {
    res.render('admin/wareHouses' , {title: 'Manage Warehouses'} );
});

router.post('/wareHouses', authMiddleware, WareHouseController.newWareHouse);

router.get('/api/wareHouses', authMiddleware, WareHouseController.getWarehouses);
router.post('/wareHouses/delete', authMiddleware, WareHouseController.deleteWarehouse);
router.post('/wareHouses/edit', authMiddleware, WareHouseController.editWarehouse);
router.post('/wareHouses/update', authMiddleware, WareHouseController.updateWarehouse);



// orders routes 


router.get('/api/orders/count', authMiddleware, HomeController.countOrders);

// costumer routes :

router.get('/api/costumers/count', authMiddleware, HomeController.countCostumers);

// admin settings :

router.get('/settings', authMiddleware, (req, res) => {
    res.render('admin/settings' , {title: 'Settings'} );
});

module.exports = router;