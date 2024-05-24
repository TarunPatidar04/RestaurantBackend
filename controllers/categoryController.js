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

//GET ALL  CATEGORY
const getAllCategoryController = async (req, res) => {
  try {
    const categories = await categoryModel.find();
    if (!categories) {
      return res.status(500).send({
        success: false,
        message: "No Category Found",
      });
    }
    res.status(200).send({
      success: true,
      totalCategory: categories.length,
      message: "Category Data Fetched",
      categories,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get All Category API",
      error,
    });
  }
};

//UPDATE  CATEGORY
const updateCategoryController = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, imageUrl } = req.body;
    const updatedCategory = await categoryModel.findByIdAndUpdate(
      id,
      { title, imageUrl },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(500).send({
        success: false,
        message: "No Category Found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Category Updated Successfully",
      updatedCategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Update Category API",
      error,
    });
  }
};

//DELETE  CATEGORY
const deleteCategoryController = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(500).send({
        success: false,
        message: "Please provide category Id",
      });
    }
    const category = await categoryModel.findById(id);
    if (!category) {
      return res.status(500).send({
        success: false,
        message: "No Category Found with this id ",
      });
    }

    await categoryModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Category Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Delete Category API",
      error,
    });
  }
};

module.exports = {
  createCategoryController,
  getAllCategoryController,
  updateCategoryController,
  deleteCategoryController,
};
