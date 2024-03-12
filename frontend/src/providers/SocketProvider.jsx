import { io } from 'socket.io-client';
import SocketContext from '../contexts/SocketContext';

const SocketProvider = ({ children }) => {
  const socket = io();
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export default SocketProvider;
