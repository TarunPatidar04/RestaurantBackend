const foodModel = require("../models/foodModel");
//CREATE Food
const createFoodController = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      imageUrl,
      foodTags,
      category,
      code,
      isAvailable,
      restaurant,
      rating,
    } = req.body;
    //validation
    if (!title || !description || !price || !restaurant) {
      return res.status(500).send({
        success: false,
        message: "Please Provide all fields",
      });
    }

    //create food
    const newFood = new foodModel({
      title,
      description,
      price,
      imageUrl,
      foodTags,
      category,
      code,
      isAvailable,
      restaurant,
      rating,
    });
    await newFood.save();
    res.status(201).send({
      success: true,
      message: "New Food Created Successfully",
      newFood,
    });
  } catch {
    return res.status(500).send({
      success: false,
      message: "Error in create food API",
      error,
    });
  }
};

module.exports = {
  createFoodController,
};
