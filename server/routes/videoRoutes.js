import express from 'express'

const router = express.Router()

router.post('/:cid/add-video' , addVideo)
router.get('/:vid' , getVideoById)
router.get('/:cid/videos' , getVideoByCourse)
router.post('/:vid/like-video' , likeVideo)


export default router