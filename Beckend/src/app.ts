import express from 'express';
import http from "http"
import connectDB from './config/dbConfig.js';
import userRoutes from "./routes/userRoutes.js";
import validation from "./utils/validation.js";
import { Server } from "socket.io";
import morgan from 'morgan';
import 'dotenv/config';
const app = express();
const httpServer = http.createServer(app)
const io = new Server(httpServer, { cors: { origin: "*" } });
const port = process.env.PORT;

app.use(express.json());
app.use(morgan('dev'));
app.use("/", userRoutes)
connectDB();
app.use(validation.catchServerError)
httpServer.listen(port, () => {
  return console.log(`Server is listening ${port}`);
});


export { app };






