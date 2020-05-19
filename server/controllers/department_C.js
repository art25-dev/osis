const Department = require("../models/department_M")
const path = require('path')
const fs = require('fs')

// Функция создания объявления
module.exports.create = async (req, res) => {
  const department = new Department({
    title: req.body.title,
    imageUrl: `/${req.file.filename}`
  })

  try {
    await department.save()
    res.status(201).json(department)
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.update = async (req, res) => {
  console.log(req.file.filename);

  if (req.file.filename) {
    const $set = {
      title: req.body.title,
      imageUrl: `/${req.file.filename}`
    }
    // Отправка запроса на изменение записи в БД
    try {
      const department = await Department.findOneAndUpdate({
        _id: req.params.id,
      }, { $set }, { new: true })
      res.json(department)
    } catch (e) {
      res.status(500).json(e)
    }

    // Удаление старого файла
    const pathFile = path.resolve(`static/images/departments${req.body['pathOldImage']}`)
    fs.unlink(pathFile, (err) => {
      if (err) throw err;
      console.log("file deleted");
  
    })
  } else {
    const $set = {
      title: req.body.title
    }
    // Отправка запроса на изменение записи в БД
    try {
      const department = await Department.findOneAndUpdate({
        _id: req.params.id,
      }, { $set }, { new: true })
      res.json(department)
    } catch (e) {
      res.status(500).json(e)
    }
  } 
 
}

module.exports.getAll = async (req, res) => {
  try {
    const departments = await Department.find()
    res.json(departments)
  } catch (e) {
    res.status(500).json(e)
  }

}

module.exports.getById = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id)
    res.json(department)
  } catch (e) {
    res.status(500).json(e)
  }
}



module.exports.remove = async (req, res) => {
  try {
    await Department.deleteOne({ _id: req.params.id })
    res.json({ message: "Подразделение удалено" })
  } catch (e) {
    res.status(500).json(e)
  }

  const pathFile = path.resolve(`static/images/departments${req.query['pathFile']}`)
  fs.unlink(pathFile, (err) => {
    if (err) throw err;
    console.log("file deleted");

  })
}
