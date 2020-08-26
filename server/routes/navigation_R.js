const { Router } = require("express")
const uploadFile = require("../middleware/uploadFile")
const navigation_C = require("../controllers/navigation_C")
const router = Router()


// Admin
// /api/navigation/admin

router.post(
  "/admin/",
  uploadFile.single("file"),
  navigation_C.create
)

router.get(
  "/admin/",
  navigation_C.getAllMenu
)

router.delete("/admin/:id", navigation_C.remove)

router.get(
  "/admin/:id",
  navigation_C.getById
)

router.put(
  "/admin/:id",
  uploadFile.single("newFile"),
  navigation_C.update
)


// User
// /api/navigation/
router.get("/", navigation_C.getAllMenu)
router.get("/:id", navigation_C.getPdfFile)



module.exports = router
