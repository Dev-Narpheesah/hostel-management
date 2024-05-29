const express = require('express');
const { register, login, getAdmin, deleteAdmin, updateAdmin, getAllAdmins, logoutAdmin } = require('../controllers/adminController');
const router = express.Router()

router.post("/register", register)
router.post("/login", login)

router.get("/:adminId", getAdmin)
router.delete("/:adminId", deleteAdmin)
router.get("/", getAllAdmins)
router.put("/:adminId", updateAdmin)
router.post("/logout", logoutAdmin)

module.exports = router