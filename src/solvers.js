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
  var counter = 0;
  for (var i = 0; i < matrix.length; i++) {
    var row = matrix[i];
    for (var j = 0; j < row.length; j++) {
      board.togglePiece(i, j);
      counter++;
      if (board.hasAnyRooksConflicts()) {
        board.togglePiece(i, j);
        counter--;
      } else if (counter === n) {
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
  var first = 0;

  var counter = 0;
  var firstPosition = [0, 0];

  for (var i = 0; i < board.rows().length; i++) {
    for (var j = 0; j < board.rows().length; j++) {
      board.togglePiece(i, j);
      first++;
      if (first === 1) {
        firstPosition[0] = i;
        firstPosition[1] = j;
      }
      counter++;

      if (board.hasAnyRooksConflicts()) {
        board.togglePiece(i, j);
        counter--;
      } else if (counter === n) {
        solutionCount++;
        board.togglePiece(i, j);
      }

      if (j === board.rows()[i].length - 1 && i === board.rows().length - 1) {
        board = new Board({n: n});

        first = 0;
        firstPosition[0]++;
        firstPosition[1]++;
        i = firstPosition[0];
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
