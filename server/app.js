const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")

const authRoutes = require("./routes/auth_R")
const departmentRoutes = require("./routes/department_R")
const navigationRoutes = require("./routes/navigation_R")
const postRoutes = require("./routes/post_R")
const dbRoutes = require("./routes/db_R")

const keys = require("./keys")
const app = express()

// Подключение к базе данных
/////////////////////////////////////////////////////////////////////////////////////
mongoose.connect(keys.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(error => console.error(error))
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
/////////////////////////////////////////////////////////////////////////////////////

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use("/api/auth", authRoutes)
app.use("/api/department", departmentRoutes)
app.use("/api/navigation", navigationRoutes)
app.use("/api/post", postRoutes)
app.use("/api/db", dbRoutes)

module.exports = app
