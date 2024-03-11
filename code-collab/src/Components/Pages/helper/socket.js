import { io } from "socket.io-client";

export const initSocket = async () => {
  // Connect to the backend using socket.io-client
  const options = {
    "force new connection": true,
    "reconnectionAttempts": 1, // Use a number for infinite reconnection attempts
    "timeout": 10000,
    "transports": ["websocket"]
  };

  try {
    const socket = io("http://localhost:5000", options);
    return socket;
  } catch (error) {
    // Handle connection error
    console.error("Socket connection error:", error);
    throw error;
  }
};
