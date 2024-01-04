const BOARD_SIZE = 8;

class Tree {
  constructor(parent, value, combinations) {
    this.parent = parent;
    this.value = value;
    let counter = 0;
    for (const combination of combinations) {
      counter++;
      this[`branch${counter}`] = combination;
    }
  }

  createBranches(tree = this, endingSquare, queue = []) {
    if (
      tree.value[0] === endingSquare[0] &&
      tree.value[1] === endingSquare[1]
    ) {
      return tree.parent;
    }
    for (let branch = 1; branch <= 8; branch++) {
      if (tree[`branch${branch}`] === undefined) {
        break;
      }
      const parent = tree.value;
      const value = tree[`branch${branch}`];
      const combinations = findMoves(value, BOARD_SIZE);
      tree[`branch${branch}`] = new Tree(parent, value, combinations);
      // Make sure only unique values are added to the queue
      if (!isFound(queue, tree[`branch${branch}`].value)) {
        queue.push(tree[`branch${branch}`]);
      }
    }
    const parent = this.createBranches(queue.shift(), endingSquare, queue);
    return parent;
  }

  static findShortestPath(startingSquare, endingSquare) {
    let path = [];
    let square = endingSquare;
    path.push(square);
    while (true) {
      if (square[0] === startingSquare[0] && square[1] === startingSquare[1]) {
        return path;
      }
      let tree = new Tree(null, startingSquare, findMoves(startingSquare, BOARD_SIZE))
      square = tree.createBranches(tree, square);
      path.push(square);
    };
  }
}

// Create the board as an array of coordinates
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
  let moves = [];
  // Check if the combination is legal
  for (const combination of combinations) {
    let row = square[0] + combination[0];
    let column = square[1] + combination[1];
    if (row > size - 1 || row < 0 || column > size - 1 || column < 0) {
      continue;
    }
    moves.push([row, column]);
  }
  return moves;
}

// Check an array of trees for the presence of a square
function isFound(array, squareToFind) {
  if (
    array.find(
      (tree) =>
        tree.value[0] === squareToFind[0] && tree.value[1] === squareToFind[1]
    ) === undefined
  ) {
    return false;
  }
  return true;
}

function knightMoves(startingSquare, endingSquare, size) {
  let queue = findMoves(startingSquare, size);
  let visitedCombinations = [];
  let array = [];
  while (queue.length > 0) {
    if (isFound(queue, endingSquare)) {
      console.log(visitedCombinations);
      return 'done';
      // let traverseBack = endingSquare;
      // array.push(endingSquare);
      // console.log(visitedCombinations);
      // while (
      //   traverseBack[0] !== startingSquare[0] ||
      //   traverseBack[1] !== startingSquare[1]
      // ) {
      //   const combinations = findMoves(traverseBack, size);
      //   for (const combination of combinations) {
      //     if (
      //       isFound(visitedCombinations, combination) ||
      //       (combination[0] === startingSquare[0] &&
      //         combination[1] === startingSquare[1])
      //     ) {
      //       traverseBack = combination;
      //       const index = visitedCombinations.indexOf(combination);
      //       visitedCombinations.splice(index, 1);
      //       if (!isFound(array, traverseBack)) {
      //         array.push(traverseBack);
      //       }
      //       break;
      //     }
      //   }
      // }
      // queue = [];
      // return array;
    }
    const currentSquare = queue.shift();
    visitedCombinations.push(currentSquare);
    const combinations = findMoves(currentSquare, size);
    // console.log(new Node(startingSquare, currentSquare, combinations));
    for (const combination of combinations) {
      if (!isFound(queue, combination)) {
        queue.push(combination);
      }
      // queue.push(combination);
    }
  }
  return array;
}

const board = createBoard(BOARD_SIZE);
// console.log(board);
// const moves = findMoves([0, 6], BOARD_SIZE);
// console.log(moves);

const startingSquare = [0, 0];
const endingSquare = [3, 3];
console.log(Tree.findShortestPath(startingSquare, endingSquare));

// console.log(knightMoves([0, 0], [7, 7], BOARD_SIZE));
