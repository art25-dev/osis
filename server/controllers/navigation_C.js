const Navigation = require("../models/navigation_M")
const path = require('path')
const fs = require('fs')

// Функция получения всех пунктов меню из БД
module.exports.getAllMenu = async (req, res) => {
  try {
    const navigations = await Navigation.find()
    res.json(navigations)
  } catch (e) {
    res.status(500).json(e)
  }
}

// Функция получения всех пунктов меню из БД
module.exports.getMenu = async (req, res) => {
  try {
    const navigations = await Navigation.find({ parent: "main"})
    res.json(navigations)
  } catch (e) {
    res.status(500).json(e)
  }
}

// Функция создания пункта меню
module.exports.create = async (req, res) => {
  const navigation = new Navigation({
    _id: req.body._id,
    title: req.body.title,
    parent: req.body.parent
  })
  try {
    await navigation.save()
    res.status(201).json(navigation)
  } catch (e) {
    res.status(500).json(e)
  }
}

// Функция удаления пункта меню
module.exports.remove = async (req, res) => {
  try {
    await Navigation.deleteOne({ _id: req.params.id })
    res.json({ message: "Пункт меню удален" })
  } catch (e) {
    res.status(500).json(e)
  }
}

// module.exports.update = async (req, res) => {

//   if (req.file) {
//     const $set = {
//       title: req.body.title,
//       imageUrl: `/${req.file.filename}`
//     }
//     // Отправка запроса на изменение записи в БД
//     try {
//       const department = await Department.findOneAndUpdate({
//         _id: req.params.id,
//       }, { $set }, { new: true })
//       res.json(department)
//     } catch (e) {
//       res.status(500).json(e)
//     }

//     // Удаление старого файла
//     const pathFile = path.resolve(`static/departments${req.body['pathOldImage']}`)
//     fs.unlink(pathFile, (err) => {
//       if (err) throw err;
//     })
//   } else {
//     const $set = {
//       title: req.body.title
//     }
//     // Отправка запроса на изменение записи в БД
//     try {
//       const department = await Department.findOneAndUpdate({
//         _id: req.params.id,
//       }, { $set }, { new: true })
//       res.json(department)
//     } catch (e) {
//       res.status(500).json(e)
//     }
//   }

// }


// module.exports.getById = async (req, res) => {
//   try {
//     const department = await Department.findById(req.params.id)
//     res.json(department)
//   } catch (e) {
//     res.status(500).json(e)
//   }
// }




