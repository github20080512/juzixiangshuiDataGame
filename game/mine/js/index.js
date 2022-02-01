function Mine(tr, td, mineNum) {
  this.tr = tr;
  this.td = td;
  this.clickedTotal=tr*td-mineNum;
  this.mineNum = mineNum;
  this.squares = []; //存放方块信息的二维数组
  this.tds = []; //存储所有单元格的dom
  this.surplusMine = mineNum;
  this.allright = 0; //右击标的是否全是雷
  this.parent = document.querySelector(".gameBox");
  this.clickTd=0
}
Mine.prototype.createDom = function () {
  var THIS = this;
  var table = document.createElement("table");
  for (var i = 0; i < this.tr; i++) {
    var domTr = document.createElement("tr");
    this.tds[i] = [];
    for (var j = 0; j < this.td; j++) {
      var domTd = document.createElement("td");

      domTd.pos = [i, j];
      domTd.onmousedown = function (event) {
      
        THIS.play(event, this);
      };
      this.tds[i][j] = domTd;
      // if(this.squares[i][j].type=="mine"){
      //     domTd.className="mine"
      // }
      // if(this.squares[i][j].type=="number"){
      //     domTd.innerHTML=this.squares[i][j].value
      // }
      domTr.appendChild(domTd);
    }
    // console.log(domTr)
    table.appendChild(domTr);
  }
  // console.log(this.tds)
  this.parent.innerHTML = "";
  this.parent.appendChild(table);
};

Mine.prototype.randomNum = function () {
  var square = new Array(this.tr * this.td);
  for (var i = 0; i < square.length; i++) {
    square[i] = i;
  }
  square.sort(function () {
    return 0.5 - Math.random();
  });
  return square.slice(0, this.mineNum);
};

Mine.prototype.init = function () {
  var rn = this.randomNum(); //雷的信息
  var n = 0;
  //console.log(rn)
  for (var i = 0; i < this.tr; i++) {
    this.squares[i] = [];
    for (var j = 0; j < this.td; j++) {
      if (rn.indexOf(++n) != -1) {
        //这个索引 n 对应的是个雷
        /*
                x:j,y:i  坐标 2,1  = 第i行第j列
               0   0 1 2 3 4 
               1   0 1 2 3 4
               2   0 1 2 3 4
                
                
                
                
                */
        this.squares[i][j] = { type: "mine", x: j, y: i };
      } else {
        this.squares[i][j] = { type: "number", x: j, y: i, value: 0 };
      }
    }
  }
  //  console.log( this.squares)

  this.parent.oncontextmenu = function () {
    return false;
  };
  this.mineNumDom = document.querySelector(".mineNum");
  this.mineNumDom.innerHTML = this.surplusMine;
  this.updateNum();
  this.createDom();
};

Mine.prototype.getAround = function (square) {
  var x = square.x;
  var y = square.y;
  var result = [];
  /*
          x-1,y-1   x,y-1      x+1,y-1
          x-1,y     x,y        x+1,y 
          x-1,y+1   x,y+1      x+1,y+1    
    */
  /*
          type: "mine", x: 14, y: 0}
          x-1,y-1   x,y-1      x+1,y-1
          13,0    14,0      15,0
          13,1    14,1      15,1    
    */
  for (var i = x - 1; i <= x + 1; i++) {
    for (var j = y - 1; j <= y + 1; j++) {
      if (
        i < 0 || //格子超出了左边的范围
        j < 0 || //格子超出了上边的范围
        i > this.td - 1 || //格子超出了右边的范围
        j > this.tr - 1 || //格子超出了下边的范围
        (i == x && j == y) || //格子等于自己
        this.squares[j][i].type == "mine" //格子是个雷
      ) {
        continue;
      }
      result.push([j, i]);
    }
  }
  //    console.log(result)
  return result;
};
Mine.prototype.updateNum = function () {
  for (var i = 0; i < this.tr; i++) {
    for (var j = 0; j < this.td; j++) {
      if (this.squares[i][j].type == "number") {
        continue;
      }
      var num = this.getAround(this.squares[i][j]); //获取每个雷周围的数字
      for (var k = 0; k < num.length; k++) {
        this.squares[num[k][0]][num[k][1]].value += 1;
      }
    }
  }
};

