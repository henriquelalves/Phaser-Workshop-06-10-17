class Score extends Phaser.State {

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
    }

    // =========== STATE CREATION ===========
    // Is the method to create the state and all the objects
    // you want to appear on the state. It only happens once!
    create() {
	console.log("Score!");
	this.background = this.game.add.sprite(0,0,'background');

	this.text = this.game.add.text(400, -200, 'Final Score: '+this.game.global_score+'\nclick to continue');
	this.text.anchor.setTo(0.5,0.5);
	this.game.add.tween(this.text).to({y:300}, 1000, Phaser.Easing.Cubic.Out, true);
	
	this.input.onDown.add(this._startGame, this);
    }

    // ============= GAME LOOP! =============
    // This is the game loop method! It will be called as close
    // to 60fps in the browser as it can.
    update() {
    }

    // ========== PRIVATE METHODS ===========
    // Remember to be careful not to name any private method
    // of the class as one of the reserved methods, or things
    // will go awry.
    _startGame () {
	this.game.state.start('game');
    }
}
