const User=require("./../models/user")
const Product=require("./../models/product")
const Cart=require("./../models/cart")

exports.userCart=async(req,res)=>{
    const {cart}=req.body;

    let product=[]
    const user=await User.findOne({email:req.user.email});

    let cartExistByThisUser=await Cart.findOne({orderedBy:user._id})

    if(cartExistByThisUser){
        cartExistByThisUser.remove()
    }
    for(let i=0;i<cart.length;i++){
        let object={}
        object.product=cart[i]._id
    }
}

exports.user=(req,res)=>{
    res.json({
        data:"hey you hit user API endpoint",
    })
}


