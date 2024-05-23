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

module.exports = {
  createRestaurantController,
};
