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
  },