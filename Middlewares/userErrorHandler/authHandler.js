const asyncHandler = require("express-async-handler");
const jwt = require('jsonwebtoken');
const User = require("../../Models/userModel");

const authHandler = asyncHandler(async (req, res,next) => {
    let token;
  console.log("headers", req?.headers?.authorization?.startsWith("Bearer"));
  console.log("h1", req?.headers?.authorization);
    if (req?.headers?.authorization?.startsWith("Bearer")) {
     
        token = req.headers.authorization.split(" ")[1];
           console.log("tok", token);
       try {
         if (token) {
           const decoded = jwt.verify(token, process.env.SECRET_KEY);
           console.log("..////=", decoded);
             const user = await User.findById(decoded?.id);
           console.log("user", user);
           req.user = user;
           console.log("us", req.user);
           next();   
         }
       } catch (error) {
         throw new Error("not authorized token expired,please login again");
       }
     } else {
       throw new Error("there is no token attached to header");
     }

    
})



const isTeacher = asyncHandler(async (req, res, next) => {
  const { email } = req.user;
  const adminUser = await User.findOne({ email });
  console.log("adminUser", adminUser);
  if (adminUser.role !== "teacher") {
    throw new Error("you are not a teacher");
  } else {
    next();
  }
});

module.exports = { authHandler ,isTeacher};