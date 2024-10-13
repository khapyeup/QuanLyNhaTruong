import express from "express";
import adminLogin from "../controllers/admin-controller.js"
import {getParentList, parentLogin} from "../controllers/parent-controller.js"
import getTeacherList from "../controllers/teacher-controller.js";
import getNoticeList from "../controllers/notice-controller.js";
import {getStudentList, addStudent, deleteStudent, getDetailStudent, updateStudent} from "../controllers/student-controller.js";
import getClassList from "../controllers/class-controller.js";


const router = express.Router();

//Admin
router.post("/Adminlogin", adminLogin)

// Parent
router.post("/Parentlogin", parentLogin)
router.get("/parents", getParentList)
//Teacher
router.get("/teachers", getTeacherList)

//Notice
router.get("/notices", getNoticeList)

//Student
router.get("/students", getStudentList)
router.post("/students/add", addStudent)
router.delete("/students/delete/:id", deleteStudent)
router.get("/students/view/:id", getDetailStudent)
router.put("/students/edit/:id", updateStudent)
//Classes
router.get("/classes", getClassList)


export default router;