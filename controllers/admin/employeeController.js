const db = require('../../config/db');
const bcrypt = require('bcryptjs');


getRoles = async (req, res) => {

    try {
        const [results] = await db.promise().query('SELECT * FROM roles');
        return res.json(results);

    } catch (error) {
        console.log(error);
        return res.status(500).send('Server error');
    }
}


newEmployee = async (req, res) => {

    const { fname, email, phone, password, role } = req.body;
    const passwordHash = bcrypt.hashSync(password, 10);

    if(!fname || !email || !phone || !role) {
        message = 'Please provide an email and password';
        return res.message({ message });
    }

    if (password.length < 6) {
        message = 'Password must be at least 6 characters';
        return res.json({ message });
    }

    if (phone.length < 10) {
        message = 'Phone number must be 10 characters';
        return res.json({ message });
    }

    const [phoneExists] = await db.promise().query('SELECT * FROM employees WHERE phone = ?', [phone]);
    if (phoneExists.length > 0) {
        message = 'Phone number already exists';
        return res.json({ message });
    }
    
    try {
        const [results] = await db.promise().query('INSERT INTO employees (fname, email, phone, password, role) VALUES (?,?,?,?,?)', [fname, email, phone, passwordHash, role]);
        message = 'Employee added successfully';
        return res.json({ success: true , message });

    } catch (error) {
        // console.log(error);
        // return res.status(500).send('Server error');;
        if (error.code === 'ER_DUP_ENTRY') {
            message = 'Email already exists';
            return res.json({ message });
        }

        if (error.code === 'ER_NO_REFERENCED_ROW_2') {
            message = 'Role does not exist';
            return res.json({ message });
        }

        return res.status(500).send('Server error');

    }

}


getEmployees = async (req, res) => {

    try {
        const [results] = await db.promise().query('SELECT * FROM employees');
        const employee = [];
        for (const result of results) {
            const [role] = await db.promise().query('SELECT * FROM roles WHERE id = ?', [result.role]);
            employee.push({
            id: result.id_e,
            fname: result.Fname,
            email: result.email,
            phone: result.phone,
            role: role[0].role
            });
        }
        return res.json(employee);

    } catch (error) {
        console.log(error);
        return res.status(500).send('Server error');
    }
}

module.exports = { getRoles , newEmployee , getEmployees };