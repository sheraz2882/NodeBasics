const express = require("express");
const Product = require("../models/product.model.js");
const router = express.Router();
const {
  getProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller.js");

//get api for fetching all products
router.get("/", getProducts);

//post api for creating a product
router.post("/", createProduct);

//get api for fetching product by id
router.get("/:id", getProduct);

//update api for updating product data
router.put("/:id", updateProduct);

//delete product data
router.delete("/:id", deleteProduct);

module.exports = router;
