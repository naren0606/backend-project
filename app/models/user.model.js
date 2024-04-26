module.exports = mongoose => {
    const User = mongoose.model(
        "user",
        mongoose.Schema(
          {
            email: String,
            first_name : String,
            last_name : String,
            username:String,
            contact: String,
            password: String,
            role: {type: String, default: 'user'}, 
            coupons: Array,
            bookingRequests: Array
          },
          { timestamps: true }
        )
      );
    
      return User;
    };