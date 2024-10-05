import express from "express";
import {Login , Signup , verifyEmail , getOtp , postOtp , resetPassword} from '../controllers/authController.js'

const router = express.Router();

router.post('/login' , Login);
router.post('/signup' , Signup);
router.post('/verify-email' , verifyEmail);
router.get('/forgot-password' , getOtp);
router.post('/forgot-password' , postOtp);
router.post('/reset-password' , resetPassword);

export default router;