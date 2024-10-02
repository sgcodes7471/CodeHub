import express from "expresss";
import {getQuestions , getQuestionById , addQuestion , likeQuestion , bookmarkQuestion , deleteQuestion , editQuestion , searchQuestion } from '../controllers/questionController.js'

const router = express.Router();

router.get('/:page' , getQuestions)
router.get('/:qid' , getQuestionById);
router.post('/add-question' , addQuestion)
router.post('/:qid/like-question' , likeQuestion)
router.post('/:qid/bookmark-question',bookmarkQuestion)
router.del('/:qid/delete-question' , deleteQuestion)
router.put('/:qid/edit-question', editQuestion)
router.post('/search-question/key?' , searchQuestion)

export default router;