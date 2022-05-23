const express = require('express');
const Product = require('../models/Product');
const { check, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');
const { name } = require('../routes/productRoute');
const router = express.Router();

/**
 * @desc    Get all products
 * @route   GET api/product
 * @access  Public
 */
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});

  return res.status(200).json(products);
});

/**
 * @desc    Get product by SKU
 * @route   GET api/product/:sku
 * @access  Public
 */
const getProduct = asyncHandler(async (req, res) => {
  const sku = req.params.sku;
  const product = await Product.findOne({ sku });
  console.log(product);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  return res.status(200).json(product);
});

/**
 * @desc    Create a new product
 * @route   POST api/product
 * @access  Public
 */
const newProduct = asyncHandler(async (req, res) => {
  const { name, stock, sku } = req.body;

  // Check if product already exists
  const productExists = await Product.findOne({ sku });
  if (productExists) {
    res.status(400);
    throw new Error('Product already exists');
  }

  // Create product
  const product = await Product.create({
    name,
    stock,
    sku,
    isDeleted: false,
  });

  if (!product) {
    res.status(400);
    throw new Error('Invalid product data');
  }
  return res.status(200).json(product);
});

/**
 * @desc    Upade a product
 * @route   PUT api/product/:id
 * @access  Public
 */
const updateProduct = asyncHandler(async (req, res) => {
  const sku = req.params.sku;

  // Verify product exists
  const product = await Product.findOne({ sku });

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  const updatedProduct = await Product.findOneAndUpdate({ sku }, req.body, {
    new: true,
  });

  if (!updatedProduct) {
    res.status(400);
    throw new Error('Invalid product data');
  }
  return res.status(200).json(updateProduct);
});

const softDeleteProduct = asyncHandler(async (req, res) => {
  const sku = req.params.sku;

  // Check product exists
  const product = await Product.findOne({ sku });
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  let updates = {
    isDeleted: true,
    deletionComment: req.body.deletionComment,
  };
  // Delete product

  const deletedProduct = await Product.findOneAndUpdate({ sku }, updates, {
    new: true,
  });
  return res.status(204).json({});
});

/**
 * @desc    Deletes a product
 * @route   DELETE /api/product/:sku
 * @access  Public
 */
const deleteProduct = asyncHandler(async (req, res) => {
  const sku = req.params.sku;

  // Check product exists
  const product = await Product.findOne({ sku });
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  let updates = {
    isDeleted: true,
    deletionComment: req.body.deletionComment,
  };

  // Delete product
  if (req.params.hardDeletion) {
    await Product.deleteOne({ sku });
  } else {
    const deletedProduct = await Product.findOneAndUpdate({ sku }, updates, {
      new: true,
    });
  }

  return res.status(204).json({});
});

module.exports = {
  getProducts,
  getProduct,
  newProduct,
  updateProduct,
  deleteProduct,
};
