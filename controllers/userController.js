const User = require('../models/user');

module.exports.renderSignUpForm = (req, res) => {
    res.render('users/signUp');
}
module.exports.renderSignInForm = (req, res) => {
    res.render('users/signIn');
}
module.exports.createNewUser = async (req, res, next) => {
    const { email, username, userType, password } = req.body.user;
    const user = new User({ email, username, userType });
    try {
        const registerUser = await User.register(user, password);
        req.login(registerUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash('success', 'User Registered');
            res.redirect('/relearn');
        })
    } catch (err) {
        req.flash('error', err.message);
        res.redirect('/signUp');
    }
}
module.exports.logoutUser = (req, res) => {
    req.logout();
    req.flash('success', 'You have been logout');
    res.redirect('/relearn');
}
module.exports.loginUser = (req, res) => {
    req.flash('success', 'You have logged In!');
    res.redirect('/relearn');
}