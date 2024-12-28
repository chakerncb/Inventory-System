module.exports = async (req, res, next) => {

    var userRole;
    const role = await db.promise().query('SELECT * FROM roles WHERE id = ?', [req.session.user.role]);
    userRole = role[0][0].name;


    if (req.session && req.session.user) {
        if (userRole == 'seller') {
            return res.redirect('/pos');
        } else if (userRole == 'warehouse') {
            return res.redirect('/warehouse');
        }
    } else {
        res.redirect('/employee/login');
    }
};
