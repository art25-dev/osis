const { Router } = require("express")
const navigation_C = require("../controllers/navigation_C")
const router = Router()



// /api/department/admin
// Admin
// router.post(
//   "/admin/",
//   department_C.create
// )

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
