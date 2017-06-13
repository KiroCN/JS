var game = new Phaser.Game(320,505,Phaser.AUTO,'game');
game.States = {}; 

game.States.boot = function(){
	this.preload = function(){
		if(!game.device.desktop){
			this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
			this.scale.forcePortrait = true;
			this.scale.refresh();
		}
		game.load.image('loading','assets/preloader.gif');
	};
	this.create = function(){
		game.state.start('preload');
	};
}

game.States.preload = function(){
	this.preload = function(){
		var preloadSprite = game.add.sprite(35,game.height/2,'loading');
		game.load.setPreloadSprite(preloadSprite);
		
		game.load.image('background','assets/background.png'); //背景
    	game.load.image('ground','assets/ground.png'); //地面
    	game.load.image('title','assets/title.png'); //游戏标题
    	game.load.spritesheet('bird','assets/bird.png',34,24,3); //鸟
    	game.load.image('btn','assets/start-button.png');  //按钮
    	game.load.spritesheet('pipe','assets/pipes.png',54,320,2); //管道
    	game.load.bitmapFont('flappy_font', 'assets/fonts/flappyfont/flappyfont.png', 'assets/fonts/flappyfont/flappyfont.fnt');
    	game.load.audio('fly_sound', 'assets/flap.wav');//飞翔的音效
    	game.load.audio('score_sound', 'assets/score.wav');//得分的音效
    	game.load.audio('hit_pipe_sound', 'assets/pipe-hit.wav'); //撞击管道的音效
    	game.load.audio('hit_ground_sound', 'assets/ouch.wav'); //撞击地面的音效

    	game.load.image('ready_text','assets/get-ready.png');
    	game.load.image('play_tip','assets/instructions.png');
    	game.load.image('game_over','assets/gameover.png');
    	game.load.image('score_board','assets/scoreboard.png');
	}
	this.create = function(){
		game.state.start('menu');
	}
}