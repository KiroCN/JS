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
game.States.menu = function(){
	this.create = function(){
		game.add.tileSprite(0,0,game.width,game.height,'background').autoScroll(-10,0); //背景图
		game.add.tileSprite(0,game.height-112,game.width,112,'ground').autoScroll(-100,0); //地板
		var titleGroup = game.add.group();
		titleGroup.create(0,0,'title'); //标题
		var bird = titleGroup.create(190, 10, 'bird');
		bird.animations.add('fly');
		bird.animations.play('fly',12,true);
		titleGroup.x = 35;
		titleGroup.y = 100;
		game.add.tween(titleGroup).to({ y:120 },1000,null,true,0,Number.MAX_VALUE,true);
		var btn = game.add.button(game.width/2,game.height/2,'btn',function(){
			game.state.start('play');
		});
		btn.anchor.setTo(0.5,0.5);
	}
}
game.States.play = function(){
	this.create = function(){
		this.bg = game.add.tileSprite(0,0,game.width,game.height,'background');
		this.pipeGroup = game.add.group();
		this.pipeGroup.enableBody = true;
		this.ground = game.add.tileSprite(0,game.height-112,game.width,112,'ground');
		this.bird = game.add.sprite(50,150,'bird'); //鸟
		this.bird.animations.add('fly');
		this.bird.animations.play('fly',12,true);
		this.bird.anchor.setTo(0.5, 0.5);
		game.physics.enable(this.bird,Phaser.Physics.ARCADE);
		this.bird.body.gravity.y = 0;
		game.physics.enable(this.ground,Phaser.Physics.ARCADE);
		this.ground.body.immovable = true;

		this.soundFly = game.add.sound('fly_sound');
		this.soundScore = game.add.sound('score_sound');
		this.soundHitPipe = game.add.sound('hit_pipe_sound');
		this.soundHitGround = game.add.sound('hit_ground_sound');
		this.scoreText = game.add.bitmapText(game.world.centerX-20, 30, 'flappy_font', '0', 36);

		this.readyText = game.add.image(game.width/2, 40, 'ready_text');
		this.playTip = game.add.image(game.width/2,300,'play_tip');
		this.readyText.anchor.setTo(0.5, 0);
		this.playTip.anchor.setTo(0.5, 0);

		this.hasStarted = false;
		game.time.events.loop(900, this.generatePipes, this);
		game.time.events.stop(false);
		game.input.onDown.addOnce(this.statrGame, this);
	};
	this.update = function(){
		if(!this.hasStarted) return;
		game.physics.arcade.collide(this.bird,this.ground, this.hitGround, null, this);
		game.physics.arcade.overlap(this.bird, this.pipeGroup, this.hitPipe, null, this);
		if(this.bird.angle < 90) this.bird.angle += 2.5;
		this.pipeGroup.forEachExists(this.checkScore,this);
	}
}