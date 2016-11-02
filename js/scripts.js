// Buisness Logic


function Player(username) {
  this.username = username;
  this.currentTurn = 0;
  this.totalScore = 0;
  this.isCurrentPlayer = false;
};

function Game() {
  this.players = [];
};

Player.prototype.rollDie = function() {
  var die = Math.floor(Math.random()*6 + 1);
  console.log(die);
  if (die > 1) {
    this.currentTurn += die;
  } else {
    this.currentTurn = 0;
      nextPlayer();
  };
  return die;
};

var nextPlayer = function(){
  var current = currentGame.getCurrentPlayer();
  console.log(current);
  currentGame.players[current].isCurrentPlayer = false;
  if(current === currentGame.players.length - 1) {
    currentGame.players[0].isCurrentPlayer = true;
  } else{
    current += 1;
    currentGame.players[current].isCurrentPlayer = true;
  }
};

Player.prototype.hold = function() {
  this.totalScore += this.currentTurn;
  if (this.totalScore >= 100) {
    alert(this.username + ' wins!')
    currentGame.resetGame();
  }
  this.currentTurn = 0;
  nextPlayer();

};

Game.prototype.getCurrentTurn = function() {
  currentGame.players.forEach(function(player){
    if (player.isCurrentPlayer === true ) {
      return player.currentTurn;

    }
  });
}

Game.prototype.getCurrentPlayer = function() {
  for (var i = 0; i < currentGame.players.length; i++) {
    if (currentGame.players[i].isCurrentPlayer === true){
      return i;
    }
  }
}

Game.prototype.resetGame = function() {
  this.players.forEach(function(player){
    player.currentTurn = 0;
    player.totalScore = 0;
  })
}

var currentGame = new Game();
var playerNumber = 0;

// User Interface Logic
$(document).ready(function() {
  $("#player-profile").submit(function(event) {
    event.preventDefault();
    var playerName = $("#player-name").val();
    var newPlayer = new Player(playerName);
    currentGame.players.push(newPlayer);
    currentGame.players[0].isCurrentPlayer = true;
    $(".total-score").append('<h3>' + newPlayer.username + '\'s Score: <span id="score-output-' + playerNumber +'"></span></h3>')
    playerNumber += 1;

  });

  $("#roll-die").submit(function(event) {
    event.preventDefault();
    var current = currentGame.getCurrentPlayer();
    var die = currentGame.players[current].rollDie();
    var current = currentGame.getCurrentPlayer();
    $("#current-player").text(currentGame.players[current].username);
    $("#current-output").text(currentGame.players[current].currentTurn);
    $("#die").remove();
    $(".current-total").append('<img src="img/die'+ die + '.png" alt="die" id="die"/>' );

    console.log(currentGame);
  });

  $("#hold").submit(function(event) {
    event.preventDefault();
    var current = currentGame.getCurrentPlayer();
    currentGame.players[current].hold();
    $("#score-output-" + current + "").text(currentGame.players[current].totalScore);
    var current = currentGame.getCurrentPlayer();
    $("#current-output").text(currentGame.players[current].currentTurn);
    $("#current-player").text(currentGame.players[current].username);
    console.log(currentGame);
  });


});
