module.exports = async (req, res, next) => {

    if (req.session && req.session.user && req.session.userRole == 'warehouse' || req.session.admin) {
           next();
    } else {
        res.redirect('/login');
    }
};
