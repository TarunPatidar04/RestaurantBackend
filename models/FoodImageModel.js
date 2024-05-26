const mongoose = require("mongoose");

const foodImgSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Food title is required"],
    },
    imageUrl: {
      type: String,
      required: [true, "Food Image is required"],
    },
  },

  {
    timestamps: true,
  }
);

const FoodImage = mongoose.model("FoodImage", foodImgSchema);

module.exports = FoodImage;
