const express = require("express");
const { registerController } = require("../controllers/authController");

const router = express.Router();

//router
//REGISTER || POST route
router.post("/register",registerController)


module.exports = router;
