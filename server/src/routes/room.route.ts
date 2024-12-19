import express from "express";
import {getMyRooms,getChats,searchRoom,deleteRoom} from '../controllers/room.controller'
const router = express.Router();

router.get('/' , getMyRooms);
router.get('/:rid' , getChats);
router.get('/search-room/name?' , searchRoom);
router.delete('/:rid/delete-room' , deleteRoom);

export default router;