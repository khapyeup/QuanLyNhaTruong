import express from "express";
import {addUser, adminLogin, getDetailUser, getUserList, updateUser} from "../controllers/admin-controller.js"
import {addParent, deleteParent, getParentList, parentLogin, updateParent} from "../controllers/parent-controller.js"
import {getTeacherList, getDetailTeacher, addTeacher, updateTeacher, deleteTeacher} from "../controllers/teacher-controller.js";
import {getNoticeList, getDetailNotice, addNotice, updateNotice, deleteNotice} from "../controllers/notice-controller.js";
import {getStudentList, addStudent, deleteStudent, getDetailStudent, updateStudent, getStudentByUser} from "../controllers/student-controller.js";
import {getClassList, addSchedule, getDetailClass, updateClass, addClass} from "../controllers/class-controller.js";
import { addActivity, addGroupActivity, deleteActivity, deleteGroupActivity, getActivityList, getAllGroupActivity, updateActivity, updateGroupActivity } from "../controllers/activity-controller.js";
import { addFinance, deleteFinance, getAllFinanceRecords, getFinanceByUserId, recordPayment, updateFinance } from "../controllers/finance-controller.js";
import { createChat, findChat, findUserChat } from "../controllers/chat-controller.js";
import { createMessage, getMessage } from "../controllers/message-controller.js";


const router = express.Router();

//Admin
router.post("/Adminlogin", adminLogin)

//User
router.get('/users', getUserList)

// Parent
router.post("/Parentlogin", parentLogin)
router.get("/parents", getParentList)
router.post('/parents', addParent)
router.put('/parents/:id', updateParent)
router.delete('/parents/:id', deleteParent)
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
router.get("/user/:userId/students", getStudentByUser)
router.get("/students/view/:id", getDetailStudent)
router.post("/students/add", addStudent)
router.put("/students/edit/:id", updateStudent)
router.delete("/students/delete/:id", deleteStudent)
//Classes
router.get("/classes", getClassList)
router.put('/classes/edit/:id', updateClass)
router.post('/classes/add', addClass)
router.put('/classes/schedule/:classId', addSchedule)
router.get('/classes/view/:classId', getDetailClass)


//Group - Activity
router.post("/group_activity", addGroupActivity);
router.get("/group_activity", getAllGroupActivity);
router.put("/group_activity/:id", updateGroupActivity);
router.delete('/group_activity/:id', deleteGroupActivity);
// Activity
router.post("/group_activity/:id/activity", addActivity);
router.put("/group_activity/:id/activity/:activityId", updateActivity);
router.delete('/group_activity/:id/activity/:activityId', deleteActivity);

//Finance
router.get('/finances', getAllFinanceRecords);
router.get('/finances/user/:userId', getFinanceByUserId)
router.post('/finances', addFinance);
router.put('/finances/:id', updateFinance)
router.delete('/finances/:id', deleteFinance)
router.post('/payments', recordPayment);

//Chat
router.post('/chats', createChat);
router.get('/chats/:userId', findUserChat);
router.get('/chats/find/:firstId/:secondId', findChat);
//Message
router.post('/messages', createMessage);
router.get('/messages/:chatId', getMessage);


export default router;