const handleError = require('../Middlewares/userErrorHandler/errorHandler');
const Student = require('../Models/studentModel');
//const handleError = require("../Middlewares/userErrorHandler/errorHandler");
const asyncHandler = require("express-async-handler");


const createStudent = asyncHandler(async (req, res) => {

    const { student, RollNo, classRoom,email,gender } = req.body;
     if (!req.files || Object.keys(req.files).length === 0) {
       return res.status(400).send("No files were uploaded.");
     }
    const findStudent = await Student.findOne({ RollNo: RollNo });
    if (findStudent) {
            // return res
             //  .status(409)
              //.json({ error: "A student with the same ID already exists" });
         
        handleError(
            new Error("A student with the same ID already exists"),
            req,
            res,
            "",
            409
        );
    }
    else {
        console.log(req.files.photo);
        console.log("pic", req.files.photo.data)

        let studentObj = new Student({  
            photo: req.files.photo.data,
            student: student,
            RollNo: RollNo,
            classRoom: classRoom,
            gender: gender,
            email:email
        
    
        })
        studentObj.save();
        res.status(200).json({message:"student details uploaded"})
    
    }
})


const allStudentsByClassName = asyncHandler(async (req, res) => {
    
    const classRoo = req.params.cls;
    if (classRoo <= 1 || classRoo >= 11) {
        return res.status(200).json({message:'class up to 1 to 10 only'})
    }
    console.log("classRoo", classRoo);
    try {
        
        const allStudents = await Student.find().select('student RollNo classRoom photo');
        if (allStudents.length >= 1) {
            const studentsOfClass = allStudents.filter((student) => { return student.classRoom === classRoo })
            if (studentsOfClass.length > 0) {
                   
            
                return res.status(200).json(studentsOfClass);
            } else {
                return res.status(200).json({ message: "class did not have students" })
            }
        } else {
            return res.status(200).json({ message: "school did not have students" });
        }







    } catch (error) {
        handleError(new Error("internal server error",req,res,"",400))
    }


})







module.exports = { createStudent, allStudentsByClassName };