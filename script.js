window.onload = function() {
  var game;
  document.getElementById("btn-start").onclick = function() {
    startGame();
  };

  function startGame() {
    document.getElementById("main").style.display = "none";
    game = new Game();
    document.getElementById("board").style.display = "block";
    asignKeys()
    game.start();
  }

  function asignKeys(){
      window.onkeydown = function(event){
        if(event.keyCode==UP){
            if(!game.player2.checkColisionUp()){
                game.player2.counterUp++
                console.log(game.player2.counterUp)
                game.player2.vy=-2

            }
        }else if(event.keyCode==DOWN){
            if(!game.player2.checkColisionDown()){
                game.player2.counterDown++
                game.player2.vy=2

            }
        }

        if(W.includes(event.keyCode)){
            if(!game.player.checkColisionUp()){
                game.player.counterUp++
                game.player.vy=-2

            }
        }else if(S.includes(event.keyCode)){
            if(!game.player.checkColisionDown()){
                game.player.counterDown++
                game.player.vy=2

            }
        }
      }

      window.onkeyup = function(event){
        if(event.keyCode==UP){
            game.player2.vy=0
            game.player2.counterUp = 0
        }else if(event.keyCode==DOWN){
            game.player2.vy=0
            game.player2.counterDown = 0
        }

        if(W.includes(event.keyCode)){
            game.player.vy=0
            game.player.counterUp = 0
        }else if(S.includes(event.keyCode)){
            game.player.vy=0
            game.player.counterDown = 0
        }
      }
  }

  var UP = 38
  var DOWN =40
  var W = [87, 119]
  var S= [83 ,115]
};
