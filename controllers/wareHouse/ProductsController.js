const multer = require('multer');
const path = require('path');
const fs = require('fs');
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
    const image = req.file ? req.file.filename : 'no-image.png';

    if (!name || !id_ctg || !id_warehouse || !description || !price || !id_supllier || !quantity) {
        message = 'Please provide all fields';
        return res.json({ message });
    }

    if (!req.file) {
        message = 'Please provide an image';
        return res.json({ message });
    }

    if (req.file.size > 1024 * 1024 * 5) {
        message = 'Image should be less than 5mb';
        return res.json({ message });
    }

    if (req.file.mimetype !== 'image/jpeg' && req.file.mimetype !== 'image/png' && req.file.mimetype !== 'image/jpg' && req.file.mimetype !== 'image/webp') {
        message = 'Image should be of type jpg, jpeg, png or webp';
        return res.json({ message });
    }

    if (name.length < 6) {
        message = 'Name should be atleast 6 characters long';
        return res.json({ message });
    }

    if (description.length < 10) {
        message = 'Description should be atleast 10 characters long';
        return res.json({ message });
    }


    if (quantity <= 0) {
        message = 'Quantity should be greater than 0';
        return res.json({ message });
    }

    if (price <= 0) {

        message = 'Price should be greater than 0';
        return res.json({ message });
    }

    const [product] = await db.promise().query('SELECT * FROM products WHERE name = ?', [name]);
    if (product.length > 0) {
        message = 'Product already exists';
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

deleteProduct = async (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.json({ message: 'Error occurred while deleting product !!' });
    }

    try {
        const [product] = await db.promise().query('SELECT * FROM products WHERE id_P = ?', [id]);

        if (product.length > 0) {

            const [results] = await db.promise().query('DELETE FROM products WHERE id_P = ?', [id]);

            if (product[0].image !== 'no-image.png') {
                fs.unlinkSync(`storage/products/${product[0].image}`);
            }
            
            return res.json({ success: true, message: 'Product deleted successfully' });

        } else {
            return res.json({ message: 'Error occurred while deleting product' });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error occurred while deleting product' });
    }
}

getProductById = async (req, res) => {
    const { id } = req.params;

    try {
        const [products] = await db.promise().query('SELECT * FROM products WHERE id_P = ?', [id]);
        if (products.length === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }
        return res.json(products[0]);
    } catch (error) {
        console.log(error);
        return res.status(500).send('Server error');
    }
}


updateProduct = async (req , res) => {

    const { id_P ,name, id_ctg, id_supllier, id_warehouse, description, quantity, price } = req.body;
    const image = req.file;


        // if (req.file.size > 1024 * 1024 * 5) {
        //     message = 'Image should be less than 5mb';
        //     return res.json({ message });
        // }

        if (name.length < 6) {
            message = 'Name should be atleast 6 characters long';
            return res.json({ message });
        }

        if (description.length < 10) {
            message = 'Description should be atleast 10 characters long';
            return res.json({ message });
        }


        if (quantity <= 0) {
            message = 'Quantity should be greater than 0';
            return res.json({ message });
        }

        if (price <= 0) {

            message = 'Price should be greater than 0';
            return res.json({ message });
        }

    try {

        if (image) {
        const result = await db.promise().query('UPDATE products SET name = ? , description = ? , price = ? , quantity = ? , id_s = ? , id_ctg = ? , id_w = ? , image = ? WHERE id_P = ?', [name , description, price , quantity , id_supllier , id_ctg, id_warehouse , image , id_P]);
        message = 'Product updated successfully';
        return res.json({ success: true , message });    
    }
    else {
        const result = await db.promise().query('UPDATE products SET name = ? , description = ? , price = ? , quantity = ? , id_s = ? , id_ctg = ? , id_w = ? WHERE id_P = ?', [name , description, price , quantity , id_supllier , id_ctg, id_warehouse , id_P]);
        message = 'Product updated successfully';
        return res.json({ success: true , message });
    }
    } catch (error) {
    console.log(error);
    return res.status(500).send('Server error');
    }




}

module.exports = { StoreProduct, getSuplliers, getWarehouses, upload, getProducts, deleteProduct, getProductById, updateProduct };