var game;

function Game() {
  this.canvas = document.getElementById("canvas");
  this.ctx = this.canvas.getContext("2d");
  this.fps = 60;
  this.player = new Player(this);
  this.player.x = 2;
  this.player2 = new Player(this);
  this.player2.x = this.canvas.width - this.player2.w - 2;
  this.ball = new Ball(this);
  this.ball2 = "";
  this.backgroundColor = "#F5F5F5";
  this.asignPowers();
}

Game.prototype.asignPowers = function() {
  var p, p2;
  p = new Superpower("Boost", this, this.player);
  p2 = new Superpower("Boost", this, this.player2);
  this.player.powers.boost = p;
  this.player2.powers.boost = p2;

  p = new Superpower("Shadow", this, this.player);
  p2 = new Superpower("Shadow", this, this.player2);
  this.player.powers.shadow = p;
  this.player2.powers.shadow = p2;

  p = new Superpower("SuperBoost", this, this.player);
  p2 = new Superpower("SuperBoost", this, this.player2);
  this.player.powers.superboost = p;
  this.player2.powers.superboost = p2;
};

Game.prototype.start = function() {
  game = this;
  this.id = window.requestAnimationFrame(update);
  this.newPoint()
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
  this.ctx.fillStyle = this.backgroundColor;
  this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  this.ctx.fillStyle = "black";
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
  this.ctx.fillStyle = "grey";
  this.ctx.font = "20px Arial";
  this.ctx.fillText(this.player.points, this.canvas.width / 4, 30);
  this.ctx.fillText(this.player2.points, (this.canvas.width / 4) * 3, 30);
};

Game.prototype.moveAll = function() {
  this.player.move();
  this.player2.move();
  this.ball.move();
  if (this.ball2 != "") this.ball2.move();
};

Game.prototype.newPoint = function() {
  window.cancelAnimationFrame(game.id);
  this.ball.color="black"
  this.player.reset(1);
  this.player2.reset(2);
  this.drawAll();
  setTimeout(function() {
    game.ctx.fillStyle = "black";
    game.ctx.font = "35px Arial";
    game.ctx.fillText("Go!!", game.ball.x - 30, game.ball.y - 100);
  }, 500);
  setTimeout(function() {
    game.id = window.requestAnimationFrame(update);
  }, 1000);

  
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
