# API de simulação de ecommerce

Dependencias:
 - express
 - json-server
 - multer
 - path
 - jsonwebtoken

Essa api simula um ecommerce contendo rotas de produto, categorias, carrinho, usuario e login.

A api ira fornecer tambem imagens de produtos para serem utilizadas no front-end.

## Objetivos

Objetivo desse projeto e simular o funcionamento de uma api de verdade
para que ela seja usado como apoio em estudos no desenvolvimento de
front-end para programadores iniciantes.

#### Facilidades

Sua utilização e simples e você pode tambem verificar seus dados salvos
do banco de dados direto no arquivo **db.json** sem a necessidade de
entender de consultas SQL. 

Caso seja de seu desejo voce pode cadastrar
novos produtos direto no arquivo **db.json** e carregar novas imagens
dentro do diretorio **/uploads**, diretorio uploads e responsavel
por armazenar a imagem dos produtos cadastrados no **db.json**

## Configurando e subindo o projeto

Para configurar o projeto basta seguir os passos abaixo

``npm install``

Para rodar o projeto basta fazer:

``npm run dev``

## Como acessar imagens

Exemplo de como acessar imagem

``http://localhost:3000/uploads/2FU-5871-791_zoom1.webp``

<br />

## Rotas da API

| Recurso                       | Método | Descrição                                       | Exemplo                                      |
| ----------------------------- | ------ | ----------------------------------------------- | -------------------------------------------- |
| **Category**                  |        |                                                 |                                              |
| Listar categoria              |  GET   | Listar produtos de uma categoria específica     | `curl http://localhost:3000/api/categories/{categoryId}/products` |
| Listar todas categorias       |  GET   | Listar todas as categorias                      | `curl http://localhost:3000/api/categories`  |
| **Product**                   |        |                                                 |                                              |
| Listar todos produtos         |  GET   | Listar todos os produtos                        | `curl http://localhost:3000/api/products`    |
| Listar produto por unidade    |  GET   | Listar um produto específico por ID             | `curl http://localhost:3000/api/products/{productId}` |
| **Cart**                      |        |                                                 |                                              |
| Criar um carrinho             |  POST  | Criar um novo carrinho                          | `curl -X POST http://localhost:3000/cart -H "Content-Type: application/json" -H "Authorization: Bearer SEU_TOKEN_JWT_AQUI" -d '{ "name": "Nome do Carrinho", "user_id": SEU_ID_DE_USUARIO_AQUI }'`   |
| Adicionar produto ao carrinho |  POST  | Adicionar um produto a um carrinho existente | `curl -X POST http://localhost:3000/cart/SEU_ID_DE_CARRINHO_AQUI/add-product/SEU_ID_DE_PRODUTO_AQUI -H "Authorization: Bearer SEU_TOKEN_JWT_AQUI"` |
| **User**                      |        |                                                 |                                               |
| Criar usuário                 |  POST  | Registrar um novo usuário                       | `curl -X POST http://localhost:3000/api/users/register -H "Content-Type: application/json" -d '{ "name": "Nome do Usuário", "email": "email@example.com", "password": "senha_do_usuario" }'`         |
| Logar usuário                 |  POST  | Fazer login e gerar um token JWT                | `curl -X POST http://localhost:3000/api/users/login -H "Content-Type: application/json" -d '{ "email": "email@example.com", "password": "senha_do_usuario" }'` |
|                   |        | Retorno esperado:                               | `{"message": "Login bem-sucedido", "token": "seu-token-jwt-aqui"}` |
