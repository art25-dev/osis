const { Router } = require("express")
const post_C = require("../controllers/post_C")
const router = Router()

// /api/post/admin
// Admin
router.post(
  "/admin/",
  post_C.create
)

router.get(
  "/admin/",
  post_C.getAll
)

router.get(
  "/admin/:id",
  post_C.getById
)

router.put(
  "/admin/:id",
  post_C.update
)

router.delete(
  "/admin/:id",
  post_C.remove
)

// User
// /api/post/
router.get("/", post_C.getActivePosts)

module.exports = router
