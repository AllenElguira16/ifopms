import app from '../App/bootstrap';
import socket from 'socket.io';

const io = socket(app);

console.log('Socket.IO Connected Successfully');

io.on('connection', function (socket) {
  socket.on('newPortfolio', () => {
    io.emit('newPortfolio');
  });
  socket.on('newComment', () => {
    io.emit('newComment');
  });
  socket.on('updateLike', () => {
    io.emit('updateLike');
  });
  socket.on('loadPortfolio', (file) => {
    io.emit('loadPortfolio', file);
  });
  socket.on('newMessage', () => {
    io.emit('newMessage');
  });
  socket.on('openMsg', () => {
    io.emit('openMsg');
  });
});

const PORT = 8000;

app.start(PORT);