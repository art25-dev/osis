const {Router} = require("express")
const {login} = require("../controllers/auth_C")
const router = Router()

// /api/auth/admin/login
router.post("/admin/login", login)

module.exports = router