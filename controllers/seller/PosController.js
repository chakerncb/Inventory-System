const db = require("../../config/db");

getWareHouses = async (req, res) => {

    try {
        const [warehouses] = await db.promise().query('SELECT * FROM warehouses');
        return res.json(warehouses);
    }
    catch (error) {
        console.log(error);
    }
}

getProducts = async (req, res) => {
    
    try {
        let [result] = await db.promise().query('SELECT * FROM products');
        return res.json(result);
    }
    catch (error) {
        console.log(error);
    }
}


addCostumer = async (req, res) => {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        return res.status(400).json({ message: "All fields are required" });
    }

    if (name.length < 3) {
        return res.status(400).json({ message: "Name must be at least 3 characters" });
    }

    const emailExists = await db.promise().query('SELECT * FROM costumers WHERE email = ?', [email]);
    if (emailExists[0].length > 0) {
        return res.status(400).json({ message: "Email already exists" });
    }

    const phoneExists = await db.promise().query('SELECT * FROM costumers WHERE phone = ?', [phone]);
    if (phoneExists[0].length > 0) {
        return res.status(400).json({ message: "Phone number already exists" });
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
        return res.status(400).json({ message: "Invalid phone number" });
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email" });
    }

    const nameExists = await db.promise().query('SELECT * FROM costumers WHERE name = ?', [name]);
    if (nameExists[0].length > 0) {
        return res.status(400).json({ success: true  , message: "Name already exists" });
    }


    try {
        await db.promise().query('INSERT INTO costumers (name, email, phone) VALUES (?, ?, ?)', [name, email, phone]);
        return res.json({ message: 'Costumer added successfully' });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

getCostumers = async (req, res) => {
    try {
        const [costumers] = await db.promise().query('SELECT * FROM costumers');
        return res.json(costumers);
    }
    catch (error) {
        console.log(error);
    }
}


getCategories = async (req, res) => {
    try {
        const [categories] = await db.promise().query('SELECT * FROM categories');
        return res.json(categories);
    }
    catch (error) {
        console.log(error);
    }
}


getProduct = async (req, res) => {
    const id = req.params.id_P;
    if (!id) {
        return res.status(400).json({ message: "Product ID is required" });
    }

    try {
        const [product] = await db.promise().query('SELECT * FROM products WHERE id_P = ?', [id]);
        if (product.length === 0) {
            return res.status(404).json({ message: "Product not found" });
        }
        return res.json(product[0]);
    }
    catch (error) {
        console.log(error);
    }
}
 

addOrder = async (req, res) => {
    const { orders, customer, warehouse, discount, totalPrice } = req.body;

    console.log(orders , customer , warehouse , discount , totalPrice);

    // if (!orders || !customer || !warehouse || !totalPrice) {
    //     return res.status(400).json({ message: "All fields are required" });
    // }

    // if (!Array.isArray(orders) || orders.length === 0) {
    //     return res.status(400).json({ message: "Orders must be a non-empty array" });
    // }

    // if (isNaN(customer) || isNaN(warehouse) || isNaN(totalPrice) || (discount && isNaN(discount))) {
    //     return res.status(400).json({ message: "Invalid data" });
    // }

    // const customerExists = await db.promise().query('SELECT * FROM costumers WHERE id_C = ?', [customer]);
    // if (customerExists[0].length === 0) {
    //     return res.status(404).json({ message: "Customer not found" });
    // }

    // const warehouseExists = await db.promise().query('SELECT * FROM warehouses WHERE id_W = ?', [warehouse]);
    // if (warehouseExists[0].length === 0) {
    //     return res.status(404).json({ message: "Warehouse not found" });
    // }

    // try {
    //     const orderPromises = orders.map(order => {
    //         const { product_id, quantity } = order;
    //         if (!product_id || !quantity || isNaN(product_id) || isNaN(quantity)) {
    //             throw new Error("Invalid order data");
    //         }

    //         return db.promise().query('INSERT INTO orders (costumer_id, product_id, quantity, total) VALUES (?, ?, ?, ?)', [customer, product_id, quantity, totalPrice]);
    //     });

    //     await Promise.all(orderPromises);
    //     return res.json({ message: 'Order added successfully' });
    // }
    // catch (error) {
    //     console.log(error);
    //     return res.status(500).json({ message: "Internal server error" });
    // }
}
module.exports = { getWareHouses, getProducts, addCostumer , getCostumers , getCategories , getProduct , addOrder };