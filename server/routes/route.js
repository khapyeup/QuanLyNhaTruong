import express from "express";
import adminLogin from "../controllers/admin-controller.js"
import {getParentList, parentLogin} from "../controllers/parent-controller.js"
import {getTeacherList, getDetailTeacher, addTeacher, updateTeacher, deleteTeacher} from "../controllers/teacher-controller.js";
import {getNoticeList, getDetailNotice, addNotice, updateNotice, deleteNotice} from "../controllers/notice-controller.js";
import {getStudentList, addStudent, deleteStudent, getDetailStudent, updateStudent} from "../controllers/student-controller.js";
import {getClassList, addSchedule, getDetailClass} from "../controllers/class-controller.js";
import { addActivity, deleteActivity, getActivityList, updateActivity } from "../controllers/activity-controller.js";


const router = express.Router();

//Admin
router.post("/Adminlogin", adminLogin)

// Parent
router.post("/Parentlogin", parentLogin)
router.get("/parents", getParentList)
//Teacher
router.get("/teachers", getTeacherList)
router.get("/teachers/view/:id", getDetailTeacher)
router.post("/teachers/add", addTeacher)
router.put("/teachers/edit/:id", updateTeacher)
router.delete("/teachers/delete/:id", deleteTeacher)
//Notice
router.get("/notices", getNoticeList)
router.get("/notices/view/:id", getDetailNotice)
router.post("/notices/add", addNotice)
router.put("/notices/edit/:id", updateNotice)
router.delete("/notices/delete/:id", deleteNotice)

//Student
router.get("/students", getStudentList)
router.get("/students/view/:id", getDetailStudent)
router.post("/students/add", addStudent)
router.put("/students/edit/:id", updateStudent)
router.delete("/students/delete/:id", deleteStudent)
//Classes
router.get("/classes", getClassList)
router.put('/classes/schedule/:classId', addSchedule)
router.get('/classes/view/:classId', getDetailClass)
//Activity
router.get("/activity", getActivityList);
router.post("/activity/add", addActivity);
router.put('/activity/edit/:id', updateActivity);
router.delete('/activity/delete/:id', deleteActivity);
export default router;