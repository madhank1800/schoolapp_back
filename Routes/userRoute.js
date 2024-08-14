
const express = require('express');
const router = express.Router();
const { register,login ,updatePassword} = require('../Controllers/userController');
const {authHandler, isTeacher}=require('../Middlewares/userErrorHandler/authHandler')
router.post('/register', register);
router.post("/login", login);
router.put('/updatePassword',authHandler,isTeacher, updatePassword);

module.exports = router;