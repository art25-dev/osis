const { Router } = require("express")
const navigation_C = require("../controllers/navigation_C")
const router = Router()



// /api/navigation/admin
// Admin
router.post(
  "/admin/",
  navigation_C.create
)

router.get(
  "/admin/",
  navigation_C.getAll
)

router.delete("/admin/:id", navigation_C.remove)

// router.get(
//   "/admin/:id",
//   department_C.getById
// )

// router.put(
//   "/admin/:id",
//   department_C.update
// )




module.exports = router
