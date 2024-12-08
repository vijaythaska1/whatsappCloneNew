import express from 'express';
import http from "http";
import connectDB from './config/dbConfig.js';
import userRoutes from "./routes/userRoutes.js";
import { Server } from "socket.io";
import 'dotenv/config';
const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer, { cors: { origin: "*" } });
const port = process.env.PORT;
app.use(express.json());
app.use("/", userRoutes);
connectDB();
httpServer.listen(port, () => {
    return console.log(`Server is listening ${port}`);
});
export { app };
