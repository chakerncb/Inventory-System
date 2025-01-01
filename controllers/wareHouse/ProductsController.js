const multer = require('multer');
const path = require('path');
const db = require('../../config/db');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'storage/products/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

StoreProduct = async (req, res) => {
    const { name, id_ctg, id_supllier, id_warehouse, description, quantity, price } = req.body;
    const image = req.file ? req.file.filename : null;

    if (!name || !id_ctg || !id_warehouse || !description || !price || !image || !id_supllier || !quantity) {
        message = 'Please provide all fields';
        return res.json({ message });
    }

    try {
        const [results] = await db.promise().query('INSERT INTO products (name, description, price, quantity, id_s, id_ctg, id_w, image) VALUES (?,?,?,?,?,?,?,?)', [name, description, price, quantity, id_supllier, id_ctg, id_warehouse, image]);
        message = 'Product added successfully';
        return res.json({ success: true, message });
    } catch (error) {
        console.log(error);
        return res.status(500).send('Server error');
    }
}

getProducts = async (req, res) => {
    try {
        const [products] = await db.promise().query('SELECT * FROM products');
        return res.json(products);
    } catch (error) {
        console.log(error);
        return res.status(500).send('Server error');
    }
}

getSuplliers = async (req, res) => {
    try {
        const [suppliers] = await db.promise().query('SELECT * FROM suppliers');
        return res.json(suppliers);
    } catch (error) {
        console.log(error);
        return res.status(500).send('Server error');
    }
}

getWarehouses = async (req, res) => {

    try {
        const [warehouses] = await db.promise().query('SELECT * FROM warehouses');
        return res.json(warehouses);
    }
    catch (error) {
        console.log(error);
        return res.status(500).send('Server error');
    }
}

module.exports = { StoreProduct, getSuplliers, getWarehouses, upload , getProducts };