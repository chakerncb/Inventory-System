module.exports = async (req, res, next) => {

    if (req.session && req.session.user && req.session.userRole == 'warehouse') {
           next();
    } else {
        res.redirect('/login');
    }
};
