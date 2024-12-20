import connectToDb from './config/db.config'
import express, { Application, Request, Response }  from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import { LOCALHOST_URL,DEPLOYED_URL } from './config/constants';
import authRoutes from './routes/auth.routes'
import userRoutes from './routes/user.route'
import questionRoutes from './routes/question.routes'
import commentRoutes from './routes/comment.routes'
import roomRoutes from './routes/room.route'
import dotenv from "dotenv";

dotenv.config();
const app:Application = express()

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

app.use('/api/v1/auth' , authRoutes);
app.use('/api/v1/user' , userRoutes);
app.use('/api/v1/questions' , questionRoutes);
app.use('/api/v1/comments' , commentRoutes);
app.use('/api/v1/rooms' , roomRoutes);

app.get('/ping' , (req:Request, res:Response)=>{
  res.status(200).send('PONG')
})

app.get("*" , (req: Request, res: Response)=>{
    res.status(404).send('ERROR 404!\nPage Not Found');
})

  app.listen(process.env.PORT, async () => {
      await connectToDb();
      console.log(`Server running on ${process.env.PORT}`);
  });