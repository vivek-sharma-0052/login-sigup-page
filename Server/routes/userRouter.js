const express = require('express');
const router = express.Router()
const {SignupUser , LoginUser} = require('../Controller/UserController')

router.route('/signup').post(SignupUser);
router.route('/login').post(LoginUser);


module.exports = router