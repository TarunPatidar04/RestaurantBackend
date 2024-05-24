const foodModel = require("../models/foodModel");
const orderModel = require("../models/orderModel");

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
      return res.status(404).send({
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
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in create food API",
      error,
    });
  }
};

// GET ALL FOODS
const getAllFoodController = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    if (!foods) {
      return res.status(404).send({
        success: false,
        message: "Foods not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "All Foods",
      totalFoods: foods.length,
      foods,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in get All food API",
      error,
    });
  }
};

// GET SINGLE FOODS BY ID
const getSingleFoodController = async (req, res) => {
  try {
    const id = req.params.id;
    //validation
    if (!id) {
      return res.status(404).send({
        success: false,
        message: "Please Provide Id",
      });
    }
    //find food
    const food = await foodModel.findById(id);
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "Food not found with this Id",
      });
    }
    res.status(200).send({
      success: true,
      message: "Food successfully found",
      food,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Single food API",
      error,
    });
  }
};

// GET FOOD BY Restaurant
const getFoodByRestaurantController = async (req, res) => {
  try {
    const restaurantId = req.params.id;
    //validation
    if (!restaurantId) {
      return res.status(404).send({
        success: false,
        message: "Please Provide Id",
      });
    }
    //find food
    const food = await foodModel.find({
      restaurant: restaurantId,
    });
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "Food not found with this Id",
      });
    }
    res.status(200).send({
      success: true,
      message: "Food base on Restaurant",
      food,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Single food API",
      error,
    });
  }
};

// UPDATE FOOD BY ID
const updateFoodController = async (req, res) => {
  try {
    const foodId = req.params.id;
    //validation
    if (!foodId) {
      return res.status(404).send({
        success: false,
        message: "No food id was found",
      });
    }

    const food = await foodModel.findById(foodId);
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "Food not found with this Id",
      });
    }
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
    //update food
    const updatedFood = await foodModel.findByIdAndUpdate(
      foodId,
      {
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
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Food Item was Updated",
      updatedFood,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Update food API",
      error,
    });
  }
};

// DELETE FOOD BY ID
const deleteFoodController = async (req, res) => {
  try {
    const foodId = req.params.id;
    //validation
    if (!foodId) {
      return res.status(404).send({
        success: false,
        message: "No food id was found",
      });
    }

    const food = await foodModel.findById(foodId);
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "Food not found with this Id",
      });
    }
    await foodModel.findByIdAndDelete(foodId);
    res.status(200).send({
      success: true,
      message: "Food Item was Deleted",
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

//--------------------------------------------------------------------------------------------------------------------

//PLACE ORDER
//CREATE Order
const createOrderController = async (req, res) => {
  try {
    const { cart } = req.body;
    if (!cart) {
      return res.status(500).send({
        success: false,
        message: "Please foodcart and payment method",
      });
    }

    //calculate
    let total = 0;
    cart.map((i) => {
      total += i.price;
    });

    const newOrder = new orderModel({
      foods: cart,
      payment: total,
      buyer: req.body.id,
    });

    await newOrder.save();

    res.status(201).send({
      success: true,
      message: "Order Placed Successfully",
      newOrder,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Place Order API",
      error,
    });
  }
};

module.exports = {
  createFoodController,
  getAllFoodController,
  getSingleFoodController,
  getFoodByRestaurantController,
  updateFoodController,
  deleteFoodController,
  createOrderController,
};
