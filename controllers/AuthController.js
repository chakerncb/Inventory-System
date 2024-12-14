const db = require('../config/db');

register = async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;
    let message = '';

    if (password.length < 6) {
        message = 'Password must be at least 6 characters';
        return res.render('auth/register', { message });
    }

    try {
        const [results] = await db.promise().query('SELECT email FROM admin WHERE email = ?', [email]);
        if (results.length > 0) {
            message = 'Email is already registered';
            return res.render('auth/register', { message });
        } else if (password !== confirmPassword) {
            message = 'Passwords do not match';
            return res.render('auth/register', { message });
        }
        // Add user registration logic here
    } catch (error) {
        console.log(error);
        return res.status(500).send('Server error');
    }
};

login = (req, res) => {
    res.send(req.body);
};

module.exports = {
    register,
    login
};