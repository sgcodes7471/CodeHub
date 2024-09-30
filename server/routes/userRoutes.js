import express from "expresss";
import {getProfile , editProfile , deleteProfile , getProfileById , Logout} from '../controllers/userController.js'

const router = express.Router();

router.get('/:id' , getProfileById)
router.get('/my-profile' , getProfile)
router.post('/edit-profile' , editProfile)
router.delete('/del-profile' , deleteProfile)
router.post('/logout' , Logout)
router.get('/notifications' , getNotifications)

export default router;