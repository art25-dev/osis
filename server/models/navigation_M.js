const { Schema, model } = require('mongoose')

const navigationSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  parent: {
    type: String,
    default: null
  },
  typeLink: {
    type: String,
    default: "link"
  },
  pathFile: {
    type: String,
    default: null
  },
  views: {
    type: Number,
    default: 0
  }
})


module.exports = model('navigations', navigationSchema)
