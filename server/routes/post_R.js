const { Router } = require("express")
const uploadFile = require("../middleware/uploadFile")
const post_C = require("../controllers/post_C")
const router = Router()


// ADMIN
// /api/navigation/admin

// Роут на запрос всех объявлений
router.get(
  "/admin/",
  post_C.getPost
)


// USER
// /api/navigation/


module.exports = router
