const express= require('express');
const authController=require("../controllers/auth")
const router =express.Router();

router.post('/register', authController.register)
router.post('/index',authController.index)
router.post('/home',authController.index)
router.post('/block',authController.block)


module.exports=router;