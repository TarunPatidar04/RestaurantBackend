// GET USER INFO
const userModel = require("../models/userModel");
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

module.exports = {
  getUserControllers,
  updateUserController,
};
