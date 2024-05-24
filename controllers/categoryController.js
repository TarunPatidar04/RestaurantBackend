const categoryModel = require("../models/categoryModel");
//CREATE  CATEGORY
const createCategoryController = async (req, res) => {
  try {
    const { title, imageUrl } = req.body;

    //Validation
    if (!title) {
      return res.status(500).send({
        success: false,
        message: "Please Provide category title and image",
      });
    }
    const newCategory = new categoryModel({
      title,
      imageUrl,
    });
    await newCategory.save();
    res.status(200).send({
      success: true,
      message: "Category Created",
      newCategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in create Category API",
      error,
    });
  }
};

module.exports = {
  createCategoryController,
};
