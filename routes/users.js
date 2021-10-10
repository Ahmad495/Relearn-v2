const express = require('express');
const router = express.Router();

const User = require('../models/user');

const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');

const passport = require('passport');
const { userRegisterValidation } = require('../serverSideValidation');
const userController = require('../controllers/userController');

const validationUser = (req, res, next) => {
    const { error } = userRegisterValidation.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(404, msg);
    } else {
        next();
    }
}

router.get('/signUp', userController.renderSignUpForm);
router.get('/signIn', userController.renderSignInForm);
router.post('/signUp', validationUser, catchAsync(userController.createNewUser));
router.get('/logout', userController.logoutUser);
router.post('/signIn', passport.authenticate('local', { failureFlash: true, failureRedirect: '/user/signIn' }), userController.loginUser);

module.exports = router;