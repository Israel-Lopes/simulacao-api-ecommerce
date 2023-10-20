const express = require('express');
const userService = require('../service/userService');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const secretKey = crypto.randomBytes(32).toString('hex');

const router = express.Router();

router.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  const newUser = userService.registerUser(name, email, password);
  res.json(newUser);
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = userService.loginUser(email, password);

  if (user) {
    const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: '1h' });
    userService.updateUserToken(user.id, token);
    res.json({ message: 'Login bem-sucedido', token });
  } else {
    res.status(401).json({ message: 'Credenciais inválidas' });
  }
});

module.exports = router;
