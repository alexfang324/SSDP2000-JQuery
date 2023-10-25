'use strict';
const game = {
  isRunning: false,
  wasRunning:false,
  screenId: 'splash-screen',
  $gameElement: $('#game'),
  $gameBodyElement: $('#game-body'),
  $splashScreenElement: $('#splash-screen'),
  $gameScreenElement: $('#game-screen'),
  $startBtn: $('#start-btn'),
  $pauseBtn: $('#pause-btn'),
  $endBtn: $('#end-btn'),
  $helpBtn: $('#help-btn'),
  $quitBtn: $('#quit-btn'),
  $playAgainBtn: $('#play-again-btn'),
  $gameOverQuitBtn: $('#game-over-quit-btn'),
  $modalCloseBtns: $('button.close'),
  startGame: function () {
    game.isRunning = true;
    game.setScreen('game-screen');
    game.setGameBackground();
  },
  endGame: function () {
    game.isRunning = false;
    game.setScreen('game-over-screen');
    game.setGameBackground();
  },
  quitGame: function () {
    game.isRunning = false;
    game.setScreen('splash-screen');
    game.setGameBackground();
  },
  toggleRunning: function () {
    //toggle pause button text
    const btnText = game.$pauseBtn.text();
    btnText == 'Pause'
      ? game.$pauseBtn.text('Resume')
      : game.$pauseBtn.text('Pause');
    //update wasRunning and toggle game running state
    game.wasRunning = game.isRunning;
    game.isRunning = !game.isRunning;

    //toggle game background and border
    game.setGameBackground();
  },
  setScreen: function (screenId) {
    game.screenId = screenId;
    game.$gameBodyElement.children().hide();
    $(`#${screenId}`).show();

    screenId == 'game-screen' ? $('#quit-btn').show() : $('#quit-btn').hide();
    screenId == 'game-over-screen'
      ? $('#help-btn').hide()
      : $('#help-btn').show();
  },
  getInstruction: function () {
    game.screenId == 'game-screen'
      ? $('#gameplay-modal').modal('show')
      : $('#setup-modal').modal('show');
    game.wasRunning = game.isRunning;
    game.isRunning = false;
    game.setGameBackground();
  },
  onModalClosed: function () {
    if (game.screenId == 'game-screen' && game.wasRunning) {
      game.isRunning = true;
    }
    game.setGameBackground();
  },
  setGameBackground: function () {
    if (game.isRunning) {
      game.$gameElement.css('border', 'dashed 5px darkgreen');
      game.$gameBodyElement.css(
        'background-image',
        'url("./game-background.png")'
      );
    } else {
      game.$gameElement.css('border', '');
      game.$gameBodyElement.css('background-image', '');
    }
  }
};

$(() => {
  game.$startBtn.on('click', game.startGame);
  game.$pauseBtn.on('click', game.toggleRunning);
  game.$endBtn.on('click', game.endGame);
  game.$helpBtn.on('click', game.getInstruction);
  game.$quitBtn.on('click', game.quitGame);
  game.$playAgainBtn.on('click', game.startGame);
  game.$gameOverQuitBtn.on('click', () => {
    game.setScreen('splash-screen');
  });
  game.$modalCloseBtns.on('click', game.onModalClosed);
});
