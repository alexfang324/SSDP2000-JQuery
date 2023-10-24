'use strict';
const game = {
    isRunning: false,
    curScreenId: 'splash-screen',
    $splashScreenElement: $('#splash-screen'),
    $gameScreenElement: $('#game-screen'),
    $startGameBtn: $('#start-game-btn'),
    $pauseGameBtn: $('#pause-game-btn'),
    $endGameBtn:$('end-game-btn'),
    startGame: function(){
        game.$splashScreenElement.toggle();
        game.$gameScreenElement.toggle();
        game.isRunning = true;
    },
    pauseGame: function(){
        const btnText = game.$pauseGameBtn.text();
        btnText=='Pause'?game.$pauseGameBtn.text('Resume'):game.$pauseGameBtn.text('Pause');
        //toggling game running state
        game.isRunning = !game.isRunning;
    }
}

$(()=>{
    game.$startGameBtn.on('click',game.startGame);
    game.$pauseGameBtn.on('click',game.pauseGame);
})
