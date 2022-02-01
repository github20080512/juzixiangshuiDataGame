$(document).keydown(function (event) {
  switch (event.keyCode) {
    case 37:
      if (moveLeft()) {
        setTimeout("generateOneNumber();judgeGameOver()",200)
      }
      break;

    case 38:
      if (moveUp()) {
        setTimeout("generateOneNumber();judgeGameOver()",200)
      }
      break;
    case 39:
      if (moveRight()) {
        setTimeout("generateOneNumber();judgeGameOver()",200)
      }
      break;
    case 40:
      if (moveDown()) {
        setTimeout("generateOneNumber();judgeGameOver()",200)
      }
      break;
  }
});

function moveLeft() {
  if (!canMoveLeft(board)) {
    return false;
  }
  for (var i = 0; i < 4; i++) {
    var addJudge = true;
    for (var j = 1; j < 4; j++) {
      if (board[i][j] != 0) {
        for (var k = 0; k < j; k++) {
          if (board[i][k] == 0 && noBlokHorizontalCol(i, k, j, board)) {
            showMoveAnimation(i, j, i, k);
            board[i][k] = board[i][j];
            board[i][j] = 0;
          } else if (
            board[i][k] == board[i][j] &&
            noBlokHorizontalCol(i, k, j, board)
          ) {
            if (addJudge) {
              showMoveAnimation(i, j, i, k);
              board[i][k] += board[i][j];
              theScore+=2
              $("#score").text(theScore)
              board[i][j] = 0;
              addJudge = false;
            }
          }
        }
      }
    }
  }
  setTimeout("updateBoardView()", 200);
  return true;
}

function moveRight() {
  if (!canMoveRight(board)) {
    return false;
  }
  for (var i = 0; i < 4; i++) {
    var addJudge = true;

    for (var j = 2; j >= 0; j--) {
      if (board[i][j] != 0) {
        for (var k = 3; k > j; k--) {
          if (board[i][k] == 0 && noBlokHorizontalCol(i, j, k, board)) {
            showMoveAnimation(i, j, i, k);
            board[i][k] = board[i][j];
            board[i][j] = 0;
          } else if (
            board[i][k] == board[i][j] &&
            noBlokHorizontalCol(i, j, k, board)
          ) {
            if (addJudge) {
              showMoveAnimation(i, j, i, k);
              board[i][k] += board[i][j];
              theScore+=2
              $("#score").text(theScore)
              board[i][j] = 0;
              addJudge = false;
            }
          }
        }
      }
    }
  }
  setTimeout("updateBoardView()", 200);
  return true;
}

function moveUp() {
  if (!canMoveUp(board)) {
    return false;
  }
  for (var i = 0; i < 4; i++) {
    var addJudge = true;

    for (var j = 1; j < 4; j++) {
      if (board[j][i] != 0) {
        for (var k = 0; k < j; k++) {
          if (board[k][i] == 0 && noBlokVerticalCol(i, k, j, board)) {
            showMoveAnimation(j, i, k, i);
            board[k][i] = board[j][i];
            board[j][i] = 0;
          } else if (
            board[k][i] == board[j][i] &&
            noBlokHorizontalCol(i, k, j, board)
          ) {
            if (addJudge) {
              showMoveAnimation(j, i, k, i);

              board[k][i] += board[j][i];
              theScore+=2
              $("#score").text(theScore)
              board[j][i] = 0;
              addJudge = false;
            }
          }
        }
      }
    }
  }
  setTimeout("updateBoardView()", 200);
  return true;
}

function moveDown() {
  if (!canMoveDown(board)) {
    return false;
  }
  for (var i = 0; i < 4; i++) {
    var addJudge = true;

    for (var j = 2; j >= 0; j--) {
      if (board[j][i] != 0) {
        for (var k = 3; k > j; k--) {
          if (board[k][i] == 0 && noBlokVerticalCol(i, j, k, board)) {
            showMoveAnimation(j, i, k, i);
            board[k][i] = board[j][i];
            board[j][i] = 0;
          } else if (
            board[k][i] == board[j][i] &&
            noBlokHorizontalCol(i, j, k, board)
          ) {
            if (addJudge) {
              showMoveAnimation(j, i, k, i);
              board[k][i] += board[j][i];
              theScore+=2
              $("#score").text(theScore)
              board[j][i] = 0;
              addJudge = false;
            }
          }
        }
      }
    }
  }
  setTimeout("updateBoardView()", 200);
  return true;
}

function noBlokHorizontalCol(row, col1, col2, board) {
  for (var i = col1 + 1; i < col2; i++) {
    if (board[row][i] != 0) {
      return false;
    }
  }
  return true;
}

function noBlokVerticalCol(col, row1, row2, board) {
  for (var i = row1 + 1; i < row2; i++) {
    if (board[i][col] != 0) {
      return false;
    }
  }
  return true;
}

function judgeGameOver(){
  if(isGameOver()){
    alert("Game Over! Score: "+theScore)
  }
}
function isGameOver(){
  for(var i=0;i<4;i++){
    for(var j=0;j<4;j++){
      if(board[i][j]==0){
        return false
      }
    }
  }
  for(var i=0;i<4;i++){
    for(var j=1;j<4;j++){
      if(board[i][j-1]==board[i][j]){
        return false
      }
    }
  }
  for(var i=0;i<4;i++){
    for(var j=1;j<4;j++){
      if(board[j-1][i]==board[j][i]){
        return false
      }
    }
  }
  return true;
}