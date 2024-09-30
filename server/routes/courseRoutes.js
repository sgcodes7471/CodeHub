import express from 'express'

const router = express.Router()

router.post('/add-course' , addCourse)
router.edit('/:cid/edit-course' , editCourse)
router.get('/:cid' , getCourseById)
router.get('/purchased-courses' , getPurchasedCourses)
router.get('/my-courses' , getMyCourses)
router.get('/:cid/review-course' , reviewCourse)
router.get('/:cid/buy-course' , buyCourse)
router.get('/search-course/key?' , searchCourse)

export default router