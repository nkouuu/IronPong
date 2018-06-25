window.onload = function() {
  var game;
  document.getElementById("btn-start").onclick = function() {
    startGame();
  };

  function startGame() {
    document.getElementById("main").style.display = "none";
    game = new Game();
    document.getElementById("board").style.display = "block";
    asignKeys();
    game.start();
  }

  

  var mapaTeclado = {
      up: 38,
      down: 40,
      w:87,
      s:83,
      q:81,
      e:69,
      r:82,
      p:80,
      o:79,
      i:73
 }

  function asignKeys() {
    window.onkeydown = function(event) {
      if (mapaTeclado.up==event.keyCode) {
        if (!game.player2.checkColisionUp()) {
          game.player2.counterUp++;
          game.player2.vy = -2;
        }
      } else if (mapaTeclado.down==event.keyCode ) {
        if (!game.player2.checkColisionDown()) {
          game.player2.counterDown++;
          game.player2.vy = 2;
        }
      }

      if (mapaTeclado.w==event.keyCode) {
        if (!game.player.checkColisionUp()) {
          game.player.counterUp++;
          game.player.vy = -2;
        }
      } else if (mapaTeclado.s==event.keyCode) {
        if (!game.player.checkColisionDown()) {
          game.player.counterDown++;
          game.player.vy = 2;
        }
      }
    };

    window.onkeyup = function(event) {
      switch (event.keyCode) {
        case mapaTeclado.up:
          game.player2.vy = 0;
          game.player2.counterUp = 0;
          break;
        case mapaTeclado.down:
          game.player2.vy = 0;
          game.player2.counterDown = 0;
          break;
        case mapaTeclado.w:
          game.player.vy = 0;
          game.player.counterUp = 0;
          break;
        case mapaTeclado.s:
          game.player.vy = 0;
          game.player.counterDown = 0;
          break;
        case mapaTeclado.q:
          game.player.powers.boost.activate();
          break;
        case mapaTeclado.e:
          game.player.powers.shadow.activate();
          break;
        case mapaTeclado.r:
          game.player.powers.ultimate.activate();
          break;
        case mapaTeclado.p:
          game.player2.powers.boost.activate();
          break;
        case mapaTeclado.o:
          game.player2.powers.shadow.activate();
          break;
        case mapaTeclado.i:
          game.player2.powers.ultimate.activate();
          break;
      }
    };
  }

 
};
