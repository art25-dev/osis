const { Router } = require("express")
const upload = require("../middleware/upload")
const department_C = require("../controllers/department_C")
const router = Router()

// /api/department/admin
// Admin
router.post(
  "/admin/",
  upload.single("image"),
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
  upload.single("newImageFile"),
  department_C.update
)

router.delete("/admin/:id", department_C.remove)


module.exports = router
