import "reflect-metadata";
import express from "express";
import { createServer } from "http";
import cors from "cors";
import fileUpload from "express-fileupload";
import path from "path";
import { Server } from "socket.io";
import {Socket} from './socket'

import AuthRoutes from './routes/auth.routes'
import PlaylistRoutes from './routes/playlist.routes'
import ReportRoutes from './routes/report.routes'
import SubscriptionRoutes from './routes/subscription.routes'
import UserRoutes from './routes/user.routes'
import VideoRoutes from './routes/video.routes'
import ChatRoutes from './routes/chat.routes'

const app = express();

app.use(express.json());
app.use(cors());
app.use(fileUpload());
app.use(express.static(path.resolve(__dirname + "/public")));

app.use("/api", AuthRoutes)
app.use("/api/playlist", PlaylistRoutes)
app.use("/api/report", ReportRoutes)
app.use("/api/subscription", SubscriptionRoutes)
app.use("/api/user", UserRoutes)
app.use("/api/video", VideoRoutes)
app.use("/api/chat", ChatRoutes)

const httpServer = createServer(app)

const io = new Server(httpServer, {
    cors: {
        origin: '*'
    }
})

Socket(io)

export default httpServer;
