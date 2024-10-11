import {Pool} from 'pg'
import data from './server_config'

const pool = new Pool({
    user:'avnadmin',
    host:data.POSTGRES_AIVEN_HOST,
    database:'defaultdb',
    password:data.POSTGRES_AIVEN_PASSWORD,
    port:data.POSTGRES_AIVEN_PASSWORD
})

export async function saveChats(chatMessage) {
    const {roomId , senderId , username , message , timeSent} = chatMessage
    await pool.query('INSERT INTO chats (room_id, sender_id, username, message, time_sent) VALUES ($1, $2, $3, $4, $5)' , 
    [roomId, senderId, username, message, timeSent])
}

//Thinkin of adding a postgres to this, started with the sake of distributed db but now need some solid reasons to work with it!

export default pool