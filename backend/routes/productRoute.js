const express = require('express');
const router = express();
const validateProduct = require('../middleware/validators/productValidator');
const {
  getProducts,
  getProduct,
  newProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');

router.route('/').get(getProducts).post(validateProduct, newProduct);
router
  .route('/:sku')
  .get(getProduct)
  .put(validateProduct, updateProduct)
  .delete(deleteProduct);

module.exports = router;
