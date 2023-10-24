const game = {
    $splashScreenElement: $('#splash-screen'),
    $gameScreenElement: $('#game-screen'),
    $startGameBtn: $('#start-game-btn'),
    startGame: function(){
        game.$splashScreenElement.toggle();
        game.$gameScreenElement.toggle();
    }
}

$(()=>{
    game.$startGameBtn.on('click',game.startGame);
})
