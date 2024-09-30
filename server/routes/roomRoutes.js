import express from "expresss";

const router = express.Router();

router.get('/' , getMyRooms)
router.get('/:rid' , getChats);
router.post('/create-room' , createRoom)
router.post('/:rid/join-room-request' , joinRoomRequest)
router.post('/:rid/room-requests' , getRoomRequest)
router.post('/:rid/:id/handle-room-request' , handleRoomRequest)
router.post('/:rid/leave-room' , leaveRoom)
router.get('/search-room/key?' , searchRoom)
router.delete('/:rid/delete-room' , deleteRoom)
router.get('/:rid/get-participants' , getParticipants)
router.post('/:rid/:id/remove-participant' , removeParticipant)

export default router;