import controllers from "./controller.js";
export default (io) => {
    io.use((socket, next) => controllers.authConnection(io, socket, next));
    io.on("connection", (socket) => {
        //  controllers.handdleDuplicateConnection(io, socket);
        controllers.handdleUserConnect(io, socket);
    });
};
