const Sub = require("./../models/sub");
const slugify = require("slugify");

exports.create = async (req, res) => {
  const { name } = req.body;
  const {parent} =req.body;
  try {
    const sub = await new Sub({ name,parent, slug: slugify(name) }).save();
    res.json(sub);
  } catch (e) {
    res.status(400).send("Create Sub Failed");
  }
};
exports.list = async (req, res) => {
  await Sub.find({})
    .sort({ createdAt: -1 })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.read = async (req, res) => {
  await Sub.findOne({ slug: req.params.slug })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.update = async (req, res) => {
  const { parent, name } = req.body;

  try {
    await Sub.findOneAndUpdate(
      { slug: req.params.slug },
      { name: name,parent, slug: slugify(name), new: true }
    ).then((result) => {
      res.json(result);
    });
  } catch (err) {
    res.status(400).send("Sub Update Failed");
  }
};
exports.remove = async (req, res) => {
  try {
    await Sub.findOneAndDelete({ slug: req.params.slug }).then((result) => {
      res.json(result);
    });
  } catch (err) {
    res.send(400).send("Sub Delete Failed");
  }
};
