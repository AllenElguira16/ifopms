import app from '../App/bootstrap';
// import http from 'http';
import socketjs from 'socket.io';

const io = socketjs(3000);


io.on('connection', (socket) =>  {
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