const { Router } = require("express")

const db_C = require("../controllers/db_C")
const router = Router()


// ADMIN
// /api/db/admin

// Роут на запрос всех объявлений
router.get(
  "/admin/",
  db_C.getDb
)

module.exports = router
