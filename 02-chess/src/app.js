import config from './config';
import $ from 'jquery';
import ChessBoard from 'chessboardjs';
import io from 'socket.io-client';
import Chess from 'chess.js'

window.$ = $;

const socket = io(config.SERVER_URL);

const chessConfig = {
  draggable: true,
  position: 'start',
  onDrop: handleMove
};

const chess = new Chess.Chess();
const board = ChessBoard('board', chessConfig);

socket.on('game created', (data) => {
  alert('Game ID: ' + data.game.id);
  setGameID(data.game.id);
});

socket.on('move', (data) => {
  chess.move(data.move);
  board.position(chess.fen());
});

socket.on('game joined', (data) => {
  board.position(data.game.fen);
});

socket.on('restart', () => {
  board.start(true);
});

$('.js-link-new-game').on('click', () => {
  socket.emit('new game');
  return false;
});

$('.js-link-join-game').on('click', () => {
  const gameID = prompt('Please enter game ID to join');
  socket.emit('join game', {
    game: gameID
  });
  setGameID(gameID);
  return false;
});

$('.js-link-restart').on('click', () => {
  socket.emit('restart');
  board.start(true);
  return false;
});

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

function renderGameID() {
  const gameID = window.localStorage.getItem('game-id');
  $('.js-game-id').text(gameID);
  if(gameID) {
    socket.emit('join game', {
      game: gameID
    });
  }
}
renderGameID();

function setGameID(id) {
  window.localStorage.setItem('game-id', id);
  renderGameID();
}
