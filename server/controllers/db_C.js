const Post = require("../models/post_M")
const path = require('path')
const fs = require('fs')

// Функция получения всех объявлений из БД
module.exports.getDb = async (req, res) => {
  try {
    
    res.download('static/1.zip');
  } catch (e) {
    res.status(500).json(e)
  }
},

// Функция удаления объявления
module.exports.remove = async (req, res) => {
  try {
    await Post.deleteOne({ _id: req.params.id })
    res.json({ message: "Объявление удалено" })
  } catch (e) {
    res.status(500).json(e)
  }
  if (req.query["pathFile"]) {
    const pathFile = path.resolve(`static${req.query['pathFile']}`)
    fs.unlink(pathFile, (err) => {
      if (err) throw err;
    })
  }
}


