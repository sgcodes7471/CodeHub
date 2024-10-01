import express from 'express'
import {becomeEducator} from '../controllers/educatorController.js'

const router = express.Router()

router.get('/become-educator' , becomeEducator)


export default router