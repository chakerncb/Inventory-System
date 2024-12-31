module.exports = async (req, res, next) => {

    if (req.session && req.session.user && req.session.userRole == 'seller') {
           next();
    } else {
        res.redirect('/login');
    }
};
