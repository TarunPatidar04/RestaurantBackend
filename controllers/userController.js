// GET USER INFO
const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const getUserControllers = async (req, res) => {
  try {
    const user = await userModel.findById({ _id: req.body.id });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    //Hide Password
    user.password = undefined;
    res.status(200).send({
      success: true,
      message: "User Data get Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get user API",
      error,
    });
  }
};

const updateUserController = async (req, res) => {
  try {
    //find user
    const user = await userModel.findOneAndUpdate({ _id: req.body.id });
    //validation error
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    //update user
    const { userName, address, phone } = req.body;

    if (userName) user.userName = userName;
    if (address) user.address = address;
    if (phone) user.phone = phone;

    //save user
    await user.save();

    res.status(200).send({
      success: true,
      message: "User Data updated Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in update user API",
      error,
    });
  }
};

//RESET PASSWORD
const resetPasswordController = async (req, res) => {
  try {
    const { email, newPassword, answer } = req.body;
    if (!email || !newPassword || !answer) {
      return res.status(500).send({
        success: false,
        message: "Please Provide all field",
        error,
      });
    }

    const user = await userModel.findOne({ email, answer });
    if (!user) {
      return res.status(500).send({
        success: false,
        message: "User not found and Invalid answer",
      });
    }

    //hashing password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();
    res.status(200).send({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Reset password  API",
      error,
    });
  }
};

//UPDATE PASSWORD
const updatePasswordController = async (req, res) => {
  try {
    //find user
    const user = await userModel.findOne({ _id: req.body.id });
    if (!user) {
      return res.status(500).send({
        success: false,
        message: "User not found ",
      });
    }

    //get data from user
    const { oldPassword, newPassword } = req.body;
    //validation
    if (!oldPassword || !newPassword) {
      return res.status(500).send({
        success: false,
        message: "Please Provide all field",
        error,
      });
    }
    //compare password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(500).send({
        success: false,
        message: "Invalid Old Password",
      });
    }

    //hashing password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;

    await user.save();
    res.status(200).send({
      success: true,
      message: "Password Updated Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Update password  API",
      error,
    });
  }
};

//DELETE USER ACCOUNT
const deleteUserController = async (req, res) => {
  try {
    //find user
    const id = req.params.id;
  
    await userModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "User Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Delete User API",
      error,
    });
  }
};

module.exports = {
  getUserControllers,
  updateUserController,
  resetPasswordController,
  updatePasswordController,
  deleteUserController,
};
