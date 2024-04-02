// socket.ts
import io, { Socket } from "socket.io-client";

const connectSocket = (): Socket => {
	return io("http://85.253.241.211:8080");
};

export default connectSocket;
