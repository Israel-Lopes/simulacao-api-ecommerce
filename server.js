const express = require('express');
const jsonServer = require('json-server');
const server = jsonServer.create();

const db = jsonServer.router('./database/db.json');

const middlewares = jsonServer.defaults();

const multer = require('multer');
const path = require('path');

const port = 3000;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const filename = Date.now() + path.extname(file.originalname);
    cb(null, filename);
  },
});

const upload = multer({ storage });

server.use(middlewares);
server.use(express.static('uploads'));
server.use('/uploads', express.static('uploads'));

server.use('/api', db);
server.use(jsonServer.bodyParser);

server.post('/cart', (req, res) => {
  const newCart = req.body;
  const carts = db.db.get('carts');
  newCart.id = carts.size().value() + 1;
  newCart.products = [];
  carts.push(newCart).write();
  res.json(newCart);
});

server.post('/cart/:cartId/add-product/:productId', (req, res) => {
  const cartId = parseInt(req.params.cartId, 10);
  const productId = parseInt(req.params.productId, 10);

  const cart = db.db.get('carts').find({ id: cartId }).value();
  const product = db.db.get('products').find({ id: productId }).value();

  if (cart && product) {
    cart.products.push(productId);
    db.db.get('carts').find({ id: cartId }).assign(cart).write();
    res.json(cart);
  } else {
    res.status(404).json({ message: 'Carrinho ou produto não encontrado' });
  }
});

server.get('/api/categories/:categoryId/products', (req, res) => {
  const categoryId = parseInt(req.params.categoryId, 10);
  const products = db.db.get('products').filter({ categoryId }).value();
  res.json(products);
});

server.post('/api/upload', upload.single('imagem'), (req, res) => {
  res.json({ message: 'Upload bem-sucedido' });
});

const jwt = require('jsonwebtoken');
const secretKey = 'suaChaveSecreta';

server.post('/api/users/register', (req, res) => {
  const { name, email, password } = req.body;
  const users = db.db.get('users');
  const newUser = {
    id: users.size().value() + 1,
    name,
    email,
    password,
    token: '',
  };
  users.push(newUser).write();
  res.json(newUser);
});


server.post('/api/users/login', (req, res) => {
  const { email, password } = req.body;
  const user = db.db.get('users').find({ email, password }).value();
  if (user) {

    const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: '1h' });

    db.db.get('users').find({ id: user.id }).assign({ token }).write();
    res.json({ message: 'Login bem-sucedido', token });
  } else {
    res.status(401).json({ message: 'Credenciais inválidas' });
  }
});

server.post('/cart/:cartId/add-product/:productId', validateToken, (req, res) => {
  const cartId = parseInt(req.params.cartId, 10);
  const productId = parseInt(req.params.productId, 10);

  const cart = db.db.get('carts').find({ id: cartId }).value();
  const product = db.db.get('products').find({ id: productId }).value();

  if (cart && product) {
    cart.products.push(productId);
    db.db.get('carts').find({ id: cartId }).assign(cart).write();
    res.json(cart);
  } else {
    res.status(404).json({ message: 'Carrinho ou produto não encontrado' });
  }
});

server.listen(port, () => {
  console.log(`Servidor JSON está rodando em http://localhost:${port}`);
});