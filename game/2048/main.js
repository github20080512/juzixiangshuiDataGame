var board=new Array();
var theScore=0
$(function(){
    newgame();
})
function newgame (){
    //初始化棋盘格
    init();
    generateOneNumber() 
    generateOneNumber()

}
function init(){
    for(var i=0;i<4;i++){
        board[i]=new Array
        for(j=0;j<4;j++){
            board[i][j]=0;
            var gridCell=$("#grid-cell-"+i+"-"+j);
            gridCell.css("top",getPosTop(i,j));
            gridCell.css("left",getPosLeft(i,j));
        }
    }
    updateBoardView()
}
function  updateBoardView(){
    $(".number-cell").remove()
    for(var i=0;i<4;i++){
        for(j=0;j<4;j++){
            $("#grid-container").append("<div class='number-cell' id='number-cell-"+i+"-"+j+"'></div>")
            var numberCell=$("#number-cell-"+i+"-"+j)
            if(board[i][j]==0){
                numberCell.css("width","0px")
                numberCell.css("height","0px")
                numberCell.css("top",getPosTop(i,j)+50)
                numberCell.css("left",getPosLeft(i,j)+50)
            }else{
                numberCell.css("width","100px")
                numberCell.css("height","100px")
                numberCell.css("top",getPosTop(i,j))
                numberCell.css("left",getPosLeft(i,j))
                numberCell.css("background-color",getNumberBackgroundColor(board[i][j]))
                numberCell.css("color",getNumberColor(board[i][j]))
                numberCell.text(board[i][j])

            }
            
        }
    }
}

function generateOneNumber(){
    var randX = parseInt(Math.floor(Math.random()*4))
    var randY = parseInt(Math.floor(Math.random()*4))
    while(true){
        if(board[randX][randY] == 0){
            break;
        }
        var randX = parseInt(Math.floor(Math.random()*4))
        var randY = parseInt(Math.floor(Math.random()*4))
       


    }
    var randNumber=Math.random()<0.8?2:4;
    board[randX][randY]=randNumber
    showNumberWithAnimation(randX,randY,randNumber)
}