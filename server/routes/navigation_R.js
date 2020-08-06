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

// router.get(
//   "/admin/:id",
//   department_C.getById
// )

// router.put(
//   "/admin/:id",
//   department_C.update
// )

// router.delete("/admin/:id", department_C.remove)


module.exports = router
