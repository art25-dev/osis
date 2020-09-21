const Post = require("../models/post_M")
const path = require('path')
const fs = require('fs')

// Функция получения всех объявлений из БД
module.exports.getPost = async (req, res) => {
  try {
    const post = await Post.find()
    res.json(post)
  } catch (e) {
    res.status(500).json(e)
  }
},

// Функция создания объявления
module.exports.create = async (req, res) => {
  const post = new Post({
    title: req.body.title,
    status: req.body.status,
    pathFile: req.file === undefined ? null : `/${req.file.filename}`
  })
  try {
    await post.save()
    res.status(201).json(post)
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
    const pathFile = path.resolve(`static/posts${req.query['pathFile']}`)
    fs.unlink(pathFile, (err) => {
      if (err) throw err;
    })
  }
}


