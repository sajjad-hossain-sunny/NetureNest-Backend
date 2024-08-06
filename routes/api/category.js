const express = require("express");
const _ = express.Router();
const {
  createCategoryController,
  categoryStatusController,
  createSubCategoryController,
  subCategoryStatusController,
  getAllCategoriesController,
  getAllSubCategoriesController
} = require("../../controllers/categoryControllers");

_.post("/create-category", createCategoryController);
_.post("/category-status", categoryStatusController);
_.post("/create-subcategory", createSubCategoryController);
_.post("/subcategory-status", subCategoryStatusController);
_.get("/all-categories", getAllCategoriesController);
_.get("/all-subcategories", getAllSubCategoriesController);

module.exports = _;
