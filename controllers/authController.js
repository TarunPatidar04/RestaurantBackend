const userModel = require("../models/userModel");

const registerController = async (req, res) => {
  try {
    const { userName, email, password, phone, address } = req.body;

    //validation
    if (!userName || !email || !password || !phone || !address) {
      return res.status(500).send({
        success: false,
        message: "All fields are required",
      });
    }

    //check if user exists
    const existing = await userModel.findOne({ email });
    if (existing) {
      return res.status(500).send({
        success: false,
        message: "User already exists",
      });
    }

    //create new user
    const user = await userModel.create({
      userName,
      email,
      password,
      address,
      phone,
    });

    res.status(201).send({
      success: true,
      message: "User created successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in register API",
      error,
    });
  }
};

module.exports = {
    registerController,
};
