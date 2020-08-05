const { Schema, model } = require('mongoose')

const navigationSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  parent: {
    type: String
  },
  type: {
    type: String,
    required: true
  }
})

module.exports = model('navigations', navigationSchema)
