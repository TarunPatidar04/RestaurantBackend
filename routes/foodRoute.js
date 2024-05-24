const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { createFoodController } = require("../controllers/foodController");

const router = express.Router();

//route
//CREATE FOOD
router.post("/create",authMiddleware, createFoodController);
module.exports = router;
