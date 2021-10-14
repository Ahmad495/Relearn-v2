const ExpressError = require('./utils/ExpressError');
const { addCoursesValidation } = require('./serverSideValidation');

module.exports.isLoggedInTeacher = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.flash('error', 'You must be logged in');
        return res.redirect('/user/signIn');
    } else if (req.user.userType !== 'teacher') {
        return res.redirect('/dashboard/studentDashboard');
    }
    next();
}
module.exports.validateCourse = (req, res, next) => {
    const { error } = addCoursesValidation.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(404, msg);
    } else {
        next();
    }
}