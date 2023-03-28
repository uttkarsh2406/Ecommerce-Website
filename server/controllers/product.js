const Product=require("./../models/product")
const slugify  = require("slugify");

exports.create=async(req,res)=>{
    try{
        req.body.slug=slugify(req.body.title);
        const newProduct=await new Product(req.body).save();
        res.json(newProduct);
    }
    catch(e){
        console.log(e);
        res.status(400).json({
            err: e.message,
        })
        // res.status(400).send("Create Product Failed");
    }
}

exports.read=async(req,res)=>{
    await Product.find({}).then((result)=>{
        res.json(result);
    })
    .catch((error)=>{
        console.log(error);
    })
}