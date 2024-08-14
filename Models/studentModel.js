

const mongoose = require('mongoose');
const studentSchema = new mongoose.Schema({
  student: {
    type: String,
    // required: true,
  },
  RollNo: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  photo: {
    type: Buffer,
    required: true,
  },
  classRoom: {
    type: String,
    required: true,
    enum: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
  },
  progressCard: {
    type: String,
    default: "tutu",
  },
  attendance: {
    type: Array,
  },
});


module.exports=mongoose.model('Student', studentSchema);