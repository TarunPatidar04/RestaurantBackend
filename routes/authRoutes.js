const express = require("express");
const { registerController, loginController } = require("../controllers/authController");

const router = express.Router();

//router
//REGISTER || POST route
router.post("/register",registerController)

//LOGIN || POST route
router.post("/login",loginController)



module.exports = router;
