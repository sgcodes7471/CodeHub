import express from "expresss";

const router = express.Router();

router.get('/:qid' , getComments)
router.post('/:qid/add-comment' , addComment)
router.post('/:cid/like-comment' , likeComment)
router.del('/:cid/delete-comment' , deleteQuestion)
router.put('/:cid/edit-comment', editQuestion)

export default router;