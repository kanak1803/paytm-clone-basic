const express = require("express");
const { userRegister, userLogin } = require("../controller/authController");
const checkAuth = require("../middleware/authMiddleware");
const { updateProfile } = require("../controller/userController");

const router = express.Router();

router.post("/register", userRegister);
router.post("/login", userLogin);
router.put("/updateprofile", checkAuth, updateProfile);

module.exports = router;
