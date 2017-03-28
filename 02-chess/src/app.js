import config from './config';
import $ from 'jquery';
import ChessBoard from 'chessboardjs';
import io from 'socket.io-client';
import Chess from 'chess.js'

window.$ = $;

const socket = io(config.SERVER_URL);

function handleMove(from, to, piece, position) {
  const move = chess.move({
    from: from,
    to: to,
    piece: piece,
    position: position
  });
  if(move === null) {
    return 'snapback';
  }else{
    socket.emit('move', { move: move.san });
  }
};

const chessConfig = {
  draggable: true,
  position: 'start',
  onDrop: handleMove
};

const chess = new Chess.Chess();
const board = ChessBoard('board', chessConfig);

// socket.emit('new game');
socket.emit('join game', {
  game: '0mbsyu7a'
});

socket.on('game created', (data) => {
  console.log('game created', data);
});

socket.on('move', function(data) {
  console.log('move', data);
  chess.move(data.move);
  board.position(chess.fen());
});

socket.on('game joined', function(data) {
  console.log('game joined', data);
  board.position(data.game.fen);
});
