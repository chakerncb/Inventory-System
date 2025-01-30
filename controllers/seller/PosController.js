const db = require("../../config/db");
const fs = require('fs');
const invoice = require('../../scripts/seller/invoice');


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
        let [result] = await db.promise().query('SELECT * FROM products WHERE quantity > 0');
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

    if (!Array.isArray(orders) || orders.length === 0) {
        return res.status(400).json({ message: "please add a product !!" });
    }

    if (isNaN(customer) || isNaN(totalPrice)) {
        return res.status(400).json({ message: "Invalid data" });
    }

    const [customerExists] = await db.promise().query('SELECT * FROM costumers WHERE id_c = ?', [customer]);
    if (customerExists.length === 0) {
        return res.status(404).json({ message: "Customer not found" });
    }

    let customerData = {
        name: customerExists[0].name,
        phone: customerExists[0].phone,
        email: customerExists[0].email
    };

    if (warehouse !== 'all'){
        const warehouseExists = await db.promise().query('SELECT * FROM warehouses WHERE id_W = ?', [warehouse]);
        if (warehouseExists[0].length === 0) {
            return res.status(404).json({ message: "Warehouse not found" });
        }
    }

    try {
            const order_code = Math.random().toString(36).substring(2, 8).toUpperCase();

            const result = db.promise().query('INSERT INTO orders (order_code, total_price, status, payment_method, payment_status, id_cus) VALUES (?, ?, ?, ?, ?, ?)', [order_code, totalPrice, 'pending', 'cash', 'pending', customer]);

            for (const order of orders) {
                // console.log('order :', order);
                const [product] = await db.promise().query('SELECT * FROM products WHERE id_P = ?', [order.id_P]);

                if (product.length === 0) {
                    return res.status(404).json({ message: "Product not found" });
                }

                        const productQuantity = product[0].quantity - order.quantity;

                        if (productQuantity < 0) {
                            return res.status(400).json({ message: "Not enough quantity" });
                        }

                        await db.promise().query('UPDATE products SET quantity = ? WHERE id_P = ? AND id_W = ?', [productQuantity, order.id_P, order.id_w]);
            }

            // create invoice
            let products = [];

            orders.forEach(order => {
                products.push({
                    name: order.name,
                    quantity: order.quantity,
                    price: order.price,
                    warehouse: order.id_w
                });                
            });

            var data = {
                "currency": "USD",
                "taxNotation": "vat",
                "marginTop": 25,
                "marginRight": 25,
                "marginLeft": 25,
                "marginBottom": 25,
                // "logo": "/public/img/inventory-management-3-48.png",
                // "background": "https://public.easyinvoice.cloud/img/watermark-draft.jpg",
                "sender": {
                    "company": "chaker",
                    "address": "guelma algeria",
                    "zip": "1234 AB",
                    "city": "Guelma",
                    "country": "Algeia"
                },
                "client": {
                    "company": customerData.name,
                    "phone": customerData.phone,
                    "email": customerData.email,
                    // "city": "Clientcity",
                    "country": "Algeria"
                },
                "invoiceNumber": order_code,
                "invoiceDate": new Date(),
                "products": products.map(product => ({
                    description: product.name + ' (warehouse ' + product.warehouse + ')',
                    quantity: product.quantity,
                    price: product.price
                })),
                "bottomNotice": "thank you for your business",
                "dueDate": new Date()
            };

            let invoiceName = order_code;
            invoice.createInvoice(data, invoiceName);

          return res.json({ success: true ,  message: 'Order added successfully' , data: { ...data, totalPrice } });

    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
module.exports = { getWareHouses, getProducts, addCostumer , getCostumers , getCategories , getProduct , addOrder };