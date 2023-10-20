const db = require('json-server').router('./database/db.json');

function getProductsByCategory(categoryId) {
  return db.db.get('products').filter({ categoryId }).value();
}

module.exports = { getProductsByCategory };