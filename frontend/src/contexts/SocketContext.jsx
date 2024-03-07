import { io } from 'socket.io-client';
import { createContext } from 'react';

const socket = io();
const SocketContext = createContext();

export { socket, SocketContext };
