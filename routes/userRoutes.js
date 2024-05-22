const express = require("express");
const { getUserControllers } = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

//route
//GET USER || GET
router.get("/getUser",authMiddleware, getUserControllers);

module.exports = router;
