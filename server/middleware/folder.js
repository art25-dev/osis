const fs = require('fs')

module.exports.create = (req, res, next) => {
  try {
    if (!fs.existsSync('test')){
      fs.mkdirSync('test')
    }
  } catch (err) {
    console.error(err)
  }
  next();
}



