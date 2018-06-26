window.onload = function() {
  var game;
  document.getElementById("btn-start").onclick = function() {
    startGame();
  };

  function startGame() {
    document.getElementById("main").style.display = "none";
    game = new Game();
    document.getElementById("board").style.display = "block";
    asignKeys1vs1();
    game.player2.ia=true
    game.start();
  }

  var mapaTeclado = {
    up: 38,
    down: 40,
    w: 87,
    s: 83,
    q: 81,
    e: 69,
    r: 82,
    p: 80,
    o: 79,
    i: 73
  };

  function asignKeys1vs1() {
    window.onkeydown = function(event) {
      switch (event.keyCode) {
        case mapaTeclado.w:
          if (!game.player.checkColisionUp()) {
            game.player.vy = -game.player.vy0;
            game.player.counterUp++;
          }
          break;
        case mapaTeclado.s:
          if (!game.player.checkColisionDown()) {
            game.player.vy = game.player.vy0;
            game.player.counterDown++;
          }
          break;
      }
    };

    window.onkeyup = function(event) {
      switch (event.keyCode) {
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
          game.player.powers.superboost.activate();
          break;
      }
    };
  }
  function asignKeys1vsIA() {
    window.onkeydown = function(event) {
      switch (event.keyCode) {
        case mapaTeclado.up:
          if (!game.player2.checkColisionUp()) {
            game.player2.vy = -game.player2.vy0;
            game.player2.counterUp++;
          }

          break;
        case mapaTeclado.down:
          if (!game.player2.checkColisionDown()) {
            game.player2.vy = game.player2.vy0;
            game.player2.counterDown++;
          }

          break;
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

        case mapaTeclado.p:
          game.player2.powers.boost.activate();
          break;
        case mapaTeclado.o:
          game.player2.powers.shadow.activate();
          break;
        case mapaTeclado.i:
          game.player2.powers.superboost.activate();
          break;
      }
    };
  }
};
