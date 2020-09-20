const { Schema, model } = require('mongoose')

const postSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  pathFile: {
    type: String,
    default: null
  },
  date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: Boolean,
    default: true
  }
})


module.exports = model('posts', postSchema)
