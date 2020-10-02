const fs = require('fs')

module.exports.create = (req, res, next) => {
  try {
    if (!fs.existsSync(`${req.query.pathFile}/test`)){
      fs.mkdirSync(`${req.query.pathFile}/test`)
    }
  } catch (err) {
    console.error(err)
  }
  next();
}



