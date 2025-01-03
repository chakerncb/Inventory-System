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

module.exports = { getWareHouses, getProducts, addCostumer , getCostumers};