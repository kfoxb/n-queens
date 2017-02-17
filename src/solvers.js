/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  var board = new Board({n: n});
  var matrix = board.rows();
  var pieceCounter = 0;
  for (var i = 0; i < matrix.length; i++) {
    var row = matrix[i];
    for (var j = 0; j < row.length; j++) {
      board.togglePiece(i, j);
      pieceCounter++;
      if (board.hasAnyRooksConflicts()) {
        board.togglePiece(i, j);
        pieceCounter--;
      } else if (pieceCounter === n) {
        break;
      }
    }
  }
  var solution = matrix;
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({n: n});

  var recursiveRows = function(board, rowsDone) {
    rowsDone = rowsDone || 0;
    if (rowsDone === n) {
      solutionCount++;
      return;
    }

    for (var i = 0; i < n; i++) {
      board.togglePiece(rowsDone, i); 
      if (!board.hasAnyRooksConflicts(rowsDone, i)) {
        recursiveRows(board, rowsDone + 1);
      }
      board.togglePiece(rowsDone, i);
    }
  };

  recursiveRows(board, 0);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solutionCount = 0;
  var board = new Board({n: n});

  var recursiveRows = function(innerBoard, rowsToGo) {
    if (rowsToGo === 0) {
      return board.rows();
    }

    for (var i = 0; i < n; i++) {
      innerBoard.togglePiece(n - rowsToGo, i); 
      if (!innerBoard.hasAnyQueensConflicts(n - rowsToGo, i)) {
        var solutionBoard = recursiveRows(innerBoard, rowsToGo - 1); 
        if (solutionBoard) {
          return solutionBoard;
        }
      }
      innerBoard.togglePiece(n - rowsToGo, i);

    }
  };

  var solution = recursiveRows(board, n);
  if (solution === undefined) {
    return board.rows();
  }
  console.log('Number of solutions for ' + n + ' queens:', solution);
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({n: n});
  var matrix = board.rows();
  var rowsNumber = n;

  var recursiveRows = function(innerBoard, rowsToGo) {
    if (rowsToGo === 0) {
      solutionCount++;
      return;
    }

    for (var i = 0; i < n; i++) {
      innerBoard.togglePiece(n - rowsToGo, i); 
      if (!innerBoard.hasAnyQueensConflicts(n - rowsToGo, i)) {
        console.log(matrix);
        recursiveRows(innerBoard, rowsToGo - 1);

      }
      innerBoard.togglePiece(n - rowsToGo, i);

    }
  };

  recursiveRows(board, n);

  // console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
