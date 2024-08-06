const Category = require("../models/categoryModel");
const SubCategory = require("../models/subCategoryModel");

const createCategoryController = async (req, res) => {
  const { name, description } = req.body;

  const duplicateCategory = await Category.find({ name });

  if (duplicateCategory.length > 0) {
    return res.send({ error: "This category is already exists" });
  } else {
    const category = new Category({
      name,
      description,
    });
    category.save();
    res.send({ message: "Category created successfully" });
  }
};

const categoryStatusController = async (req, res) => {
  const { name, status } = req.body;

  const findName = await Category.find({ name });
  if (findName.length > 0) {
    if (status === "rejected" || status === "waiting") {
      await Category.findOneAndUpdate(
        { name },
        { $set: { isActive: false, status } },
        { new: true }
      );
    } else if (status === "approved") {
      await Category.findOneAndUpdate(
        { name },
        { $set: { isActive: true, status } },
        { new: true }
      );
    }
    return res.send({ message: "Category status updated successfully" });
  }
};

const createSubCategoryController = async (req, res) => {
  const { name, description, category } = req.body;

  const duplicateSubCategory = await SubCategory.find({ name });

  if (duplicateSubCategory.length > 0) {
    return res.send({ error: "This subcategory is already exists" });
  } else {
    const subCategory = new SubCategory({
      name,
      description,
      category,
    });
    subCategory.save();
    await Category.findOneAndUpdate(
      { _id: subCategory.category },
      { $push: { subCategories: subCategory._id } },
      { new: true }
    );
    res.send({ message: "Category created successfully" });
  }
};

const subCategoryStatusController = async (req, res) => {
  const { name, status } = req.body;

  const findName = await SubCategory.find({ name });
  if (findName.length > 0) {
    if (status === "rejected" || status === "waiting") {
      await SubCategory.findOneAndUpdate(
        { name },
        { $set: { isActive: false, status } },
        { new: true }
      );
    } else if (status === "approved") {
      await SubCategory.findOneAndUpdate(
        { name },
        { $set: { isActive: true, status } },
        { new: true }
      );
    }
    return res.send({ message: "SubCategory status updated successfully" });
  }
};

const getAllCategoriesController = async (req, res) => {
  const data = await Category.find({}).populate("subCategories");
  res.send(data);
};

const getAllSubCategoriesController = async (req, res) => {
  try {
    const data = await SubCategory.find({})
      .populate({
        path: 'category',
        populate: {
          path: 'subCategories',
        },
      });
    res.send(data);
  } catch (error) {
    res.status(500).send({ error: 'An error occurred while fetching subcategories.' });
  }
};

module.exports = {
  createCategoryController,
  categoryStatusController,
  createSubCategoryController,
  subCategoryStatusController,
  getAllCategoriesController,
  getAllSubCategoriesController,
};
