var game;

function Game() {
  this.canvas = document.getElementById("canvas");
  this.ctx = this.canvas.getContext("2d");
  this.score = document.getElementById("score");
  this.fps = 60;
  this.player = new Player(this);
  this.player.x = 20;
  this.player.name = "player";
  this.player2 = new Player(this);
  this.player2.x = this.canvas.width - this.player2.w - 20;
  this.ball = new Ball(this);
  this.ball2 = "";

  this.asignPowers();
  this.basic = new Audio("./sounds/basic.wav");
  this.point = new Audio("./sounds/point.wav");
  this.superboost = new Audio("./sounds/superboost.wav");
  this.shadow = new Audio("./sounds/shadow.wav");
  this.boost = new Audio("./sounds/boost.wav");
}

Game.prototype.asignPowers = function() {
  var p, p2;
  p = new Superpower("Boost", this, this.player);
  p.counter = document
    .getElementById("powerQ")
    .getElementsByClassName("counter")[0];
  p2 = new Superpower("Boost", this, this.player2);
  p2.counter = document
    .getElementById("powerP")
    .getElementsByClassName("counter")[0];
  this.player.powers.boost = p;
  this.player2.powers.boost = p2;

  p = new Superpower("Shadow", this, this.player);
  p.counter = document
    .getElementById("powerE")
    .getElementsByClassName("counter")[0];
  p2 = new Superpower("Shadow", this, this.player2);
  p2.counter = document
    .getElementById("powerO")
    .getElementsByClassName("counter")[0];
  this.player.powers.shadow = p;
  this.player2.powers.shadow = p2;

  p = new Superpower("SuperBoost", this, this.player);
  p.counter = document
    .getElementById("powerR")
    .getElementsByClassName("counter")[0];
  p2 = new Superpower("SuperBoost", this, this.player2);
  p2.counter = document
    .getElementById("powerI")
    .getElementsByClassName("counter")[0];
  this.player.powers.superboost = p;
  this.player2.powers.superboost = p2;
};

Game.prototype.start = function() {
  game = this;

  game.id = window.requestAnimationFrame(update);
  game.newPoint();
};

Game.prototype.checkColisions = function() {
  if (this.ball2 != "") this.ball2.checkColision();
  this.player.checkColisionUp();
  this.player.checkColisionDown();
  this.player2.checkColisionUp();
  this.player2.checkColisionDown();
  this.ball.checkColision();
};

Game.prototype.drawBackground = function() {
  this.ctx.beginPath();

  this.ctx.strokeStyle = "rgb(16, 62, 216)";
  this.ctx.moveTo(this.canvas.width / 2, 0);
  this.ctx.setLineDash([5, 3]);
  this.ctx.lineTo(this.canvas.width / 2, this.canvas.height);
  this.ctx.stroke();
  this.ctx.closePath();
};

Game.prototype.clear = function() {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
};

Game.prototype.drawAll = function() {
  this.drawBackground();
  this.player.draw();
  this.player2.draw();
  this.ball.draw();
  if (this.ball2 != "") this.ball2.draw();
  this.drawPoints();
};

Game.prototype.drawPoints = function() {
  this.ctx.shadowBlur = 20;
  this.ctx.shadowColor = "white";
  this.ctx.fillStyle = "white";
  this.ctx.font = "20px Arial";
  document.getElementById("player").innerText= this.player.name+":  "+this.player.points
  document.getElementById("player2").innerText= this.player2.name+":  "+this.player2.points
  
};

Game.prototype.moveAll = function() {
  this.player.move();
  this.player2.move();
  this.ball.move();
  if (this.ball2 != "") this.ball2.move();
};

Game.prototype.gameOver = function(player) {
  var p;
  if (player == 1) {
    p = this.player;
  } else {
    p = this.player2;
  }
  this.score.style.display = "inline-block";
  document.getElementById("board").style.position = "relative";
  document.getElementById("buttons").style.position = "relative";
  document.getElementById("text").innerText = p.name + " wins!!";
};

Game.prototype.newPoint = function() {
    this.clear()
  window.cancelAnimationFrame(game.id);
  this.ball.color = "white";
  this.player.reset(1);
  this.player2.reset(2);
  
  this.drawAll();
  if (this.player.points == 11) {
    this.gameOver(1);
    return;
  } else if (this.player2.points == 11) {
    this.gameOver(2);
    return;
  }
  setTimeout(function() {
    if (game.player.points == 0 && game.player2.points == 0) {
      game.ctx.fillStyle = "white";
      game.ctx.font = "35px Arial";
      game.ctx.fillText("Go!!", game.ball.x - 30, game.ball.y - 100);
    }
  }, 750);
  setTimeout(function() {
    game.id = window.requestAnimationFrame(update);
  }, 1500);
};

Game.prototype.restart = function() {
  this.player.points = 0;
  this.player2.points = 0;
  this.newPoint();
};

var lastTime = 0;
var delta = 0;
function update(time) {
  delta = time - lastTime;
  lastTime = time;
  game.fps = 1000 / delta;
  game.clear();
  game.drawAll();
  game.moveAll();
  game.checkColisions();
  game.id = requestAnimationFrame(update);
}
