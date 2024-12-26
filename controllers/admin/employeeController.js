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

    console.log(req.body);

    try {
        const [results] = await db.promise().query('INSERT INTO employees (fname, email, phone, password, role) VALUES (?,?,?,?,?)', [fname, email, phone, passwordHash, role]);
        return res.json({ success: true });

    } catch (error) {
        console.log(error);
        return res.status(500).send('Server error');
    }

}

getEmployees = async (req, res) => {

    try {
        const [results] = await db.promise().query('SELECT * FROM employees');
        const role = await db.promise().query('SELECT * FROM roles WHERE id = ?',[results[0].role]);
        // console.log(role);
        const employee = [];
        results.forEach(result => {
            employee.push({
                id: result.id_e,
                fname: result.Fname,
                email: result.email,
                phone: result.phone,
                role: role[0][0].role
            });
        });
        return res.json(employee);

    } catch (error) {
        console.log(error);
        return res.status(500).send('Server error');
    }
}

module.exports = { getRoles , newEmployee , getEmployees };