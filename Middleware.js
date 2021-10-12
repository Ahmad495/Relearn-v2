const ExpressError = require('./utils/ExpressError');

module.exports.isLoggedInTeacher = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.flash('error', 'You must be logged in');
        return res.redirect('/user/signIn');
    } else if (req.user.userType !== 'teacher') {
        return res.redirect('/dashboard/studentDashboard');
    }
    next();
}