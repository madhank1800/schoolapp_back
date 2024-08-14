
const User = require('../Models/userModel');
const asyncHandler = require('express-async-handler');
const handleError = require('../Middlewares/userErrorHandler/errorHandler');
const { generateRefreshToken } = require("../configurations/refreshToken");
const { generateToken } = require('../configurations/jwtToken');
const register =asyncHandler( async (req, res) => {
    console.log("user1");
    
    const findUser = await User.findOne({ email: req.body.email });
    console.log("findUser",findUser);
  if (findUser) {
    handleError(new Error("user already registered with this email"), req, res, '', 409);
       
  } else {
    const { surname, name, email, password, day, year, phone, month, gender } = req.body;
    const user = new User({
      surname: surname,
      name: name,
      email: email,
      password: password,
      DateOfBirth: day + "-" + year + "-" + month,
      gender: gender,
      mobile: phone,
    });
    await user.save();
    // const user = await User.create(req.body);
    res.json({
      message: "Registration successful",
      status: 201
    });
  }
   
})




const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const findUser =await  User.findOne({ email})

  if (findUser && (await findUser.isPasswordMatched(password))) {
    const refreshToken = await generateRefreshToken(findUser?._id);
    const updateuser = await User.findByIdAndUpdate(
      findUser.id,
      {
        refreshToken: refreshToken,
      },
      { new: true }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });

    res.json({
      _id: findUser?._id,
      surname: findUser?.surname,
      name: findUser?.name,
      email: findUser?.email,
      mobile: findUser?.mobile,
      role:findUser?.role,
      token: generateToken(findUser?._id),
    });
  } else {
    throw new Error("Invalid Credentials");
  }

});




const updatePassword = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { password } = req.body;
  
    const user = await User.findById(_id);
    if (password) {
      user.password = password;
      console.log("pass", user.password);
      const updatedPassword = await user.save();
      res.json(updatedPassword);
    } else {
      res.json(user);
    }
})


module.exports = { register ,login,updatePassword}