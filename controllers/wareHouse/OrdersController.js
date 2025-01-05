const db = require('../../config/db');


getOrders = async   (req, res) => {
   
    try {
        const [orders] = await db.promise().query('SELECT * FROM orders');


        for (const order of orders) {
            const [costumer] = await db.promise().query('SELECT * FROM costumers WHERE id_c = ?', [order.id_cus]);
            order.customer = costumer[0].name;
        }

        res.json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

}

module.exports = {
    getOrders
}