import express from "express";
import adminLogin from "../controllers/admin-controller.js"
import parentLogin from "../controllers/parent-controller.js"


const router = express.Router();

router.post("/Adminlogin", adminLogin)


router.post("/Parentlogin", parentLogin)

export default router;