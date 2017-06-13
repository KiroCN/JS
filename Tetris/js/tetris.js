window.$=HTMLElement.prototype.$=function(selector){
  return (this==window?document:this).querySelectorAll(selector);
}
var tetris={
  RN:20,
  CN:10,
  CSIZE:26,
  OFFSET_X:15,
  OFFSET_y:15,
  pg:null,
  currShape:null,
  nextShape:null,
  interval:500,
  timer:null,
  wall:[],
  state:1,
  STATE_RUNNING:1,
  STATE_GAMEOVER:0,
  STATE_PAUSE:2,
  IMG_GAMEOVER:"img/game-over.png",
  IMG_PAUSE:"img/pause.png",
  SCORES:[0,10,50,80,200],
  score:0,
  lines:0,
  paintState:function(){
    var img=new Image();
    switch(this.state){
    case this.STATE_GAMEOVER:
      img.src=this.IMG_GAMEOVER;
      break;
    case this.STATE_PAUSE:
      img.src=this.IMG_PAUSE;
    }
    this.pg.appendChild(img);
  },
init:function(){
    this.pg=$(".playground")[0];
    this.currShape=this.randomShape();
    this.nextShape=this.randomShape();
    for(var i=0;i<this.RN;i++){
      this.wall[i]=[];
    }
    this.score=0;
    this.lines=0;
    this.state=1;
    this.paint();
    this.timer=setInterval(function(){
      tetris.drop();
      tetris.paint();
    },this.interval);
    document.onkeydown=function(){
      var e=window.event||arguments[0];
      switch(e.keyCode){
        case 37: tetris.moveL();break;
        case 39: tetris.moveR();break;
        case 40: tetris.drop();break;
        case 38: tetris.rotateR();break;
        case 90: tetris.rotateL();break;
        case 80: tetris.pause();break;
        case 81: tetris.gameOver();break;
        case 67: tetris.myContinue();break;
        case 83: 
          if(this.state==this.STATE_GAMEOVER){
            tetris.init();
          }
      }
    }
  },gameOver:function(){
    this.state=this.STATE_GAMEOVER;
    clearInterval(this.timer);
    this.timer=null;
    this.paint();
  },
  pause:function(){
    if(this.state==this.STATE_RUNNING){
      this.state=this.STATE_PAUSE;
    }
  },
  myContinue:function(){
    if(this.state==this.STATE_PAUSE){
      this.state=this.STATE_RUNNING;
    }
  },
  rotateR:function(){
    if(this.state==this.STATE_RUNNING){
      this.currShape.rotateR();
      if(this.outOfBounds()||this.hit()){
        this.currShape.rotateL();
      }
    }
  },
  rotateL:function(){
    if(this.state==this.STATE_RUNNING){
      this.currShape.rotateL();
      if(this.outOfBounds()||this.hit()){
        this.currShape.rotateR();
      }
    }
  },
  moveR:function(){
    this.currShape.moveR();
    if(this.outOfBounds()||this.hit()){
      this.currShape.moveL();
    }
  },
  moveL:function(){
    this.currShape.moveL();
    if(this.outOfBounds()||this.hit()){
      this.currShape.moveR();
    }
  },
  outOfBounds:function(){
    var cells=this.currShape.cells;
    for(var i=0;i<cells.length;i++){
      if(cells[i].col<0||cells[i].col>=this.CN){
        return true;
      }
    }
    return false;
  },
  hit:function(){
    var cells=this.currShape.cells;
    for(var i=0;i<cells.length;i++){
      if(this.wall[cells[i].row][cells[i].col]){
        return true;
      }
    }
    return false;
  },
  paint:function(){
    this.pg.innerHTML=this.pg.innerHTML.replace(/<img(.*?)>/g,"");
    this.paintShape();
    this.paintWall();
    this.paintNext();
    this.paintScore();
    this.paintState();
  },
  paintScore:function(){
    $("span")[0].innerHTML=this.score;
    $("span")[1].innerHTML=this.lines;
  },
  drop:function(){
    if(this.state==this.STATE_RUNNING){
      if(this.canDrop()){
        this.currShape.drop();
      }else{
        this.landIntoWall();
        var ln=this.deleteLines();
        this.score+=this.SCORES[ln];
        this.lines+=ln;
        if(!this.isGameOver()){
          this.currShape=this.nextShape;
          this.nextShape=this.randomShape();
        }else{
          clearInterval(this.timer);
          this.timer=null;
          this.state=this.STATE_GAMEOVER;
          this.paint();
        }
      }
    }
  },
  deleteLines:function(){
    for(var row=0,lines=0;row<this.RN;row++){
      if(this.isFull(row)){
        this.deleteL(row);
        lines++;
      }
    }
    return lines;
  },
  isFull:function(row){
    var line=this.wall[row];    
    for(var c=0;c<this.CN;c++){
      if(!line[c]){
        return false;
      }
    }
    return true;
  },
  deleteL:function(row){
    this.wall.splice(row,1);
    this.wall.unshift([]);
    for(var r=row;r>0;r--){
      for(var c=0;c<this.CN;c++){
        if(this.wall[r][c]){
          this.wall[r][c].row++;
        }
      }
    }
  },
  isGameOver:function(){
    var cells=this.nextShape.cells;
    for(var i=0;i<cells.length;i++){
      var cell=this.wall[cells[i].row][cells[i].col];
      if(cell){
        return true;
      }
    }
    return false;
  },



