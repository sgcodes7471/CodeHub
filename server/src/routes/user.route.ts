import express from "express";
import { getProfile,Logout,getNotifications,getQuestions } from "../controllers/user.controller";
const router = express.Router();

router.get('/profile' , getProfile)
router.post('/logout' , Logout)
router.get('/notifications' , getNotifications)
router.get('/my-questions' , getQuestions)

export default router;