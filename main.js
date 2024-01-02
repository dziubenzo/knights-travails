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
      console.log(`The combination [${row}, ${column}] is illegal!`);
    } else {
      moves.push([row, column]);
    }
    row = square[0];
    column = square[1];
  }
  return moves;
}

const board = createBoard(BOARD_SIZE);
console.log(findMoves([0, 0], BOARD_SIZE));
