const Product = require("./../models/product");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    req.body.slug = slugify(req.body.title);
    const newProduct = await new Product(req.body).save();
    res.json(newProduct);
  } catch (e) {
    console.log(e);
    res.status(400).json({
      err: e.message,
    });
    // res.status(400).send("Create Product Failed");
  }
};

exports.listAll = async (req, res) => {
  await Product.find({})
    .limit(parseInt(req.params.count))
    .populate("category")
    .populate("subs")
    .sort([["createdAt", "desc"]])
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      console.log(error);
    });
};


exports.remove=async(req,res)=>{
  try{
    const deleted=await Product.findOneAndRemove({slug:req.params.slug})
    res.json(deleted);
  }catch(err){
    console.log(err);
    res.status(400).send("Product Delete Failed")
  }
}
