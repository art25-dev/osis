const { Schema, model } = require('mongoose')

const departmentSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  imageUrl: String
})

module.exports = model('departments', departmentSchema)
