import { io } from "socket.io-client";

export const initSocket = async () => {
  // Connect to the backend using socket.io-client
  const options = {
    'force new connection': true,
    'reconnectionAttempts': 'Infinity', // Use a number for infinite reconnection attempts
    'timeout': 10000,
    'transports': ['websocket']
  };

  return io("http://localhost:5000", options);
};
