function Ball(game){
    this.game = game
    this.x = 450
    this.y = 300
    this.vx = -1
    this.vy = -1
    this.color = "#010d01"
    this.radius=10
}

Ball.prototype.reset = function (p){
    this.x=450
    this.y=300
    if(p==2){
        this.vx = 1 
        this.vy = 1
    }else if(p==1){
        this.vx = -1
        this.vy = 1
    }
    
}

Ball.prototype.checkColision = function(){
    if(this.x > this.game.canvas.width){
        this.game.player.points++
        this.reset(2)
    }
    if(this.x < 0){
        this.game.player2.points++
        this.reset(1)
    }

    if(this.y-this.radius <= 0 || this.y+this.radius >=this.game.canvas.height){
        this.vy = -this.vy
    }
    
    this.checkColisionPlayer(this.game.player)
    this.checkColisionPlayer(this.game.player2)

}

Ball.prototype.checkColisionPlayer = function(player){
    if(this.y >= player.y-player.w && this.y<= player.y+player.h-player.w){
        
        
        if(this.x-this.radius == player.x+player.w || this.x+this.radius == player.x){
            this.vx = -this.vx
            if(player.counterUp>0){
                this.vy = -2
            }else if(player.counterDown>0){
                this.vy = 2
            }else{
                if(this.y  >= player.y - player.w/2 + player.h/2 - this.radius &&
                    this.y  <= player.y - player.w/2 + player.h/2 + this.radius){
                    this.vy = 0
                }
            }
        }
        
    }
}


Ball.prototype.move = function(){
    this.x+=this.vx
    this.y+=this.vy
}

Ball.prototype.draw = function(){
    this.game.ctx.fillStyle = this.color
    this.game.ctx.arc(this.x,this.y,this.radius,0,Math.PI*2,false)
    this.game.ctx.fill()
}

Ball.prototype.faster = function(){
    this.vx*=1.1

}

Ball.prototype.slower = function(){
    this.vx/=1.1
}