const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  createFoodController,
  getAllFoodController,
  getSingleFoodController,
  getFoodByRestaurantController,
} = require("../controllers/foodController");

const router = express.Router();

//route
//CREATE FOOD
router.post("/create", authMiddleware, createFoodController);

//get ALL FOOD
router.get("/getAll", getAllFoodController);

//get SINGLE FOOD
router.get("/get/:id", getSingleFoodController);

//get food by Gestorant
router.get("/getbyRestaurant/:id", getFoodByRestaurantController);

module.exports = router;
