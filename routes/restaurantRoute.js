const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { createRestaurantController } = require("../controllers/restaurantController");

const router = express.Router();

//route
// CREATE RESTAURANT || POST

router.post("/create", authMiddleware, createRestaurantController);


module.exports = router;
