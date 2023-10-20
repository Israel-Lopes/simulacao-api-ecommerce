const db = require('json-server').router('./database/db.json');

function registerUser(name, email, password) {
  const users = db.db.get('users');
  const newUser = {
    id: users.size().value() + 1,
    name,
    email,
    password,
    token: '',
  };
  users.push(newUser).write();
  return newUser;
}

function loginUser(email, password) {
  return db.db.get('users').find({ email, password }).value();
}

function updateUserToken(userId, token) {
  db.db.get('users').find({ id: userId }).assign({ token }).write();
}

// ...

module.exports = { registerUser, loginUser, updateUserToken };
