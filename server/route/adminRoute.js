
const router = require('express').Router();
const adminCtrl = require("../controller/adminController");




router.post("/login", adminCtrl.loginAdmin);
console.log("admin routes");
router.post("/logout", adminCtrl.logoutAdmin);

module.exports = router