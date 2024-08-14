const mongoose = require("mongoose");

const dbConnect = async () => {
  
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI);
    console.log("db connected succesfully");
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = dbConnect;
