const express=require('express')
const router=express.Router()
const {user}=require("./../controllers/user")
const {authCheck}=require("./../middlewears/auth")
const {userCart}=require("./../controllers/user")

router.post('/cart',authCheck,userCart)

router.get("/user",user)

module.exports=router;