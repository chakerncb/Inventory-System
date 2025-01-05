const db = require('../../config/db'); // Ensure db is required

const countEmployees = async (req, res) => {
    try {
        const [rows] = await db.promise().query('SELECT COUNT(*) as count FROM employees');
        res.json({ count: rows[0].count });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


countOrders = async (req, res) => {
    try {
        const [rows] = await db.promise().query('SELECT COUNT(*) as count FROM orders');
        res.json({ count: rows[0].count });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


countProducts = async (req, res) => {
    try {
        const [rows] = await db.promise().query('SELECT COUNT(*) as count FROM products');
        res.json({ count: rows[0].count });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

countCostumers = async (req, res) => {
    try {
        const [rows] = await db.promise().query('SELECT COUNT(*) as count FROM costumers');
        res.json({ count: rows[0].count });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    countEmployees ,
    countOrders ,
    countProducts ,
    countCostumers
};