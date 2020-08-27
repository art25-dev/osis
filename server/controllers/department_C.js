const Department = require("../models/department_M")
const path = require('path')
const fs = require('fs')

// Функция получения всех подразделений из БД
module.exports.getDepartment = async (req, res) => {
  try {
    const department = await Department.find()
    res.json(department)
  } catch (e) {
    res.status(500).json(e)
  }
}

// Функция получения одного подразделения из БД
module.exports.getDepartmentItem = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id)
    res.json(department)
  } catch (e) {
    res.status(500).json(e)
  }
}

// Функция создания подразделения
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

// Функция редактирования подразделения
module.exports.update = async (req, res) => {
  if (req.file) {
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
    const pathFile = path.resolve(`static/departments${req.body['pathOldImage']}`)

    if(req.body['pathOldImage'] !== $set.imageUrl) {
      fs.unlink(pathFile, (err) => {
        if (err) throw err;
      })
    }

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

// Функция удаления подразделения
module.exports.remove = async (req, res) => {
  try {
    await Department.deleteOne({ _id: req.params.id })
    res.json({ message: "Подразделение удалено" })
  } catch (e) {
    res.status(500).json(e)
  }
  const pathFile = path.resolve(`static/departments${req.query['pathFile']}`)
  fs.unlink(pathFile, (err) => {
    if (err) throw err;
  })
}
