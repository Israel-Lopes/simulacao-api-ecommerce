const db = require('json-server').router('./database/db.json');

function createCart(newCart) {
  newCart.id = db.db.get('carts').size().value() + 1;
  newCart.products = [];
  db.db.get('carts').push(newCart).write();
  return newCart;
}

function addProductToCart(cartId, productId) {
  const cart = db.db.get('carts').find({ id: cartId }).value();
  const product = db.db.get('products').find({ id: productId }).value();

  if (cart && product) {
    cart.products.push(productId);
    db.db.get('carts').find({ id: cartId }).assign(cart).write();
    return cart;
  }
  return null;
}

module.exports = { createCart, addProductToCart };
