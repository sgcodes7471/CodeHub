import express from 'express'
import {addVideo , getVideoById , getVideoByCourse } from '../controllers/videoContoller.js'

const router = express.Router()

router.post('/:cid/add-video' , addVideo)
router.get('/:vid' , getVideoById)
router.get('/:cid/videos' , getVideoByCourse)

export default router