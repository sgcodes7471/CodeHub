import express from "express";
import { Login,SignUp,verifyEmail,GetOtp, PostOtp,ResetPassword,RefreshToken } from "../controllers/auth.controller";
const router = express.Router();

router.post('/login' , Login);
router.post('/signup' , SignUp);
router.post('/verify-email' , verifyEmail);
router.get('/forgot-password' , GetOtp);
router.post('/forgot-password' , PostOtp);
router.post('/reset-password' , ResetPassword);
router.get('/:id/refresh-token' , RefreshToken);

export default router;