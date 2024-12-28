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
            id: result.id_s,
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

deleteSupplier = async (req , res) => {
    const { id } = req.body;

    if(!id) {
        message = 'Please provide an id';
        return res.json({ message });
    }

    try {
        const [results] = await db.promise().query('DELETE FROM suppliers WHERE id_s = ?', [id]);
        message = 'Supplier deleted successfully';
        return res.json({ success: true , message });

    } catch (error) {
        console.log(error);
        return res.status(500).send('Server error');
    }
}


editSupplier = async (req , res) => {
    const { id } = req.body;

    if(!id) {
        message = 'Please provide an id';
        return res.json({ message });
    }

    try {
        const [results] = await db.promise().query('SELECT * FROM suppliers WHERE id_s = ?', [id]);
        if (results.length === 0) {
            message = 'Supplier not found';
            return res.json({ message });
        }

        const supplier = {
            id: results[0].id_s,
            name: results[0].name,
            email: results[0].email,
            phone: results[0].phone,
            description: results[0].description
        }
        return res.json( {success: true ,supplier});

    } catch (error) {
        console.log(error);
        return res.status(500).send('Server error');
    }
}


updateSupplier = async (req , res) => {
    const { id , name, email, phone, description } = req.body;

    if(!id) {
        message = 'Please provide an id';
        return res.json({ message });
    }

    if(!name || !email || !phone || !description) {
        message = 'Please provide all fields';
        return res.json({ message });
    }

    if (phone.length < 10) {
        message = 'Phone number must be 10 characters';
        return res.json({ message });
    }

    const [phoneExists] = await db.promise().query('SELECT * FROM suppliers WHERE phone = ? AND id_s != ?', [phone, id]);
    if (phoneExists.length > 0) {
        message = 'Phone number already exists';
        return res.json({ message });
    }

    const [emailExists] = await db.promise().query('SELECT * FROM suppliers WHERE email = ? AND id_s != ?', [email, id]);
    if (emailExists.length > 0) {
        message = 'Email already exists';
        return res.json({ message });
    }

    try {
        const [results] = await db.promise().query('UPDATE suppliers SET name = ?, email = ?, phone = ?, description = ? WHERE id_s = ?', [name, email, phone, description, id]);
        message = 'Supplier updated successfully';
        return res.json({ success: true , message });

    } catch (error) {
        console.log(error);
        return res.status(500).send('Server error');


    }
}

module.exports = { newSupplier , getSuppliers , deleteSupplier , editSupplier , updateSupplier };