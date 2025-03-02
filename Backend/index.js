//backend/index.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import morgan from 'morgan';
import { AuthRoutes } from './routes/AuthRoutes.js';
import { ContactRoutes } from './routes/ContactRoutes.js';
import { MessageRoutes } from './routes/MessageRoutes.js';
import { ChannelRoutes } from './routes/ChannelRoutes.js';
import { setupSocket } from './socket.js';
dotenv.config();
const app = express();
const port = process.env.PORT || 8081;
const databaseURL = process.env.DATABASE_URL;

const database = async() => {
    try {
        await mongoose.connect(databaseURL,{
            serverSelectionTimeoutMS: 10000,
        });
        console.log("Database Connected!");
    } catch (error) {
        console.log("Database Connection Error : ",error);
    }
}
database();

app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["GET","POST","PUT","PATCH","DELETE"],
    credentials: true,
}));
app.use("/uploads/profiles",express.static("uploads/profiles"));
app.use("/uploads/files",express.static("uploads/files"));
app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/api/auth',AuthRoutes);
app.use('/api/contacts',ContactRoutes);
app.use('/api/messages',MessageRoutes);
app.use('/api/channels',ChannelRoutes);
app.get("/",(req, res) => {
    res.json({ msg: "Backend Server Connected Successfully!"})
});

const server = app.listen(port,()=>{
     console.log(`Server Is Running At http://localhost:${port}`);
})

setupSocket(server);