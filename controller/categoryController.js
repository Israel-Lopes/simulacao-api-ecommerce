const express = require('express');
const categoryService = require('../service/categoryService');

const router = express.Router();

router.get('/:categoryId/products', (req, res) => {
  const categoryId = parseInt(req.params.categoryId, 10);
  const products = categoryService.getProductsByCategory(categoryId);
  res.json(products);
});

module.exports = router;