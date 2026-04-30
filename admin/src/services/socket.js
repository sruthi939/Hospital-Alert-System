import { io } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:5000';

let socket;

export const initiateSocketConnection = () => {
  socket = io(SOCKET_URL);
  console.log(`Connecting socket...`);
};

export const disconnectSocket = () => {
  console.log('Disconnecting socket...');
  if (socket) socket.disconnect();
};

export const subscribeToAlerts = (cb) => {
  if (!socket) return(true);
  socket.on('new_alert', (alert) => {
    console.log('New alert received via socket:', alert);
    return cb(null, alert);
  });
  
  socket.on('alert_updated', (alert) => {
    console.log('Alert updated via socket:', alert);
    return cb(null, alert);
  });
};

export const joinAdminRoom = () => {
  if (socket) socket.emit('join_room', 'admin');
};
