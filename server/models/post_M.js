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
  department: {
    type: Schema.Types.ObjectId,
    ref: "departments"
  },
  imageList: {
    type: Array
  }
})

module.exports = model('posts', postSchema)
