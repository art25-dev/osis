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
}


