const path = require('path');

module.exports.create = (req, res, next) => {
  console.log(1);
  next();
}