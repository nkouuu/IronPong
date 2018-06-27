function Ball(game) {
  this.game = game;
  this.x = this.game.canvas.width / 2;
  this.y = this.game.canvas.height / 2;
  this.vx0 = this.game.canvas.width / (this.game.fps * 1.5);
  this.vy0 = this.game.canvas.height / (this.game.fps * 1.5);
  this.vx = -this.vx0 / 2;
  this.vy = -this.vy0;
  this.color = "black";
  this.radius = 10;
}

Ball.prototype.reset = function(p) {
  this.x = this.game.canvas.width / 2;
  this.y = this.game.canvas.height / 2;
  var act = p;
  /*while(act!=0) {
      var act2 = new Date()
      if(act2 - act >3000) act = 0
  }*/
  //this.game.newPoint()
 setTimeout(function(){
      this.game.newPoint()

 },2)
    if (act == 2) {
      this.vx = this.vx0 / 2;
      this.vy = this.vy0;
    } else if (act == 1) {
      this.vx = -this.vx0 / 2;
      this.vy = -this.vy0;
    }
  
};

Ball.prototype.checkColision = function() {
  //si se puntua
  if (this.x  -this.radius*2  > this.game.canvas.width) {
    this.game.player.points++;
    this.reset(2);
    return true
  }
  if (this.x + this.radius*2 < 0) {
    this.game.player2.points++;
    this.reset(1);
    return true
  }
  //si choca en techo o suelo
  if (this.y - this.radius < 0) {
    this.y = 1 + this.radius; // lo adelanto un poco para que no se solapen varias condiciones
    this.vy = -this.vy;
    return true
  }

  if (this.y + this.radius > this.game.canvas.height) {
    this.y = this.game.canvas.height - this.radius - 1;
    this.vy = -this.vy;
    return true
  }

  this.checkColisionPlayer(this.game.player);
  this.checkColisionPlayer(this.game.player2);
};

Ball.prototype.checkColisionPlayer = function(player) {
  var action = 0;
  if (this.x - this.radius < player.x + player.w && player.x < 10) {    // si shoca con el primer player en x
    if (//si choca en y
      this.y + this.radius >= player.y - player.w / 2 &&
      this.y - this.radius <= player.y + player.h - player.w / 2
    ) {
      this.x = player.x + player.w + this.radius + 1;
      action = 1;
    } else return;
  } else if (this.x + this.radius > player.x && player.x > 50) {    //si choca con player2 en x
    if (//si choca en y
      this.y + this.radius >= player.y - player.w / 2 &&
      this.y - this.radius <= player.y + player.h - player.w / 2
    ) {
      this.x = player.x - this.radius - 1;
      action = 1;
    } else return;
  }
  if (action) {//si hay colision
    if (this.vx < 0) this.vx = this.vx0;//cambiamos sentido y reseteamos la velocidad
    else this.vx = -this.vx0;   
    if (this.vy < 0) this.vy = this.vy0;
    else this.vy = -this.vy0;

    if (this.checkPowers(player)) return;
    if (player.counterUp > 0) {      //si el player va hacia arriba
      this.vy = -this.vy0 * player.counterUp;
      this.vx = this.vx * 2;
    } else if (player.counterDown > 0) {      //si el player va hacia abajo
      this.vy = this.vy0 * player.counterDown;
      this.vx = this.vx * 2;
    } else {      //si el player esta parado
      if (
        this.y >= player.y - player.w / 2 + player.h / 2 - this.radius &&
        this.y <= player.y - player.w / 2 + player.h / 2 + this.radius
      ) {
        this.vy = 0;
      } else if (this.vy < 0) {
        this.vy = this.vy0 / 2;
      } else {
        this.vy = -this.vy0 / 2;
      }
    }
    this.color="black"
    return true
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
  if (player.powers.superboost.isActivated()) {
    player.powers.superboost.use();
    return true;
  }
  return false;
};

Ball.prototype.move = function() {
  this.x += this.vx;
  this.y += this.vy;
};

Ball.prototype.draw = function() {
  this.game.ctx.beginPath();
  this.game.ctx.fillStyle = this.color;
  this.game.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
  this.game.ctx.fill();
  this.game.ctx.closePath();
};

/*Ball.prototype.faster = function() {
  this.vx *= 1.1;
};

Ball.prototype.slower = function() {
  this.vx /= 1.1;
};*/
