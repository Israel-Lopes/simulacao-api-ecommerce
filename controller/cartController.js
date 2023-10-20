const express = require('express');
const cartService = require('../service/cartService');

const router = express.Router();

router.post('/', (req, res) => {
  const newCart = req.body;
  const createdCart = cartService.createCart(newCart);
  res.json(createdCart);
});

router.post('/cart', (req, res) => {
    const newCart = req.body;
    const carts = db.db.get('carts');
    newCart.id = carts.size().value() + 1;
    newCart.products = [];
    carts.push(newCart).write();
    res.json(newCart);
  });

router.post('/:cartId/add-product/:productId', (req, res) => {
  const cartId = parseInt(req.params.cartId, 10);
  const productId = parseInt(req.params.productId, 10);

  const updatedCart = cartService.addProductToCart(cartId, productId);
  if (updatedCart) {
    res.json(updatedCart);
  } else {
    res.status(404).json({ message: 'Carrinho ou produto não encontrado' });
  }
});

module.exports = router;