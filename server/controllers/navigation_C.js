const Navigation = require("../models/navigation_M")
const path = require('path')
const fs = require('fs')

// Функция получения 1 пункта меню из БД
module.exports.getById = async (req, res) => {
  try {
    const navigation = await Navigation.findById(req.params.id)
    res.json(navigation)
  } catch (e) {
    res.status(500).json(e)
  }
}

// Функция получения всех пунктов меню из БД
module.exports.getAllMenu = async (req, res) => {
  try {
    const navigation = await Navigation.find()
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
    parent: req.body.parent,
    typeLink: req.body.typeLink === null ? "link" : req.body.typeLink
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

module.exports.update = async (req, res) => {
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
