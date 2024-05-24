const restaurantModel = require("../models/restaurantModel");
//CREATE  RESTAURANT
const createRestaurantController = async (req, res) => {
  try {
    const {
      title,
      imageUrl,
      food,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    } = req.body;

    //Validation
    if (!title || !coords) {
      return res.status(500).send({
        success: false,
        message: "Please Provide title and address",
      });
    }

    const newRestaurant = new restaurantModel({
      title,
      imageUrl,
      food,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    });
    await newRestaurant.save();
    res.status(201).send({
      success: true,
      message: "Restaurant Created Successfully",
      newRestaurant,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in create Restaurant API",
      error,
    });
  }
};

//GET ALL RETAURANT
const getAllRestaurantController = async (req, res) => {
  try {
    const restaurants = await restaurantModel.find();
    if (!restaurants) {
      return res.status(404).send({
        success: false,
        message: "No Restaurant Found",
      });
    }
    res.status(200).send({
      success: true,
      totalCount: restaurants.length,
      message: "All Restaurant Data",
      restaurants,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in GET All Restaurant API",
      error,
    });
  }
};

//GET ALL RETAURANT
const getRestaurantByIdController = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(500).send({
        success: false,
        message: "Please Provide Restaurant id",
      });
    }
    const restaurant = await restaurantModel.findById(id);
    if (!restaurant) {
      return res.status(404).send({
        success: false,
        message: "No Restaurant Found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Restaurant Data",
      restaurant,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in GET  Restaurant by Id API",
      error,
    });
  }
};

module.exports = {
  createRestaurantController,
  getAllRestaurantController,
  getRestaurantByIdController,
};
