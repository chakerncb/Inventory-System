const db = require('../../config/db');
const bcrypt = require('bcryptjs');


newSupplier = async (req, res) => {

    const { name, email, phone, description } = req.body;

    if(!name || !email || !phone || !description) {
        message = 'Please provide an email and password';
        return res.message({ message });
    }

    if (phone.length < 10) {
        message = 'Phone number must be 10 characters';
        return res.json({ message });
    }

    const [phoneExists] = await db.promise().query('SELECT * FROM suppliers WHERE phone = ?', [phone]);
    if (phoneExists.length > 0) {
        message = 'Phone number already exists';
        return res.json({ message });
    }
    
    try {
        const [results] = await db.promise().query('INSERT INTO suppliers (name, email, phone, description) VALUES (?,?,?,?)', [name, email, phone, description]);
        message = 'Supplier added successfully';
        return res.json({ success: true , message });

    } catch (error) {
        // console.log(error);
        // return res.status(500).send('Server error');
        if (error.code === 'ER_DUP_ENTRY') {
            message = 'Email already exists';
            return res.json({ message });
        }

        return res.status(500).send(error);

    }

}


getSuppliers = async (req, res) => {

    try {
        const [results] = await db.promise().query('SELECT * FROM suppliers');
        const suppliers = [];
        for (const result of results) {
            suppliers.push({
            name: result.name,
            email: result.email,
            phone: result.phone,
            description: result.description
            });
        }
        return res.json(suppliers);

    } catch (error) {
        console.log(error);
        return res.status(500).send('Server error');
    }
}

module.exports = { newSupplier , getSuppliers };