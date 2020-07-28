const path = require('path')
const multer = require('multer')
const moment = require('moment')
const cyrillicToTranslit = require("cyrillic-to-translit-js")



const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.resolve(__dirname, '../..', 'static/departments'))
  },
  filename(req, file, cb) {
    const fileName = cyrillicToTranslit().transform(req.body.title, "_")
    const fileFormat = file.mimetype.split("/")[1]
    const fileDate = moment().format('HHmmss_SSS')
    cb(null, `${fileName}-${fileDate}.${fileFormat}`)
  }
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

const file = multer({
  storage, fileFilter, limits: { fileSize: 1024 * 1024 * 5 }
})

module.exports = file
