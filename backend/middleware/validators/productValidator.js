const { check, validationResult } = require('express-validator');

const validateProduct = [
  check('name').trim().not().isEmpty().withMessage('Name cannot be empty'),
  check('stock').isFloat({ min: 0 }).withMessage('Stock cannot be negative'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422);

      const errorMessages = errors.array().map((err) => err.msg);

      throw new Error(errorMessages[0]);
    }
    next();
  },
];

module.exports = validateProduct;
