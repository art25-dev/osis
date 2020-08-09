const { Router } = require("express")
const navigation_C = require("../controllers/navigation_C")
const router = Router()


// Admin
// /api/navigation/admin

router.post(
  "/admin/",
  navigation_C.create
)

router.get(
  "/admin/",
  navigation_C.getAllMenu
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


// Admin
// /api/navigation/
router.get("/", navigation_C.getAllMenu)



module.exports = router
