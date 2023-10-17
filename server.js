/**
 * Módulos necessários.
 * @module jsonServer
 * @module express
 * @module multer
 * @module path
 */
const express = require('express');
const jsonServer = require('json-server');
const server = jsonServer.create();

/**
 * Roteador JSON Server para interagir com o arquivo de banco de dados JSON.
 * @type {object}
 */
const db = jsonServer.router('./database/db.json');

/**
 * Middlewares padrão para o servidor JSON.
 * @type {object}
 */
const middlewares = jsonServer.defaults();

const multer = require('multer');
const path = require('path');

/**
 * Porta na qual o servidor está rodando.
 * @type {number}
 */
const port = 3000;

/**
 * Configuração de armazenamento para o middleware multer.
 * @type {object}
 */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const filename = Date.now() + path.extname(file.originalname);
    cb(null, filename);
  },
});

/**
 * Middleware de upload de arquivos.
 * @type {function}
 */
const upload = multer({ storage });

server.use(middlewares);
server.use(express.static('uploads'));
server.use('/uploads', express.static('uploads'));

/**
 * Middleware para servir rotas da API usando o roteador JSON Server.
 * @type {function}
 */
server.use('/api', db);
server.use(jsonServer.bodyParser);

/**
 * Rota para criar um novo carrinho.
 * @function
 * @name POST /cart
 * @param {object} req - Objeto de solicitação.
 * @param {object} res - Objeto de resposta.
 */
server.post('/cart', (req, res) => {
  const newCart = req.body;
  const carts = db.db.get('carts');
  newCart.id = carts.size().value() + 1;
  newCart.products = [];
  carts.push(newCart).write();
  res.json(newCart);
});

/**
 * Rota para adicionar um produto a um carrinho.
 * @function
 * @name POST /cart/:cartId/add-product/:productId
 * @param {object} req - Objeto de solicitação.
 * @param {object} res - Objeto de resposta.
 */
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

/**
 * Rota para listar produtos de uma categoria específica.
 * @function
 * @name GET /api/categories/:categoryId/products
 * @param {object} req - Objeto de solicitação.
 * @param {object} res - Objeto de resposta.
 */
server.get('/api/categories/:categoryId/products', (req, res) => {
  const categoryId = parseInt(req.params.categoryId, 10);
  const products = db.db.get('products').filter({ categoryId }).value();
  res.json(products);
});

/**
 * Rota para fazer upload de um arquivo.
 * @function
 * @name POST /api/upload
 * @param {object} req - Objeto de solicitação.
 * @param {object} res - Objeto de resposta.
 */
server.post('/api/upload', upload.single('imagem'), (req, res) => {
  res.json({ message: 'Upload bem-sucedido' });
});

/**
 * Inicializa o servidor e faz com que ele escute na porta especificada.
 * @function
 */
server.listen(port, () => {
  console.log(`Servidor JSON está rodando em http://localhost:${port}`);
});