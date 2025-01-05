const db = require('../../config/db');

const CountPendingOrders = async (req, res) => {
    try {
        const [orders] = await db.promise().query('SELECT COUNT(*) AS count FROM orders WHERE status = ?', ['pending']);
        res.json({ count: orders[0].count });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const CountCompletedOrders = async (req, res) => {
    try {
        const [orders] = await db.promise().query('SELECT COUNT(*) AS count FROM orders WHERE status = ?', ['completed']);
        res.json({ count: orders[0].count });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    CountPendingOrders,
    CountCompletedOrders
};