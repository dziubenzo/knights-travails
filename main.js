// Global constant for setting grid size
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

  // Find the parent of endingSquare through creating a recursive BFS tree
  // I haven't been able to return all parents up to startingSquare (used an additional method for that), but I think this is possible
  findParent(tree, endingSquare, queue = []) {
    // Base case: the value property of the currently explored tree is equal to endingSquare
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
      const combinations = findMoves(value);
      tree[`branch${branch}`] = new Tree(parent, value, combinations);
      // Make sure only unique values are added to the queue (no need to explore identical trees over and over again)
      // This has a HUGE impact on queue size
      if (!isFound(queue, tree[`branch${branch}`].value)) {
        queue.push(tree[`branch${branch}`]);
      }
    }
    return this.findParent(queue.shift(), endingSquare, queue);
  }

  // Find all squares between startingSquare and endingSquare by calling the findParent() method until it returns startingSquare
  // Return an array of moves in the correct order
  static findShortestPath(startingSquare, endingSquare) {
    let path = [];
    let square = endingSquare;
    while (true) {
      path.push(square);
      if (square[0] === startingSquare[0] && square[1] === startingSquare[1]) {
        return path.reverse();
      }
      let tree = new Tree(null, startingSquare, findMoves(startingSquare));
      square = tree.findParent(tree, square);
    }
  }
}

// Find out legal knight moves for a given square
function findMoves(square) {
  // Establish all possible combinations clockwise
  // Changing the order below is what I believe leads to discovering other shortest paths
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
    if (
      row > BOARD_SIZE - 1 ||
      row < 0 ||
      column > BOARD_SIZE - 1 ||
      column < 0
    ) {
      continue;
    }
    moves.push([row, column]);
  }
  return moves;
}

// Check a queue of trees for the presence of a square
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

function knightMoves(startingSquare, endingSquare) {
  const moves = Tree.findShortestPath(startingSquare, endingSquare);
  if (moves.length - 1 === 0) {
    console.log(
      'Starting square is the same as ending square. No moves required!'
    );
    return;
  }
  console.log(`Done! It took ${moves.length - 1} moves.`);
  console.log('The path goes like this:');
  for (const move of moves) {
    console.log(move);
  }
}

knightMoves([0, 0], [7, 7]);
