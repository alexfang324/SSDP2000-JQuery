"use strict";
const game = {
  isRunning: false,
  wasRunning: false,
  screenId: "splash-screen",
  $gameElement: $("#game"),
  $gameBodyElement: $("#game-body"),
  $splashScreenElement: $("#splash-screen"),
  $gameScreenElement: $("#game-screen"),
  $startBtn: $("#start-btn"),
  $pauseBtn: $("#pause-btn"),
  $endBtn: $("#end-btn"),
  $helpBtn: $("#help-btn"),
  $quitBtn: $("#quit-btn"),
  $playAgainBtn: $("#play-again-btn"),
  $gameOverQuitBtn: $("#game-over-quit-btn"),
  startGame: function () {
    game.setScreen("game-screen");
    game.toggleRunning();
  },
  endGame: function () {
    game.setScreen("game-over-screen");
    game.toggleRunning();
  },
  quitGame: function () {
    game.setScreen("splash-screen");
    game.toggleRunning();
  },

  //toggle game state when clicking Pause/Resume button
  toggleRunning: function () {
    switch (game.screenId) {
      case "splash-screen":
        game.isRunning = false;
        break;
      case "game-screen":
        game.wasRunning = game.isRunning;
        game.isRunning = !game.isRunning;
        //toggle pause button text
        const btnText = game.$pauseBtn.text();
        btnText == "Pause"
          ? game.$pauseBtn.text("Resume")
          : game.$pauseBtn.text("Pause");
        break;
      case "game-over-screen":
        game.isRunning = false;
        break;
    }
    //toggle game background and border
    game.setGameBackground();
  },

  //Decide which screen to show based on current screenId
  setScreen: function (screenId) {
    game.screenId = screenId;
    game.$gameBodyElement.children().hide();
    $(`#${screenId}`).show();

    screenId == "game-screen" ? $("#quit-btn").show() : $("#quit-btn").hide();
    screenId == "game-over-screen"
      ? $("#help-btn").hide()
      : $("#help-btn").show();
  },

  //Decide which instruction to show in modal
  getInstruction: function () {
    game.screenId == "game-screen"
      ? $("#gameplay-modal").modal("show")
      : $("#setup-modal").modal("show");
    game.wasRunning = game.isRunning;
    game.isRunning = false;
    game.setGameBackground();
  },

  //Sets game back to game on mode if it was on when opening modal
  onModalClosed: function () {
    if (game.screenId == "game-screen" && game.wasRunning) {
      game.isRunning = true;
    }
    game.setGameBackground();
  },

  //Sets background and border style based on game state
  setGameBackground: function () {
    if (game.isRunning) {
      game.$gameElement.addClass('active');
      game.$gameBodyElement.addClass('active');
    } else {
      game.$gameElement.removeClass('active');
      game.$gameBodyElement.removeClass('active');
    }
  },
};

//Add event listeners on DOM loaded
$(() => {
  game.$startBtn.on("click", game.startGame);
  game.$pauseBtn.on("click", game.toggleRunning);
  game.$endBtn.on("click", game.endGame);
  game.$helpBtn.on("click", game.getInstruction);
  game.$quitBtn.on("click", game.quitGame);
  game.$playAgainBtn.on("click", game.startGame);
  game.$gameOverQuitBtn.on("click", () => {
    game.setScreen("splash-screen");
  });
  $("#gameplay-modal").on("hidden.bs.modal", game.onModalClosed);
});
