import { Server, Socket } from "socket.io";
import { NextFunction } from "express";
import controllers from "./controller.js";

export default (io: Server) => {
    io.use((socket, next) => controllers.authConnection(io, socket, next as NextFunction));
    io.on("connection", (socket) => {
        //  controllers.handdleDuplicateConnection(io, socket);
        controllers.handdleUserConnect(io, socket);
    })
}