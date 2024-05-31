const express = require("express");
const { login, register, logout } = require("../controller/auth");
const verifyToken = require("../middleware/authHandler");
const router = express.Router();

router.post("/login", login);

router.post("/register", register);
router.post('/logout',verifyToken,logout)

module.exports = router;
