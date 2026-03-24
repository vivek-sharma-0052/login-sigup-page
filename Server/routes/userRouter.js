const express = require('express');
const router = express.Router()
const {SignupUser , LoginUser, getProfile , updateProfile,forgotPassword , resetPassword } = require('../Controller/UserController');
const auth = require('../middleware/auth')

router.route('/signup').post(SignupUser);
router.route('/login').post(LoginUser);
router.get('/profile',auth,getProfile)
router.put('/profile', auth, updateProfile);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

module.exports = router