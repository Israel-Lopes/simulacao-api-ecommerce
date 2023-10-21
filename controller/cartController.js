const express = require('express');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const cartService = require('../service/cartService');

const router = express.Router();

// Função para ler o arquivo JSON de usuários
function readUsersFile() {
  const dbData = fs.readFileSync('./database/db.json', 'utf-8');
  const db = JSON.parse(dbData);
  return db.users;
}

// Middleware para verificar o token JWT
function verifyToken(req, res, next) {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ message: 'Token JWT não fornecido' });
  }

  // Recupere o usuário correspondente ao token
  const usersData = readUsersFile();
  const user = usersData.find(u => u.token === token);

  if (!user) {
    return res.status(403).json({ message: 'Token JWT inválido' });
  }

  req.user = user;
  next();
}

// Rota para criar um carrinho sem autenticação
router.post('/cart', (req, res) => {
  const newCart = req.body;
  const carts = db.db.get('carts');
  newCart.id = carts.size().value() + 1;
  newCart.products = [];
  carts.push(newCart).write();
  res.json(newCart);
});

// Rota para criar um carrinho com autenticação JWT
router.post('/', verifyToken, (req, res) => {
  const newCart = req.body;
  const createdCart = cartService.createCart(newCart);
  res.json(createdCart);
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
