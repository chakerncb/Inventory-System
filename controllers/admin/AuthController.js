const db = require('../../config/db');
const bcrypt = require('bcryptjs');
const e = require('express');
const jwt = require('jsonwebtoken');

register = async (req, res) => {
    const { name, email, phone , password, confirmPassword } = req.body;
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

        // return res.send(req.body);
        // Add user registration logic here

        let hashedPassword = await bcrypt.hash(password, 8);
        await db.promise().query('INSERT INTO admin SET ?', { name, email, phone , password: hashedPassword });
        message = 'User registered successfully';
        return res.render('auth/register', { message });

    } catch (error) {
        console.log(error);
        return res.status(500).send('Server error');
    }
};

login = (req, res) => {
    const { email, password } = req.body;
    let message = '';

    if (!email || !password) {
        message = 'Please provide an email and password';
        return res.render('admin/auth/login', { message });
    }

     let query = 'SELECT * FROM admin WHERE email = ?';

     db.query(query, [email], async (error, results) => {
        if (error || results.length === 0) {
            message = 'Email or Password is incorrect';
            return res.render('admin/auth/login', { message });
        }

        for (let count=0; count < results.length; count++) {

            if (results[count].email === email && await bcrypt.compare(password, results[count].password)) {
                const user = results[count];
                req.session.user = user;
                res.redirect('/admin');
        }
        else {
            message = 'Email or Password is incorrect';
            return res.render('admin/auth/login', { message });
        }
    }
});
};

module.exports = {
    register,
    login
};