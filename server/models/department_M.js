const { Schema, model } = require('mongoose')

const postSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  imageUrl: String
})

module.exports = model('departments', postSchema)
