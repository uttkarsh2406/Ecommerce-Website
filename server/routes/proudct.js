const express=require("express");
const router=express.Router();

const {authCheck,adminCheck}=require("./../middlewears/auth");

const {create}=require("./../controllers/product");

router.post("/product",authCheck,adminCheck,create);




module.exports=router;