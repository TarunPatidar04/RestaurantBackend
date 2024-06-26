const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { createRestaurantController, getAllRestaurantController, getRestaurantByIdController, deleteRestaurantController } = require("../controllers/restaurantController");

const router = express.Router();

//route
// CREATE RESTAURANT || POST
router.post("/create", authMiddleware, createRestaurantController);


//GET ALL RESAURANT || GET
router.get("/getAll", getAllRestaurantController);



//GET Single RESAURANT BY ID
router.get("/get/:id", getRestaurantByIdController);



//DELETE  RESAURANT || DELETE
router.delete("/delete/:id",authMiddleware, deleteRestaurantController);


module.exports = router;
