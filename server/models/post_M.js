const { Schema, model } = require('mongoose')

const postSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: Boolean,
    require: true
  },
})

module.exports = model('posts', postSchema)
