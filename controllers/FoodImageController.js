const FoodImageModel = require("../models/FoodImageModel");

//CREATE Food
const createFoodImageController = async (req, res) => {
  try {
    const { title, imageUrl } = req.body;
    //validation
    if (!title || !imageUrl) {
      return res.status(404).send({
        success: false,
        message: "Please Provide all fields",
      });
    }

    //create food Image
    const newFood = new FoodImageModel({
      title,
      imageUrl,
    });
    await newFood.save();
    res.status(201).send({
      success: true,
      message: "New Food Image Created Successfully",
      newFood,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in create food Image API",
      error,
    });
  }
};

// GET ALL FOODS
const getAllFoodImageController = async (req, res) => {
  try {
    const foodImage = await FoodImageModel.find({});
    if (!foodImage) {
      return res.status(404).send({
        success: false,
        message: "Foods image not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "All Foods Images",
      totalFoods: foodImage.length,
      foodImage,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in get All food image API",
      error,
    });
  }
};

// DELETE FOOD BY ID
const deleteFoodImageController = async (req, res) => {
  try {
    const foodImageId = req.params.id;
    //validation
    if (!foodImageId) {
      return res.status(404).send({
        success: false,
        message: "No food Image id was found",
      });
    }

    const foodImage = await FoodImageModel.findById(foodImageId);
    if (!foodImage) {
      return res.status(404).send({
        success: false,
        message: "Food Image not found with this Id",
      });
    }
    await FoodImageModel.findByIdAndDelete(foodImageId);
    res.status(200).send({
      success: true,
      message: "Food Image Item was Deleted",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Delete food API",
      error,
    });
  }
};

module.exports = {
  getAllFoodImageController,
  createFoodImageController,
  deleteFoodImageController,
};
