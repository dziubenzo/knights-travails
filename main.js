const BOARD_SIZE = 8;

// Create the board as an array of coordinates
// Default board size is 8 x 8
function createBoard(size) {
  let array = [];
  let row = 0;
  let column = 0;
  while (array.length < size * size) {
    array.push([row, column]);
    if (column === size - 1) {
      column = 0;
      row++;
    } else {
      column++;
    }
  }
  return array;
}

// Find out legal knight moves for a given square
function findMoves(square, size) {
  // Establish all possible combinations clockwise
  const combinations = [
    [2, 1],
    [1, 2],
    [-1, 2],
    [-2, 1],
    [-2, -1],
    [-1, -2],
    [1, -2],
    [2, -1],
  ];
  let row = square[0];
  let column = square[1];
  let moves = [];
  // Check if the combination is legal
  for (let combination of combinations) {
    row += combination[0];
    column += combination[1];
    if (row > size - 1 || row < 0 || column > size - 1 || column < 0) {
      continue;
    } else {
      moves.push([row, column]);
    }
    row = square[0];
    column = square[1];
  }
  return moves;
}

// Create an array with moves for all squares
function findAllMoves(board, size) {
  let allMoves = [];
  for (square of board) {
    allMoves.push(findMoves([square[0], square[1]], size));
  }
  return allMoves;
}

// Check an array of moves for the presence of the ending square
function isFound(array, endingSquare) {
  if (
    array.find(
      (square) => square[0] === endingSquare[0] && square[1] === endingSquare[1]
    ) === undefined
  ) {
    return false;
  }
  return true;
}

function knightMoves(startingSquare, endingSquare, size) {
  let moves = 0;
  let queue = findMoves(startingSquare, size);
  while (queue.length > 0) {
    const currentSquare = queue.shift();
    console.log(currentSquare);
    const combinations = findMoves(currentSquare, size);
    for (const combination of combinations) {
      queue.push(combination);
    }
    if (isFound(queue, endingSquare)) {
      console.log('Got ya!');
      break;
    }
  }
}

const board = createBoard(BOARD_SIZE);
// console.log(board);
// const allMoves = findAllMoves(board, BOARD_SIZE);
const found = board.find((square) => square[0] === 7 && square[1] === 1);

knightMoves([0, 0], [7, 7], BOARD_SIZE);
