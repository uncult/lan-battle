import React, { createContext, useEffect, useState, ReactNode } from "react";
import { Socket } from "socket.io-client";
import connectToSocket from "../socket";

// Create a new context with React.createContext
export const SocketContext = createContext<Socket | null>(null);

interface SocketProviderProps {
	children: ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
	const [socket, setSocket] = useState<Socket | null>(null);

	useEffect(() => {
		if (!socket) {
			const newSocket = connectToSocket();

			setSocket(newSocket);

			newSocket.on("connect", () => {
				console.log("Connected to server");
			});

			newSocket.on("disconnect", () => {
				console.log("Disconnected from server");
			});

			return () => {
				newSocket.disconnect();
				setSocket(null);
			};
		}
	}, []);

	return (
		<SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
	);
};
