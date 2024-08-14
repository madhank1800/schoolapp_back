
const express = require('express');
const router = express.Router();
const {
  createStudent,
  allStudentsByClassName,
} = require("../Controllers/studentCtrl");
const { authHandler,isTeacher }=require('../Middlewares/userErrorHandler/authHandler')
router.post("/create",authHandler,isTeacher, createStudent);

router.get(
  "/allStudentsByClassName/:cls",
  authHandler,
  isTeacher,
  allStudentsByClassName
);
module.exports = router;