# API de simulação de ecommerce

Essa api simula um ecommerce contendo rotas de produto, categorias e carrinho.

Para configurar o projeto basta seguir os passos abaixo

``npm install``

Para rodar o projeto basta fazer:

``npm run dev``

## Exemplo de uso

Exemplo de como acessar imagem

``http://localhost:3000/uploads/2FU-5871-791_zoom1.webp``

## Objetivos

Objetivo desse projeto e simular uma API para que ela sirva de serviço para construção de um ecommerce de produtos.

A api ira fornecer imagens e um objeto json de produtos, categorias e carrinho.

## Rotas

#### Category

Listar categoria:

GET ``http://localhost:3000/api/categories/{id_categoria}/products``

Listar todas categorias:

GET `` http://localhost:3000/api/categories``

#### Product

Listar produtos:

GET ``http://localhost:3000/api/products``

Listar produto por unidade:

GET ``http://localhost:3000/api/products/{id_produto}``

#### Cart

Criar um carrinho:

POST ``http://localhost:3000/cart``

- Content-Type: application/json
  - '{"name": "Meu Carrinho"}'

Adicionar produto ao carrinho:

POST ``http://localhost:3000/cart/{id_carrinho}/add-product/{id_produto}``