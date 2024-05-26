const express = require("express");
const {
  createFoodImageController,
  getAllFoodImageController,
  deleteFoodImageController,
} = require("../controllers/FoodImageController");

const router = express.Router();

//route
//CREATE CATEGORY
router.post("/create", createFoodImageController);

//GET ALL CATEGORY
router.get("/getAll", getAllFoodImageController);

//DELETE CATEGORY
router.delete("/delete/:id", deleteFoodImageController);

module.exports = router;
