import http from 'http'
import express from 'express'
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectToDb from './config/db.config';
import dotenv from "dotenv";
import { LOCALHOST_URL,DEPLOYED_URL } from './config/constants';
import SocketService from './config/socket.config';

dotenv.config();
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

app.listen(process.env.PORT, async () => {
    await connectToDb();
    console.log(`Server running on ${process.env.PORT}`);
});

socketService.init();