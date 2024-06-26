const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  createFoodController,
  getAllFoodController,
  getSingleFoodController,
  getFoodByRestaurantController,
  updateFoodController,
  deleteFoodController,
  createOrderController,
  orderStatusController,
} = require("../controllers/foodController");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();

//route
//CREATE FOOD
router.post("/create", authMiddleware, createFoodController);

//get ALL FOOD
router.get("/getAll", getAllFoodController);

//get SINGLE FOOD
router.get("/get/:id", getSingleFoodController);

//get food by Restorant
router.get("/getbyRestaurant/:id", getFoodByRestaurantController);

//UPDATE FOOD
router.put("/update/:id", authMiddleware, updateFoodController);

//DELETE FOOD
router.delete("/delete/:id", authMiddleware, deleteFoodController);

//PLACE ORDER
router.post("/placeorder", authMiddleware, createOrderController);

//ORDER STATUS
router.post(
  "/orderstatus/:id",
  authMiddleware,
  adminMiddleware,
  orderStatusController
);

module.exports = router;
