const db = require('../../config/db');
const { get } = require('../../routes/wareHouse');

StoreProduct = async (req, res) => {

    const { name, id_ctg, id_warehouse, description, price, image} = req.body;

    console.log(name , id_ctg, id_warehouse, description, price, image);

    // if (!name || !id_ctg || !id_warehouse || !description || !price || !image) {
    //     message = 'Please provide all fields';
    //     return res.json({ message });
    // }

    // try {
    //     const [results] = await db.promise().query('INSERT INTO products (product_name, product_price, product_quantity, product_category, product_supplier) VALUES (?,?,?,?,?)', [product_name, product_price, product_quantity, product_category, product_supplier]);
    //     message = 'Product added successfully';
    //     return res.json({ success: true, message });

    // } catch (error) {
    //     console.log(error);
    //     return res.status(500).send('Server error');
    // }
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

addCategory = async (req, res) => {
    const { name , description } = req.body;
    if (!name || !description) {
        return res.json({ message: 'Please provide all fields' });
    }

    if (name.length < 3) {
        return res.json({ message: 'Category name must be at least 3 characters' });
    }

    if (description.length < 10) {
        return res.json({ message: 'Category description must be at least 10 characters' });
    }

    const [category] = await db.promise().query('SELECT name FROM categories WHERE name = ?', [name]);
    if (category.length > 0) {
        return res.json({ message: 'Category already exists' });
    }

    try {
        const [results] = await db.promise().query('INSERT INTO categories (name, description) VALUES (?,?)', [name, description]);
        return res.json({ success: true, message: 'Category added successfully' });
    } catch (error) {
        console.log(error);
        return res.status(500).send('Server error');
    }
}


getCategories = async (req, res) => {
    try {
        const [categories] = await db.promise().query('SELECT * FROM categories');
        return res.json(categories);
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

module.exports = { StoreProduct , getSuplliers , getCategories , getWarehouses , addCategory};