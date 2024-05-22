const express = require("express");
const { getUserControllers, updateUserController } = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

//route
//GET USER || GET
router.get("/getUser",authMiddleware, getUserControllers);

//UPDATE PROFILE
router.put("/updateUser",authMiddleware, updateUserController);


module.exports = router;
