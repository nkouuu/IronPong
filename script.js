window.onload = function() {
  var game;
  document.getElementById("btn-1vsIA").onclick = function() {
    document.getElementById("modes").style.display="none";
    document.getElementById("levels").style.display="block";
  };
  document.getElementById("btn-1vsIAEasy").onclick = function() {
    startGame()
    startGame1vsIA(1);
  };
  document.getElementById("btn-1vsIANormal").onclick = function() {
    startGame()
    startGame1vsIA(2);
  };
  document.getElementById("btn-1vsIAHard").onclick = function() {
    startGame()
    startGame1vsIA(4);
  };
  document.getElementById("btn-1vs1").onclick = function() {
    startGame()
    startGame1vs1();
  };


  function startGame(){
    document.getElementById("main").style.display = "none";
    game = new Game();
    document.getElementById("board").style.display = "flex";
    document.getElementById("board").style.justifyContent = "space-around";
    document.getElementById("powers").style.display="flex"
    document.getElementById("powers").style.flexDirection="column"
    document.getElementById("powers").style.justifyContent="space-around"
    document.getElementById("powers2").style.display="flex"
    document.getElementById("powers2").style.flexDirection="column"
    document.getElementById("powers2").style.justifyContent="space-around"
  }

  function startGame1vsIA(level) {
    var powers2=document.getElementById("powers2")
    var divs=powers2.getElementsByTagName("div")
    for(var i=0;i<divs.length;i++){
        divs[i].style.display="none"
    }
    asignKeys(false);
    game.player2.ia = true
    game.player2.vy0=game.player2.vy0*level
    var pow = 10000
    setInterval(setRandomPower,pow/level)
    game.start();
   
  }
  function startGame1vs1() {
    asignKeys(true);
    game.start();
   
  }


  function setRandomPower(){
    var index = Math.floor(Math.random()*3)
    switch (index){
        case 0: if(!game.player2.powers.boost.isActivated()){
            game.player2.powers.boost.activate()
        }
        break;
        case 1:  if(!game.player2.powers.shadow.isActivated()){
            game.player2.powers.shadow.activate()
        }
        break;
        case 2 : if(!game.player2.powers.superboost.isActivated()){
            game.player2.powers.superboost.activate()
        }
        break;
    }
    
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

  function asignKeys(player2) {
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
      if(player2){
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
      if(player2){
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
      }
    };
  }
  
    

   
};
