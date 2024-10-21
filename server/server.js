import connectToDb from './config/db_config.js'
import data from "./config/server_config.js";
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import path from 'path';
import fs from 'fs'
import { exec } from 'child_process';
import { stdout, stderr } from 'process';
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
import { consumeChat } from './config/kafka_config.js';
import upload from './middlewares/multerMiddleware.js';

const app = express()

consumeChat()
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
app.use("/uploads" , express.static("uploads"))

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

import {v4 as uuidv4} from "uuid"
app.post("/upload" , upload.single('file') , function(req, res){
  //first upload the file in cloud and get the link
  const id = uuidv4()
  const videoPath = req.file.path
  //we are storing it in local files now but in production it is stored in some cloud like Lambda or Bucket
  const outputPath = `./uploads/${id}`
  const hlsPath = `${outputPath}/index.m3u8`
  console.log("hlsPath" , hlsPath)

  if(!fs.existsSync(outputPath))
    fs.mkdirSync(outputPath , {recursive:true})
  
  const ffmpegCommand = `ffmpeg -i ${videoPath} -codex:v
  libx264 -codec:a aac -hls_time 10 -hls_playlist_type 
  vod -hls_segment_filename "${outputPath}/segment%03d. ts"
  -start_number 0 ${hlsPath}`

  //no queue still now. We need to use it in production
  exec(ffmpegCommand , (error , stdout , stderr)=>{
    if(error) console.log(`exec erorr:${error}`)
    console.log(`stdout:${stdout}`)
    console.log(`stderr:${stderr}`)
    const videoUrl = `http://localhost:8000/uploads/${id}.index.m3u8`
    //store this videoUrl in database
    res.json({
      videoUrl:videoUrl,
      id:id
    })

  })

})

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