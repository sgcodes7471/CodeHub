import express from "expresss";
import {getComments , addComment , likeComment , deleteComment , editComment} from '../controllers/commentController.js'

const router = express.Router();

router.get('/:qid' , getComments)
router.post('/:qid/add-comment' , addComment)
router.post('/:cid/like-comment' , likeComment)
router.del('/:cid/delete-comment' , deleteComment)
router.put('/:cid/edit-comment', editComment)

export default router;