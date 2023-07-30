// Routing means calling the correct api of controller function
// depending upon the client request

module.exports = app => {
    // We would load user.controller.js , something like :
      const users = require("../controllers/user.controller");
      
      var router = require("express").Router();
    
      
    // 1. SignUp route a new user.     
        router.post("/auth/signup", users.signUp);
    
    // 2. Login route. 
        router.post("/auth/login", users.login);
    
    // 3. Logout route
        router.post("/auth/logout", users.logout);
    
    // 4. Coupen route
        router.get("/auth/coupons", users.getCouponCode);
    
    // 5. Book show for user
        router.post("/auth/bookings", users.bookShow);


    // All our API URLS would start with /api  , like 
    // http://localhost:3000/api/sign-up
        app.use('/api', router);
    };
    
    
    
    