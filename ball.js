function Ball(game) {
  this.game = game;
  this.x = 450;
  this.y = 300;
  this.vx = -2;
  this.vy = -1;
  this.color = "#010d01";
  this.radius = 10;
}

Ball.prototype.reset = function(p) {
  this.x = 450;
  this.y = 300;
  if (p == 2) {
    this.vx = 2;
    this.vy = 1;
  } else if (p == 1) {
    this.vx = -2;
    this.vy = 1;
  }
};

Ball.prototype.checkColision = function() {
  if (this.x > this.game.canvas.width) {
    this.game.player.points++;
    this.reset(2);
  }
  if (this.x < 0) {
    this.game.player2.points++;
    this.reset(1);
  }

  if (
    this.y - this.radius <= 0 ||
    this.y + this.radius >= this.game.canvas.height
  ) {
    this.vy = -this.vy;
  }

  this.checkColisionPlayer(this.game.player);
  this.checkColisionPlayer(this.game.player2);
};

Ball.prototype.checkColisionPlayer = function(player) {
  if (
    this.y + this.radius >= player.y - player.w / 2 &&
    this.y - this.radius <= player.y + player.h - player.w / 2
  ) {
    //si esta a la altura del player

    if (
      this.x - this.radius == player.x + player.w ||
      this.x + this.radius == player.x
    ) {
      //si choca en la x
      if(this.vx<0) this.vx=2 ;else this.vx =-2; //resetear la vx 
      if(this.vy<0) this.vy=1 ;else this.vy =-1;
      //var otherPlayer;
      
      if(this.checkPowers(player)) return;
      if (player.counterUp > 0) {
        //si el player va hacia arriba
        this.vy = -2;
      } else if (player.counterDown > 0) {
        //si el player va hacia abajo
        this.vy = 2;
      } else {
        //si el player esta parado
        if (
          this.y >= player.y - player.w / 2 + player.h / 2 - this.radius &&
          this.y <= player.y - player.w / 2 + player.h / 2 + this.radius
        ) {
          this.vy = 0;
        } else if (this.vy < 0) {
          this.vy = -1;
        } else {
          this.vy = 1;
        }
      }
    }
  }
};

Ball.prototype.checkPowers = function(player) {
  if (player.powers.boost.isActivated()) {
    player.powers.boost.use();
    return true;
  }
  if (player.powers.shadow.isActivated()) {
    player.powers.shadow.use();
    return true;
  }
  if (player.powers.ultimate.isActivated()) {
    player.powers.ultimate.use();
    return true;
  }
  return false;
};

Ball.prototype.move = function() {
  this.x += this.vx;
  this.y += this.vy;
};

Ball.prototype.draw = function() {
    this.game.ctx.beginPath()
  this.game.ctx.fillStyle = this.color;
  this.game.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
  this.game.ctx.fill();
  this.game.ctx.closePath()
};

Ball.prototype.faster = function() {
  this.vx *= 1.1;
};

Ball.prototype.slower = function() {
  this.vx /= 1.1;
};
