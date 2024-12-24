const db = require('../config/db');
const bcrypt = require('bcryptjs');
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

     let sql = 'SELECT * FROM admin WHERE email = ?';
    db.query(sql, [email], async (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Server error');
        }

        if (results.length < 1 || !(await bcrypt.compare(password, results[0].password))) {
            message = 'Email or Password is incorrect';
            return res.render('admin/auth/login', { message });
        }

        const id = results[0].id;
        const token = jwt.sign({ id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN
        });

        console.log('The token is: ' + token);

        const cookieOptions = {
            expires: new Date(
                Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
            ),
            httpOnly: true
        };

        res.cookie('jwt', token, cookieOptions);
        res.status(200).redirect('/admin');
    }
    );


    
};

module.exports = {
    register,
    login
};