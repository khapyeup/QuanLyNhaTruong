import express from "express";
import {
  addUser,
  adminLogin,
  getDetailUser,
  getUserList,
  updateUser,
} from "../controllers/admin-controller.js";
import {
  addParent,
  deleteParent,
  getParentList,
  parentLogin,
  searchParentUser,
  updateParent,
} from "../controllers/parent-controller.js";
import {
  getTeacherList,
  getDetailTeacher,
  addTeacher,
  updateTeacher,
  deleteTeacher,
  teacherLogin,
  searchTeacherUser,
} from "../controllers/teacher-controller.js";
import {
  getNoticeList,
  getDetailNotice,
  addNotice,
  updateNotice,
  deleteNotice,
} from "../controllers/notice-controller.js";
import {
  getStudentList,
  addStudent,
  deleteStudent,
  getDetailStudent,
  updateStudent,
  getStudentByUser,
  getTotalAttendance,
  getStudentByClass,
  setAttendanceByClass,
} from "../controllers/student-controller.js";
import {
  getClassList,
  addSchedule,
  getDetailClass,
  updateClass,
  addClass,
  getSchedule,
  deleteClass,
} from "../controllers/class-controller.js";
import {
  addActivity,
  addGroupActivity,
  deleteActivity,
  deleteGroupActivity,
  getActivityList,
  getAllGroupActivity,
  updateActivity,
  updateGroupActivity,
} from "../controllers/activity-controller.js";
import {
  addFinance,
  deleteFinance,
  getAllFinanceRecords,
  getFinanceByUserId,
  recordPayment,
  updateFinance,
} from "../controllers/finance-controller.js";
import {
  getConversations,
  getMessages,
  newMessage,
} from "../controllers/chat-controller.js";
import {
  addEvidence,
  addParentFeedback,
  createProgressRecord,
  deleteRecord,
  getProgressRecord,
  getProgressRecordDetail,
  updateProgressRecord,
  updateSeenProgress,
} from "../controllers/progress-record.js";
import {
  addFee,
  deleteFee,
  getFeeList,
  updateFee,
} from "../controllers/fee-controller.js";
import { addSubPayment, assignPaymentToClass, getNofiticationPayment, getPaymentDetail } from "../controllers/payment-controller.js";
import {  editRemind, getRemind } from "../controllers/remind-controller.js";
// import { createChat, findChat, findUserChat } from "../controllers/chat-controller.js";
// import { createMessage, getMessage } from "../controllers/message-controller.js";

const router = express.Router();

//Admin
router.get("/", (req, res) => {
  res.send("Hello World");
});
router.post("/Adminlogin", adminLogin);

//User
router.get("/users", getUserList);

// Parent
router.post("/Parentlogin", parentLogin);
router.post("/parents/search", searchParentUser);
router.get("/parents", getParentList);
router.post("/parents", addParent);
router.put("/parents/:id", updateParent);
router.delete("/parents/:id", deleteParent);

//Teacher
router.post("/teacherlogin", teacherLogin);
router.get("/teachers", getTeacherList);
router.get("/teachers/view/:id", getDetailTeacher);
router.post("/teachers/add", addTeacher);
router.put("/teachers/edit/:id", updateTeacher);
router.delete("/teachers/delete/:id", deleteTeacher);
router.post("/teachers/search", searchTeacherUser);
//Notice
router.get("/notices", getNoticeList);
router.get("/notices/view/:id", getDetailNotice);
router.post("/notices/add", addNotice);
router.put("/notices/edit/:id", updateNotice);
router.delete("/notices/delete/:id", deleteNotice);

//Student
router.get("/students", getStudentList);
router.get("/students/class/:id", getStudentByClass);
router.get("/user/:userId/students", getStudentByUser);
router.get("/students/view/:id", getDetailStudent);
router.get("/students/total-attendance-today", getTotalAttendance);
router.post("/students/add", addStudent);
router.post("/students/:class_id/attendance", setAttendanceByClass);
router.put("/students/edit/:id", updateStudent);
router.delete("/students/delete/:id", deleteStudent);

//Classes
router.get("/classes", getClassList);
router.post("/classes/add", addClass);
router.put("/classes/edit/:id", updateClass);
router.delete("/classes/delete/:id", deleteClass);
router.get("/classes/view/:classId", getDetailClass);
router.put("/classes/schedule/:classId", addSchedule);
router.get("/classes/schedule/:classId", getSchedule);

//Group - Activity
router.post("/group_activity", addGroupActivity);
router.get("/group_activity", getAllGroupActivity);
router.put("/group_activity/:id", updateGroupActivity);
router.delete("/group_activity/:id", deleteGroupActivity);
// Activity
router.post("/group_activity/:id/activity", addActivity);
router.put("/group_activity/:id/activity/:activityId", updateActivity);
router.delete("/group_activity/:id/activity/:activityId", deleteActivity);
//Fee
router.get("/fees", getFeeList);
router.post("/fees", addFee);
router.put("/fees/:id", updateFee)
router.delete("/fees/:id", deleteFee);
//Payment
router.get("/payments/:studentId", getPaymentDetail)
router.post("/payments/assigntoclass", assignPaymentToClass)
router.post("/payments/:paymentId", addSubPayment)
router.get("/payments/nofitication/:userId", getNofiticationPayment)

//RemindFeeSetting
router.get("/remind", getRemind)
router.post("/remind", editRemind)
//Finance
// router.get("/finances", getAllFinanceRecords);
// router.get("/finances/user/:userId", getFinanceByUserId);
// router.post("/finances", addFinance);
// router.put("/finances/:id", updateFinance);
// router.delete("/finances/:id", deleteFinance);
// router.post("/payments", recordPayment);

//Chat
router.get("/conversations/:sender", getConversations);
router.get("/messages/:sender&:receiver", getMessages);
router.post("/messages", newMessage);

//Progress Record
router.get("/progress/:studentId", getProgressRecord);
router.get("/progress/record/:id", getProgressRecordDetail);
router.post("/progress/record", createProgressRecord);
router.post("/progress/record/:id/evidence", addEvidence);
router.post("/progress/record/:id/feedback", addParentFeedback);
router.put("/progress/record/:id", updateProgressRecord);
router.patch("/progress/record/:id/seen", updateSeenProgress);
router.delete("/progress/record/:id", deleteRecord);
export default router;
