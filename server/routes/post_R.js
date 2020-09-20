const { Router } = require("express")
const uploadPost = require("../middleware/uploadPost")
const post_C = require("../controllers/post_C")
const router = Router()


// ADMIN
// /api/post/admin

// Роут на запрос всех объявлений
router.get(
  "/admin/",
  post_C.getPost
),

// Роут на создание объявления
router.post(
  "/admin/",
  uploadPost.single("file"),
  post_C.create
)

// Роут на удаление объявления
router.delete("/admin/:id", post_C.remove)


// USER
// /api/navigation/


module.exports = router
