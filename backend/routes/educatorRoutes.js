import express from 'express'
import {becomeEducator , getEducatorById , getTopEducators} from '../controllers/educatorController.js'

const router = express.Router()

router.post('/' , becomeEducator)
router.get('/:eid' , getEducatorById)
router.get('/top-educators' , getTopEducators)


export default router