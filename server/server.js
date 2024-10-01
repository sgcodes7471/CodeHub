import connectToDb from './config/db_config.js'
import data from "./config/server_config.js";
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import questionRoutes from './routes/questionRoutes.js'
import commentRoutes from './routes/commentRoutes.js'
import roomRoutes from './routes/roomRoutes.js'
import educatorRoutes from './routes/educatorRoutes.js'
import courseRoutes from './routes/courseRoutes.js'
import videoRouters from './routes/videoRoutes.js'

const app = express()

app.use(
    cors({
      origin: "*",
      credentials: true,
    }),
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(cookieParser());

app.get("/check", (req, res) => {
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

app.listen(data.PORT, async () => {
    await connectToDb();
    console.log(`Server is running on ${data.PORT}`);
});

//flow of work:
//30-all routes part and declaring the controllers
//1-all models and half-of controllers(auth , user, question, comment)
//2-rest of controllers(till chatroom)
//3-code compiler
//4-frontend start