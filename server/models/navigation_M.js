const { Schema, model } = require('mongoose')

const navigationSchema = new Schema({
  _id: {
    type: String,
    required: true
  },
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
  }
})


module.exports = model('navigations', navigationSchema)
