import express from 'express'
import {addCourse , editCourse , getCourseById , getPurchasedCourses , getMyCourses , reviewCourse , buyCourse , searchCourse} from '../controllers/courseController.js'

const router = express.Router()

router.post('/add-course' , addCourse)
router.put('/:cid/edit-course' , editCourse)
router.get('/:cid' , getCourseById)
router.get('/purchased-courses' , getPurchasedCourses)
router.get('/my-courses' , getMyCourses)
router.get('/:cid/review-course' , reviewCourse)
router.get('/:cid/buy-course' , buyCourse)
router.get('/search-course/key?' , searchCourse)

export default router