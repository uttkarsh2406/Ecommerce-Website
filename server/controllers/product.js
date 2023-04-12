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

exports.remove = async (req, res) => {
  try {
    const deleted = await Product.findOneAndRemove({ slug: req.params.slug });
    res.json(deleted);
  } catch (err) {
    console.log(err);
    res.status(400).send("Product Delete Failed");
  }
};

exports.read = async (req, res) => {
  await Product.findOne({ slug: req.params.slug })
    .populate("category")
    .populate("subs")
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(400).send("Product Read Failed");
    });
};

exports.update = async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const updated = await Product.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (e) {
    console.log("Product Update Error", e);
    return res.status(400).json({
      err: e.message,
    });
  }
};

// exports.list = async (req, res) => {
//   try {
//     const { sort, order, limit } = req.body;
//     await Product.find({})
//       .populate("category")
//       .populate("subs")
//       .sort([[sort, order]])
//       .limit(limit)
//       .then((result) => {
//         res.json(result);
//       });
//   } catch (err) {
//     console.log(err);
//   }
// };

exports.list = async (req, res) => {
  try {
    const { sort, order, page } = req.body;
    const currentPage = page || 1;
    const perPage = 3;
    await Product.find({})
      .skip((currentPage - 1) * perPage)
      .populate("category")
      .populate("subs")
      .sort([[sort, order]])
      .limit(perPage)
      .then((result) => {
        res.json(result);
      });
  } catch (err) {
    console.log(err);
  }
};

exports.productsCount = async (req, res) => {
  await Product.find({})
    .estimatedDocumentCount()
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      console.log(error);
    });
};
