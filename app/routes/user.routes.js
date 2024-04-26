const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller.js");
const authMiddleware = require('../middlewares/authMiddleware');

router.post("/signup", userController.signUp); 
router.post("/login", userController.login); 
router.post("/logout", authMiddleware, userController.logout); 
router.get("/coupons", authMiddleware, userController.getCouponCode); 
router.post("/book-show", authMiddleware, userController.bookShow); 

module.exports = router;
