import connectToDb from './config/db_config.js'
import data from "./config/server_config.js";
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from 'http'
import { LOCALHOST_URL , DEPLOYED_URL } from './constants.js';
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import questionRoutes from './routes/questionRoutes.js'
import commentRoutes from './routes/commentRoutes.js'
import roomRoutes from './routes/roomRoutes.js'
import educatorRoutes from './routes/educatorRoutes.js'
import courseRoutes from './routes/courseRoutes.js'
import videoRouters from './routes/videoRoutes.js'
import SocketService from './socket/socket.js';

const app = express()

const server = http.createServer(app);
const socketService = new SocketService()
const io = socketService.io
io.attach(server)

app.use(
    cors({
      origin: [LOCALHOST_URL, DEPLOYED_URL],
      credentials: true,
    }),
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(cookieParser());

app.get("/check/:value", (req, res) => {
    return res.json({ message: "server is alive" });
});

app.use('/auth' , authRoutes)
app.use('/user' , userRoutes)
app.use('/question' , questionRoutes);
app.use('/comment' , commentRoutes);
app.use('/room', roomRoutes)
app.use('/educator' , educatorRoutes);
app.use('/course' , courseRoutes);
app.use('/video' , videoRouters);

app.get("*" , (req, res)=>{
  return res.status(404).send('ERROR 404!\nPage Not Found')
})

app.listen(data.PORT, async () => {
    await connectToDb();
    console.log(`Server running on ${data.PORT}`);
});

//flow of work:
//30-all routes part and declaring the controllers
//1-all models and half-of controllers(auth , user, question, comment)
//2-rest of controllers(till chatroom)
//3-code compiler
//4-frontend start