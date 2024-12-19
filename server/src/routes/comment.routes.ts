import express from "express";
import {getComments , deleteComment} from '../controllers/comment.controller'
const router = express.Router();

router.get('/:qid' , getComments)
router.delete('/:cid' , deleteComment)

export default router;