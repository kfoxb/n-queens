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

  var pieceCounter = 0;
  var firstPosition = [0, 0];
  var firstToggled = false;

  for (var i = 0; i < board.rows().length; i++) {
    for (var j = 0; j < board.rows().length; j++) {
      board.togglePiece(i, j);
      pieceCounter++;

      if (firstToggled === false) {
        firstPosition[0] = i;
        firstPosition[1] = j;
      }
      firstToggled = true; 

      if (board.hasAnyRooksConflicts()) {
        board.togglePiece(i, j);
        pieceCounter--;
      } else if (pieceCounter === n) {
        // if ( n === 3 ) {debugger;}
        solutionCount++;
        board.togglePiece(i, j);
        pieceCounter--;
      }

      if (j === board.rows()[i].length - 1 && i === board.rows().length - 1) {
        board = new Board({n: n});
        firstToggled = false;
        pieceCounter = 0;
        i = firstPosition[0];
        j = firstPosition[1];        
      }
    }
  }

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
