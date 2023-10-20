const express = require('express');
const jsonServer = require('json-server');
const server = jsonServer.create();
const db = jsonServer.router('./database/db.json');
const port = 3000;
const middlewares = jsonServer.defaults();

const cartController = require('./controller/cartController');
const userController = require('./controller/userController');
const categoryController = require('./controller/categoryController');
const uploadController = require('./controller/uploadController');

// Defina os middlewares padrão
server.use(middlewares);

// Adicione o corpo do JSON para análise
server.use(jsonServer.bodyParser);

// Rotas para o controlador e serviço
server.use('/cart', cartController);
server.use('/api/users', userController);
server.use('/api/categories', categoryController);
server.use('/uploads', express.static('uploads'));

// Rota da API
server.use('/api', db);

server.listen(port, () => {
  console.log(`Servidor JSON está rodando em http://localhost:${port}`);
});
