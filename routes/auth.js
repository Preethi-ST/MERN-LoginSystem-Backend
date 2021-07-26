const express = require('express');
const router = express.Router();

//import
const {register,login,forgotpassword,resetpassword} = require('../controller/auth');

router.post('/register',register);

router.post('/login',login);

router.post('/forgotpassword',forgotpassword);

router.put('/resetpassword/:resetToken',resetpassword);

module.exports = router;