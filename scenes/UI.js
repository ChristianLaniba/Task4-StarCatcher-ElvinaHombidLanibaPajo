export default class UI extends Phaser.Scene {
    constructor() {
        super({ key: 'UI' });
        this.lives = 3;
        this.timeLeft = 60;
        this.timerEvent = null;
        this.isTimerStopped = false;
    }

    create() {
        //reset UI state
        this.lives = 3;
        this.timeLeft = 60;
        this.isTimerStopped = false;

        //score text
        this.scoreText = this.add.text(16, 16, 'Stars: 0/10', {
            fontSize: '24px',
            fontFamily: "'Comic Sans MS', 'Comic Sans', cursive",
            fill: '#ffffff',
            fontStyle: 'bold'
        });
        this.scoreText.setScrollFactor(0);

        //timer text
        this.timerText = this.add.text(400, 16, 'Time: 60', {
            fontSize: '24px',
            fontFamily: "'Comic Sans MS', 'Comic Sans', cursive",
            fill: '#ffffff',
            fontStyle: 'bold'
        }).setOrigin(0.5, 0);
        this.timerText.setScrollFactor(0);

        //lives hearts
        this.livesGroup = this.add.group();
        const startX = 700;
        for (let i = 0; i < this.lives; i++) {
            const heart = this.add.image(startX + (i * 36), 24, 'heart');
            heart.setScale(0.5);
            heart.setScrollFactor(0);
            this.livesGroup.add(heart);
        }

        //timer countdown
        this.timerEvent = this.time.addEvent({
            delay: 1000,
            callback: this.countdown,
            callbackScope: this,
            loop: true
        });
    }

    stopTimer() {
        this.isTimerStopped = true;
        if (this.timerEvent) {
            this.timerEvent.remove();
            this.timerEvent = null;
        }
    }

    countdown() {
        if (this.isTimerStopped) return;
        
        this.timeLeft--;
        this.timerText.setText('Time: ' + this.timeLeft);
        
        if (this.timeLeft <= 10) {
            this.timerText.setColor('#ff0000');
        }
        
        if (this.timeLeft <= 0) {
            this.timerText.setText('Time: 0');
            this.stopTimer();
            
            const gameScene = this.scene.get('Game');
            if (gameScene && !gameScene.gameOver) {
                gameScene.triggerGameOver('Time up');
            }
        }
    }

    removeLife() {
        if (this.lives <= 0) return;
        
        const hearts = this.livesGroup.getChildren();
        hearts.sort((a, b) => a.x - b.x);
        
        if (hearts.length > 0) {
            const heartToRemove = hearts[0];
            heartToRemove.destroy();
            this.lives--;
            console.log("Life lost! Remaining: " + this.lives);
        }
    }

    update() {
        const gameScene = this.scene.get('Game');
        if (gameScene) {
            this.scoreText.setText('Stars: ' + gameScene.score + '/10');
        }
    }
}