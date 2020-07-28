const Post = require("../models/post_M")
const path = require('path')
const fs = require("fs")


// Функция создания объявления
module.exports.create = async (req, res) => {
  let images = []

  for (let i = 0; i < req.files.length; i++) {
    images.push(`/${req.files[i].filename}`)
  }

  const post = new Post({
    title: req.body.title,
    text: req.body.text,
    department: req.body.department,
    status: req.body.status,
    imageList: images
  })

  try {
    await post.save()
    res.status(201).json(post)
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.getAll = async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 })
    res.json(posts)
  } catch (e) {
    res.status(500).json(e)
  }

}

module.exports.getActivePosts = async (req, res) => {
  // try {
  //   const postsActive = await Post.find(req.params.status).sort({ date: -1 })
  // } catch (e) {
  //   res.status(500).json(e)
  // }
}

module.exports.getById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    res.json(post)
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.update = async (req, res) => {
  const $set = {
    title: req.body.title,
    text: req.body.text,
    status: req.body.status
  }
  try {
    const post = await Post.findOneAndUpdate({
      _id: req.params.id,
    }, { $set }, { new: true })
    res.json(post)
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.remove = async (req, res) => {
  try {
    await Post.deleteOne({ _id: req.params.id })
    res.json({ message: "Объявление удалено" })
  } catch (e) {
    res.status(500).json(e)
  }

  for (let i = 0; i < req.query.pathFiles.length; i++) {
    let pathFile = path.resolve(`static/posts${req.query['pathFiles'][i]}`)
    console.log(pathFile);
    fs.unlink(pathFile, (err) => {
      if (err) throw err;
    })
  }
}
