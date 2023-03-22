const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const SubSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      require: "Name is Required",
      minlength: [2, "Too Short"],
      maxlength: [30, "Too Long"],
    },
    slug: {
      type: String,
      lowercase: true,
      unique: true,
      index: true,
    },
    parent: {
      type: ObjectId,
      ref: "Category",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Sub", SubSchema);
