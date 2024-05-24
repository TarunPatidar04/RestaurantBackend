const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { createCategoryController } = require("../controllers/categoryController");

const router = express.Router();


//route 
//CREATE CATEGORY
router.post("/create",authMiddleware,createCategoryController)

module.exports = router;
