const { Router } = require("express")
const uploadAvatar = require("../middleware/uploadAvatar")
const department_C = require("../controllers/department_C")
const router = Router()



// /api/department/admin
// Admin
router.post(
  "/admin/",
  uploadAvatar.single("image"),
  department_C.create
)

router.get(
  "/admin/",
  department_C.getAll
)

router.get(
  "/admin/:id",
  department_C.getById
)

router.put(
  "/admin/:id",
  uploadAvatar.single("newImageFile"),
  department_C.update
)

router.delete("/admin/:id", department_C.remove)


module.exports = router
