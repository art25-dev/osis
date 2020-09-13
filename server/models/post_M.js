const { Schema, model } = require('mongoose')

const postSchema = new Schema({
  _id: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  pathFile: {
    type: String,
    default: null
  },
  date: {
    type: Date
  },
  status: {
    type: Boolean,
    default: true
  }
})


module.exports = model('posts', postSchema)
