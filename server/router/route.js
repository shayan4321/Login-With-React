/** Import All Controllers */
const controller = require('../controllers/appController.js')

const router = require('express').Router();


/************ POST Methods ***********/

//Register User
router.route('/register').post(controller.register);

// Send the email
// router.route('/registerMail').post();

// authenticate user
router.route('/authenticate').post();

// login in app
router.route('/login').post(controller.login);

/************* GET Method *************/

// User with Username
router.route('/user/:username').get(controller.getUser);

// Generate random OTP
router.route('/generateOTP').get(controller.generateOTP);

// Verify generated OTP
router.route('/verifyOTP').get(controller.verifyOTP);

// Reset All The Variables
router.route('/createResetSession').get(controller.createResetSession);

/**************** PUT Method *********/

// Is Use to Update the user Profile 
router.route('/updateuser').put(controller.updateUser);

// Use to Reset Password
router.route('/resetPassword').put(controller.resetPassword);

module.exports = router