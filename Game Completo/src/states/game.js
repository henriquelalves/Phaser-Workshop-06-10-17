class Game extends Phaser.State {

    // ===== 'Phaser.State' CONSTRUCTOR =====
    // This is ES6 Standard; it's a simple way
    // to call the constructor from the parent class.
    constructor() {
	super();
    }

    // ============ STATE LOADER ============
    // Is the first method to run on the state; its sole
    // purpose is to load the assets you want to use.
    preload() {
	this.game.load.spritesheet('player', 'assets/dude.png', 32, 48);
	this.game.load.image('platform', 'assets/platform.png');
    }

    // =========== STATE CREATION ===========
    // Is the method to create the state and all the objects
    // you want to appear on the state. It only happens once!
    create() {
	console.log("Game!");
	
	// Background
	this.background = this.game.add.sprite(this.game.width,this.game.height,'background');
	this.background.angle = 180;
	
	// Player
	this.player = this.game.add.sprite(400, 100, 'player');
	this.player.animations.add('walk_left', [0,1,2,3]); // O primeiro argumento é o nome da animação; o segundo argumento são os frames (na imagem original) que serão utilizados na animação.
	this.player.animations.add('default', [4]);
	this.player.animations.add('walk_right', [5,6,7,8]);

	this.player_yvel = 0.0; // Normalmente se armazena a velocidade do player em variáveis separadas para se poder ter mais controle do movimento!
	this.player_xvel = 0.0;

	this.gravity = 0.1;

	// Register keys
	this.leftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
	this.rightKey = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);

	// Score
	this.score = 0;
	this.score_text = this.game.add.text(0,0,'SCORE: '+this.score);
	
	// Platforms!
	this.platforms = [];
	this.platform_yvel = -2.0;
	
	// Very coxa platform loop!
	this.createPlatform(); // Primeiro criamos uma plataforma para o player não cair no vazio.
	this.timer = this.game.time.create();
	this.timer.loop(1000, this.createPlatform, this);
	this.timer.start();

    }

    // ============= GAME LOOP! =============
    // This is the game loop method! It will be called as close
    // to 60fps in the browser as it can.
    update() {
	
	// Keyboard!
	if (this.leftKey.isDown){
	    this.player_xvel = -5.0;
	    this.player.play('walk_left'); // isso irá rodar a animação que criamos previamente
	} else if (this.rightKey.isDown){
	    this.player_xvel = 5.0;
	    this.player.play('walk_right');
	} else {
	    this.player_xvel = 0.0;
	    this.player.play('default');
	}

	// Gravity
	this.player_yvel += this.gravity;

	// Platforms
	for (var i = 0; i < this.platforms.length; i+=1){
	    this.platforms[i].y += this.platform_yvel;

	    // Delete platforms that go way to high!
	    if(this.platforms[i].y < -60){
		this.platforms[i].destroy();
		this.platforms.splice(i,1);
	    }
	}
	
	// Player movement
	this.player.x += this.player_xvel;
	this.player.y += this.player_yvel;

	// Collision
	for (var i = 0; i < this.platforms.length; i+=1){
	    let p = this.platforms[i];
	    if(p.getBounds().contains(this.player.x, this.player.y+48)){
		this.player_yvel = 0.0;
		this.player.y = p.y - 48;
	    }
	}

	// Game over
	if (this.player.y > 648 ||
	    this.player.y < -48){
	    this.game.global_score = this.score;
	    this.game.state.start('score');
	}
    }

    // ========== PRIVATE METHODS ===========
    // Remember to be careful not to name any private method
    // of the class as one of the reserved methods, or things
    // will go awry.

    createPlatform () {
	let platform = this.game.add.sprite(Math.random()*640, 600, 'platform'); // Criamos uma plataforma em uma posição x aleatória, e fora da tela no eixo y.
	this.platforms.push(platform); // Inserimos ela no vetor de plataformas (para podermos atualiza-la em update()!)
	this.upScore(); // Aumentamos o score!

	this.platform_yvel -= 0.1; // Aqui estamos acelerando a velocidade vertical das plataformas a medida que mais plataformas aparecerem.
    }

    upScore () {
	this.score += 1;
	this.score_text.setText('SCORE: '+this.score);
    }
}
