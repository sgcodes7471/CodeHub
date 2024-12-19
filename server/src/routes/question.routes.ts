import express from "express";
import { getQuestions,getQuestionById,deleteQuestion,searchQuestion } from "../controllers/question.controller";
const router = express.Router();

router.get('/:page' , getQuestions);
router.get('/:qid/i?' , getQuestionById);
router.delete('/:qid' , deleteQuestion);
router.get('/search-question/key?' , searchQuestion);

export default router;