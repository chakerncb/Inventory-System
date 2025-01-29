const db = require('../../config/db');
const bcrypt = require('bcryptjs');
const e = require('express');
const jwt = require('jsonwebtoken');

register = async (req, res) => {
    const { name, email, phone , password, confirmPassword } = req.body;
    let errorMessage = '';

    if (password.length < 6) {
        errorMessage = 'Password must be at least 6 characters';
        return res.render('auth/register', { errorMessage });
    }

    try {
        const [results] = await db.promise().query('SELECT email FROM admin WHERE email = ?', [email]);
        if (results.length > 0) {
            errorMessage = 'Email is already registered';
            return res.render('auth/register', { errorMessage });
        } else if (password !== confirmPassword) {
            errorMessage = 'Passwords do not match';
            return res.render('auth/register', { errorMessage });
        }

        // return res.send(req.body);
        // Add user registration logic here

        let hashedPassword = await bcrypt.hash(password, 8);
        await db.promise().query('INSERT INTO admin SET ?', { name, email, phone , password: hashedPassword });
        errorMessage = 'User registered successfully';
        return res.render('auth/register', { errorMessage });

    } catch (error) {
        console.log(error);
        return res.status(500).send('Server error');
    }
};

login = (req, res) => {
    const { email, password } = req.body;
    let errorMessage = '';

    if (!email || !password) {
        errorMessage = 'Please provide an email and password';
        return res.render('admin/auth/login', { errorMessage });
    }

     let query = 'SELECT * FROM admin WHERE email = ?';

     db.query(query, [email], async (error, results) => {
        if (error || results.length === 0) {
            errorMessage = 'Email or Password is incorrect';
            return res.render('admin/auth/login', { errorMessage });
        }

        for (let count=0; count < results.length; count++) {

            if (results[count].email === email && await bcrypt.compare(password, results[count].password)) {
                const admin = results[count];
                req.session.admin = admin;
                res.redirect('/admin');
        }
        else {
            errorMessage = 'Email or Password is incorrect';
            return res.render('admin/auth/login', { errorMessage });
        }
    }
});
};

module.exports = {
    register,
    login
};