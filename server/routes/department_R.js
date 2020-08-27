const { Router } = require("express")
const uploadAvatar = require("../middleware/uploadAvatar")
const department_C = require("../controllers/department_C")
const router = Router()


// ADMIN
// /api/department/admin

// Роут на запрос всех подразделений
router.get(
  "/admin/",
  department_C.getDepartment
)

// Роут на запрос одного подразделения
router.get(
  "/admin/:id",
  department_C.getDepartmentItem
)

// Роут на создание подразделения
router.post(
  "/admin/",
  uploadAvatar.single("image"),
  department_C.create
)

// Роут на редактирование подразделения
router.put(
  "/admin/:id",
  uploadAvatar.single("newImageFile"),
  department_C.update
)

// Роут на удаление подразделения
router.delete("/admin/:id", department_C.remove)


// USER
// /api/department/


module.exports = router
