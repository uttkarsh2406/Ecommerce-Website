const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      require: "Name is Required",
      minlength: [3, "Too Short"],
      maxlength: [30, "Too Long"],
    },
    slug: {
      type: String,
      lowercase: true,
      unique: true,
      indexe: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
