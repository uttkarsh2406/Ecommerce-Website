const Category = require("./../models/category");
const slugify = require("slugify");
exports.create = async (req, res) => {
  const { name } = req.body;
  try {
    const category = await new Category({ name, slug: slugify(name) }).save();
    res.json(category);
  } catch (e) {
    res.status(400).send("Create Category Failed");
  }
};
exports.list = async (req, res) => {
  await Category.find({}).sort({createdAt:-1}).then((result)=>{
    res.json(result);
  }).catch((err)=>{
    console.log(err);
  })
};
exports.read = async (req, res) => {
  await Category.findOne({slug:req.params.slug}).then((result)=>{
    res.json(result);
  }).catch((err)=>{
    console.log(err);
  })
};
exports.update = async (req, res) => {
  const {name}=req.body;
  
  try{
    await Category.findOneAndUpdate({slug:req.params.slug},{name:name,slug:slugify(name),new:true}).then((result)=>{
      res.json(result);
    })
  }catch(err){
    res.status(400).send("Category Update Failed")
  }
};
exports.remove = async (req, res) => {
  try{
    await Category.findOneAndDelete({slug:req.params.slug}).then((result)=>{
      res.json(result)
    })
  
  }catch(err){
    res.send(400).send("Category Delete Failed")
  }

};
