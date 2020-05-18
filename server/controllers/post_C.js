const Post = require("../models/post_M")

// Функция создания объявления
module.exports.create = async (req, res) => {
  const post = new Post({
    title: req.body.title,
    text: req.body.text,
    status: req.body.status
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
}
