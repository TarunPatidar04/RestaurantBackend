const express = require("express");
const { getUserControllers, updateUserController, resetPasswordController, updatePasswordController } = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

//route
//GET USER || GET
router.get("/getUser",authMiddleware, getUserControllers);

//UPDATE PROFILE
router.put("/updateUser",authMiddleware, updateUserController);

//RESET PASSWORD
router.post("/resetPassword",authMiddleware, resetPasswordController);

//UPDATE PASSWORD
router.post("/updatePassword",authMiddleware, updatePasswordController);





module.exports = router;
