const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller.js");

router.post("/signup", userController.signUp); 
router.post("/login", userController.login); 
router.post("/logout", userController.logout); 
router.get("/coupons", userController.getCouponCode); 
router.post("/book-show", userController.bookShow); 

module.exports = router;
