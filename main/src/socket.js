

// src/socket.js
import { io } from "socket.io-client";

export const socket = io("http://194.238.18.1:3004", {
  transports: ["websocket"],
  withCredentials: true,
});
