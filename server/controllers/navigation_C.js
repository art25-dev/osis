const Navigation = require("../models/navigation_M")
const path = require('path')
const fs = require('fs')

// Функция получения всех пунктов навигации из БД
module.exports.getNavigation = async (req, res) => {
  try {
    const navigation = await Navigation.find()
    res.json(navigation)
  } catch (e) {
    res.status(500).json(e)
  }
}

// Функция получения одного пункта меню из БД
module.exports.getNavigationItem = async (req, res) => {
  this.changeStatistic(req.query)
  try {
    const navigation = await Navigation.findById(req.params.id)
    res.json(navigation)
  } catch (e) {
    res.status(500).json(e)
  }
}

// Функция создания пункта меню
module.exports.create = async (req, res) => {
  const navigation = new Navigation({
    _id: req.body._id,
    title: req.body.title,
    parent: req.body.parent == "null" ? null : req.body.parent,
    typeLink: req.body.typeLink == "null" ? "link" : req.body.typeLink,
    pathFile: req.file === undefined ? null : `/${req.file.filename}`
  })
  try {
    await navigation.save()
    res.status(201).json(navigation)
  } catch (e) {
    res.status(500).json(e)
  }
}

// Функция редактирования пункта меню
module.exports.update = async (req, res) => {
  if (req.file) {
    const $set = {
      title: req.body.title,
      parent: req.body.parent,
      typeLink: req.body.typeLink == "null" ? "link" : req.body.typeLink,
      pathFile: `/${req.file.filename}`
    }
    // Отправка запроса на изменение записи в БД
    try {
      const navigation = await Navigation.findOneAndUpdate({
        _id: req.params.id,
      }, { $set }, { new: true })
      res.json(navigation)
    } catch (e) {
      res.status(500).json(e)
    }
    // // Удаление старого файла
    const pathFile = path.resolve(`static/documents${req.body['oldFile']}`)
    if(req.body['oldFile'] !== $set.pathFile) {
      fs.unlink(pathFile, (err) => {
        if (err) throw err;
      })
    }
  } else {
    const $set = {
      title: req.body.title,
      parent: req.body.parent
    }
    // Отправка запроса на изменение записи в БД
    try {
      const navigation = await Navigation.findOneAndUpdate({
        _id: req.params.id,
      }, { $set }, { new: true })
      res.json(navigation)
    } catch (e) {
      res.status(500).json(e)
    }
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
  if (req.query["pathFile"]) {
    const pathFile = path.resolve(`static/documents${req.query['pathFile']}`)
    fs.unlink(pathFile, (err) => {
      if (err) throw err;
    })
  }
}

// Функция добавления статистики просмотров пунктов навигации
module.exports.changeStatistic = async (statistic) => {
  try {
    for (const key in statistic) {
      await Navigation.updateOne({_id: key}, {$inc: {views: statistic[key]}})
    }
  } catch (e) {
  }
}

