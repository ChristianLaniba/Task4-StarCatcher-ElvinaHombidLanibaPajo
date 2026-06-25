export default class GameOver extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOver' });
        this.finalScore = 0;
        this.reason = 'Game Over';
        this.isNewHighScore = false;
    }

    init(data) {
        this.finalScore = data.score || 0;
        this.reason = data.reason || 'Game Over';
        this.isNewHighScore = data.isNewHighScore || false;
        console.log("GameOver scene init with score: " + this.finalScore + " reason: " + this.reason);
    }

    create() {
        //dark overlay
        this.add.rectangle(0, 0, 800, 600, 0x000000, 0.7).setOrigin(0);

        //game over title
        this.add.text(400, 130, 'GAME OVER', {
            fontSize: '52px',
            fontFamily: "'Comic Sans MS', 'Comic Sans', cursive",
            fill: '#7f0000',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        //reason
        this.add.text(400, 200, this.reason, {
            fontSize: '24px',
            fill: '#ff6666',
            fontFamily: "'Comic Sans MS', 'Comic Sans', cursive"
        }).setOrigin(0.5);

        //score
        this.add.text(400, 260, 'Score: ' + this.finalScore, {
            fontSize: '28px',
            fill: '#ffffff',
            fontFamily: "'Comic Sans MS', 'Comic Sans', cursive"
        }).setOrigin(0.5);

        //new high score message
        if (this.isNewHighScore) {
            this.add.text(400, 310, 'NEW HIGH SCORE! ⭐', {
                fontSize: '24px',
                fill: '#FFD700',
                fontFamily: "'Comic Sans MS', 'Comic Sans', cursive",
                fontStyle: 'bold'
            }).setOrigin(0.5);
        }

        //high score
        const best = parseInt(localStorage.getItem('highScore')) || 0;
        this.add.text(400, 355, 'High Score: ' + best, {
            fontSize: '18px',
            fill: '#8DA3BC',
            fontFamily: "'Comic Sans MS', 'Comic Sans', cursive"
        }).setOrigin(0.5);

        //best time
        const bestTime = parseFloat(localStorage.getItem('bestTime')) || 0;
        if (best >= 10 && bestTime > 0) {
            this.add.text(400, 395, 'Best Time: ' + bestTime.toFixed(1) + 's', {
                fontSize: '18px',
                fill: '#8DA3BC',
                fontFamily: "'Comic Sans MS', 'Comic Sans', cursive"
            }).setOrigin(0.5);
        }

        //play again button
        const restartBtn = this.add.text(400, 470, 'Play Again', {
            fontSize: '28px',
            fill: '#ffffff',
            backgroundColor: '#2a2a4a',
            padding: { x: 30, y: 12 },
            fontFamily: "'Comic Sans MS', 'Comic Sans', cursive"
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });

        restartBtn.on('pointerdown', () => {
            this.restartGame();
        });

        this.input.keyboard.on('keydown-ENTER', () => {
            this.restartGame();
        });
    }

    restartGame() {
        this.scene.stop('UI');
        this.scene.stop('Game');
        this.scene.start('Game');
        this.scene.launch('UI');
    }
}