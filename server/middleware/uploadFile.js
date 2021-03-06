const path = require('path')
const multer = require('multer')
const moment = require("moment")
const cyrillicToTranslit = require("cyrillic-to-translit-js")



const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.resolve(__dirname, '../..', 'static'))
  },
  filename(req, file, cb) {
    const fileName = `doc-${cyrillicToTranslit().transform(req.body.title, "_")}-${moment().format("SSS")}`
    const fileFormat = file.mimetype.split("/")[1]
    cb(null, `${fileName}.${fileFormat}`)
  }
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

const file = multer({
  storage, fileFilter, limits: { fileSize: 1024 * 1024 * 20 }
})

module.exports = file
