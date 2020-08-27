const { Router } = require("express")
const uploadFile = require("../middleware/uploadFile")
const navigation_C = require("../controllers/navigation_C")
const router = Router()


// ADMIN
// /api/navigation/admin

// Роут на запрос всех пунктов навигации
router.get(
  "/admin/",
  navigation_C.getNavigation
)

// Роут на запрос одного пункта навигации
router.get(
  "/admin/:id",
  navigation_C.getNavigationItem
)

// Роут на создание пункта навигации
router.post(
  "/admin/",
  uploadFile.single("file"),
  navigation_C.create
)

// Роут на редактирование пункта навигации
router.put(
  "/admin/:id",
  uploadFile.single("newFile"),
  navigation_C.update
)

// Роут на удаление пункта навигации
router.delete("/admin/:id", navigation_C.remove)



// USER
// /api/navigation/


module.exports = router
