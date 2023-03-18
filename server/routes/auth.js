const express=require('express')
const router=express.Router()
const {createOrUpdateUser}=require('./../controllers/auth')
const {authCheck}=require('./../middlewears/auth')
const {currentUser}=require('./../controllers/auth')


router.post("/create-or-update-user",authCheck,createOrUpdateUser);
router.post("/current-user",authCheck,currentUser)

module.exports=router;