Mine.prototype.play = function (ev, obj) {
  var This = this;
  if (ev.which == 1) {
    //
    if(obj.check){
      console.log("dianjile")
      return
    }
    var curSquare = this.squares[obj.pos[0]][obj.pos[1]];
    var cl = [
      "zero",
      "one",
      "two",
      "three",
      "four",
      "five",
      "six",
      "seven",
      "eight",
    ];
    if (curSquare.type == "number") {
    
      obj.className = cl[curSquare.value];
      obj.check=true;
      if (curSquare.value == 0) {
        /*
            用户点到数字0
                1展示自己
                2找四周
                    用户点到非0数字，展示到这里
                    用户点到0
                        1展示自己
                        2找四周

            */
        obj.innerHTML = "";
        function getAllZero(square) {
          var around = This.getAround(square);
          for (var i = 0; i < around.length; i++) {
            var x = around[i][0];
            var y = around[i][1];

            This.tds[x][y].className = cl[This.squares[x][y].value];
            if (This.squares[x][y].value == 0) {
              if (!This.tds[x][y].check) {
                This.clickTd++
               
                This.tds[x][y].check = true;
                getAllZero(This.squares[x][y]);
              }
            } else {
              if(!This.tds[x][y].check){
                This.tds[x][y].check=true
                
                This.clickTd++
                This.tds[x][y].innerHTML = This.squares[x][y].value;

              }
             
            }
          }
        }
       
        This.clickTd++
        getAllZero(curSquare);
      }else{
      
        This.clickTd++
        obj.innerHTML = curSquare.value;
      }
      console.log(This.clickTd)
    } else {
      //game over
      This.gameover(obj);
    }


    if(This.clickTd == This.clickedTotal){
      alert("恭喜你，游戏通关")
      this.gameover();
    }
  }

  if (ev.which == 3) {
    if (obj.className && obj.className != "flag") {
      return;
    }
    obj.className = obj.className == "flag" ? "" : "flag";
    // if (this.squares[obj.pos[0]][obj.pos[1]].type == "mine") {
    //   this.allright = true;
    // } else {
    //   this.allright = false;
    // }
    if (obj.className == "flag") {
      this.mineNumDom.innerHTML = --this.surplusMine;
      if (this.squares[obj.pos[0]][obj.pos[1]].type == "mine") {
        this.allright++
        console.log(this.allright)
      }
    } else {
      this.mineNumDom.innerHTML = ++this.surplusMine;
      if (this.squares[obj.pos[0]][obj.pos[1]].type == "mine") {
        this.allright--
        console.log(this.allright)
      }
    }
    if (this.surplusMine == 0) {
      if (this.allright == this.mineNum) {
        alert("恭喜你 游戏通关");
      } else {
        alert("游戏失败");
        this.gameover();
      }
    }
  }
};

Mine.prototype.gameover = function (clickTd) {
  for (let i = 0; i < this.tr; i++) {
    for (let j = 0; j < this.td; j++) {
      if (this.squares[i][j].type == "mine") {
        this.tds[i][j].className = "mine";
      }
      this.tds[i][j].onmousedown = null;
    }
  }
  if (clickTd) {
    alert("游戏失败")
    clickTd.style.backgroundColor = "red";
  }
};

// var mine= new Mine(28,28,99)
// mine.init()

var btns = document.querySelectorAll(".level button");
var mine = null;
var ln = 0;
var arr = [
  [9, 9, 10],
  [16, 16, 40],
  [28, 28, 99],
];
for (let i = 0; i < btns.length - 1; i++) {
  btns[i].onclick = function () {
    btns[ln].className = "";
    this.className = "active";
    mine = new Mine(...arr[i]);
    mine.init();
    ln = i;
  };
}
btns[0].onclick();
btns[3].onclick = function () {
  btns[ln].onclick();
};
//console.log(mine.getAround(mine.squares[0][0]))
