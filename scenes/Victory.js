export default class Victory extends Phaser.Scene {
    constructor() {
        super({ key: 'Victory' });
        this.finalScore = 0;
        this.finalTime = 0;
    }

    init(data) {
        this.finalScore = data.score || 0;
        this.finalTime = data.time || 0;
        console.log("Victory scene init with score: " + this.finalScore + " time: " + this.finalTime + "s");
    }

    create() {
        //dark overlay
        this.add.rectangle(0, 0, 800, 600, 0x000000, 0.7).setOrigin(0);

        //victory title
        this.add.text(400, 140, 'YOU WIN!', {
            fontSize: '52px',
            fontFamily: "'Comic Sans MS', 'Comic Sans', cursive",
            fill: '#00C896',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        //score
        this.add.text(400, 220, 'Score: ' + this.finalScore, {
            fontSize: '28px',
            fill: '#ffffff',
            fontFamily: "'Comic Sans MS', 'Comic Sans', cursive"
        }).setOrigin(0.5);

        //time taken
        this.add.text(400, 265, 'Time: ' + this.finalTime.toFixed(1) + 's', {
            fontSize: '22px',
            fill: '#8DA3BC',
            fontFamily: "'Comic Sans MS', 'Comic Sans', cursive"
        }).setOrigin(0.5);

        //high score
        let best = parseInt(localStorage.getItem('highScore')) || 0;
        console.log("Current high score: " + best);
        console.log("Final score: " + this.finalScore);
        
        if (this.finalScore > best) {
            localStorage.setItem('highScore', this.finalScore.toString());
            best = this.finalScore;
            this.add.text(400, 315, 'NEW BEST SCORE! ⭐', {
                fontSize: '24px',
                fill: '#FFD700',
                fontFamily: "'Comic Sans MS', 'Comic Sans', cursive",
                fontStyle: 'bold'
            }).setOrigin(0.5);
        }

        this.add.text(400, 365, 'High Score: ' + best, {
            fontSize: '18px',
            fill: '#8DA3BC',
            fontFamily: "'Comic Sans MS', 'Comic Sans', cursive"
        }).setOrigin(0.5);

        //best time
        const bestTime = parseFloat(localStorage.getItem('bestTime')) || 0;
        if (best >= 10 && bestTime > 0) {
            const previousBest = parseFloat(localStorage.getItem('bestTime')) || 999;
            let displayTime = bestTime;
            let isNewBestTime = false;
            
            if (this.finalTime < previousBest && this.finalTime > 0) {
                localStorage.setItem('bestTime', this.finalTime.toFixed(1));
                displayTime = this.finalTime;
                isNewBestTime = true;
            }
            
            const timeText = isNewBestTime ? 
                'NEW BEST TIME! ⚡' : 
                'Best Time: ' + displayTime.toFixed(1) + 's';
            
            const timeColor = isNewBestTime ? '#FF6B6B' : '#8DA3BC';
            
            this.add.text(400, 410, timeText, {
                fontSize: isNewBestTime ? '24px' : '18px',
                fill: timeColor,
                fontFamily: "'Comic Sans MS', 'Comic Sans', cursive",
                fontStyle: isNewBestTime ? 'bold' : 'normal'
            }).setOrigin(0.5);
        }

        //play again button
        const restartBtn = this.add.text(400, 490, 'Play Again', {
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