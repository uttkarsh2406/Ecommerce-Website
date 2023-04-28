const Product = require("./../models/product");
const User = require("./../models/user");
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

exports.productStar = async (req, res) => {
  const product = await Product.findById(req.params.productId);
  const user = await User.findOne({ email: req.user.email });

  const { star } = req.body;

  let existingRatingObject = product.ratings.find(
    (ele) => ele.postedBy.toString() === user._id.toString()
  );

  if (existingRatingObject === undefined) {
    const ratingAdded = await Product.findByIdAndUpdate(
      product._id,
      {
        $push: { ratings: { star: star, postedBy: user._id } },
      },
      { new: true }
    );
    res.json(ratingAdded);
  } else {
    const ratingUpdated = await Product.updateOne(
      { ratings: { $elemMatch: existingRatingObject } },
      { $set: { "ratings.$.star": star } },
      { new: true }
    );
    res.json(ratingUpdated);
  }
};

exports.listRelated = async (req, res) => {
  // console.log(req.params.productId);
  const product = await Product.findById(req.params.productId);
  // console.log(product);
  const realated = await Product.find({
    _id: { $ne: product._id },
    category: product.category,
  })
    .limit(4)
    .populate("category")
    .populate("subs")
    .populate({
      path: "ratings",
      populate: {
        path: "postedBy",
        model: "User",
      },
    });
  res.json(realated);
};

const handleQuery = async (req, res, query) => {
  const products = await Product.find({ $text: { $search: `${query}` } })
    .populate("category", "_id name")
    .populate("subs", "_id name")
    .populate({
      path: "ratings",
      populate: {
        path: "postedBy",
        model: "User",
      },
    });

  // console.log(products);
  res.json(products);
};

const handlePrice = async (req, res, price) => {
  try {
    let products = await Product.find({
      price: {
        $gte: price[0],
        $lte: price[1],
      },
    })
      .populate("category", "_id name")
      .populate("subs", "_id name")
      .populate({
        path: "ratings",
        populate: {
          path: "postedBy",
          model: "User",
        },
      });

    res.json(products);
  } catch (e) {
    console.log(e);
  }
};
const handleCategory = async (req, res, category) => {
  try {
    let products = await Product.find({ category: category })
      .populate("category", "_id name")
      .populate("subs", "_id name")
      .populate({
        path: "ratings",
        populate: {
          path: "postedBy",
          model: "User",
        },
      });
    res.json(products);
  } catch (e) {
    console.log(e);
  }
};

const handleStar = async (req, res, stars) => {
  await Product.aggregate([
    {
      $project: {
        document: "$$ROOT",
        // title: "$title"
        floorAverage: {
          $floor: { $avg: "$ratings.star" },
        },
      },
    },
    { $match: { floorAverage: stars } },
  ]).then(async (result) => {
    await Product.find({ _id: result })
      .populate("category", "_id name")
      .populate("subs", "_id name")
      .populate({
        path: "ratings",
        populate: {
          path: "postedBy",
          model: "User",
        },
      })
      .then((pro) => {
        res.json(pro);
      });
  });
};
const handleSub = async (req, res, sub) => {
  await Product.find({
    subs: sub,
  })
    .populate("category", "_id name")
    .populate("subs", "_id name")
    .populate({
      path: "ratings",
      populate: {
        path: "postedBy",
        model: "User",
      },
    })
    .then((result) => {
      res.json(result);
    });
};

const handleColor = async (req, res, color) => {
  await Product.find({ color: color })
    .populate("category", "_id name")
    .populate("subs", "_id name")
    .populate({
      path: "ratings",
      populate: {
        path: "postedBy",
        model: "User",
      },
    }).then((result)=>{
      res.json(result);
    });
};
const handleBrand = async (req, res, brand) => {
  await Product.find({ brand: brand })
    .populate("category", "_id name")
    .populate("subs", "_id name")
    .populate({
      path: "ratings",
      populate: {
        path: "postedBy",
        model: "User",
      },
    }).then((result)=>{
      res.json(result);
    });
};
const handleShipping = async (req, res, shipping) => {
  await Product.find({ shipping })
    .populate("category", "_id name")
    .populate("subs", "_id name")
    .populate({
      path: "ratings",
      populate: {
        path: "postedBy",
        model: "User",
      },
    }).then((result)=>{
      res.json(result);
    });
};

exports.searchFilters = async (req, res) => {
  const { query, price, category, stars, sub, brand, color, shipping } =
    req.body;

  if (query) {
    await handleQuery(req, res, query);
  }
  if (price) {
    await handlePrice(req, res, price);
  }
  if (category) {
    await handleCategory(req, res, category);
  }
  if (stars) {
    await handleStar(req, res, stars);
  }
  if (sub) {
    await handleSub(req, res, sub);
  }
  if (shipping) {
    await handleShipping(req, res, shipping);
  }
  if (brand) {
    await handleBrand(req, res, brand);
  }
  if (color) {
    await handleColor(req, res, color);
  }
};
