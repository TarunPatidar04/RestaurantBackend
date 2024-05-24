const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Category title is required"],
    },
    imageUrl: {
      type: String,
      default:
        "https://cdn.sanity.io/images/kts928pd/production/b374a124fc505ab3255fadae257d90e8e4a4855e-449x432.png",
    },
  },
  {
    timestamps: true, 
  }
);

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
