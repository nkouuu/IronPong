function Player(game,ia){
    this.game = game
    this.w = 20
    this.h = 80
    this.x = 0
    this.y = this.game.canvas.height/2 - this.h/2 + this.w/2
    this.vy0 = (this.game.canvas.height) / (this.game.fps)
    this.vy = 0
    this.color = "black"
    this.counterUp = 0
    this.counterDown = 0
    this.points = 0
    this.powers = {}
    this.ia = false
    

}
 



Player.prototype.move = function(){
    
    if(this.ia){
        
        if(this.game.ball.x > this.game.canvas.width*0.3){
            if(this.game.ball.y < this.y){
                this.vy=-this.vy0
                this.checkColisionUp()
                

            }else if(this.game.ball.y > this.y+this.h-this.w/2){
                this.vy=this.vy0
                this.checkColisionDown()

            }
            
        }else {
            this.vy=0

        }

        
    }
    this.y+=this.vy
    this.checkColisionDown()
    this.checkColisionUp()
}

Player.prototype.draw = function(){
    this.game.ctx.fillStyle = this.color
    this.game.ctx.beginPath()
    this.game.ctx.moveTo(this.x +this.w/2,this.y)
    this.game.ctx.arc(this.x + this.w/2,this.y ,this.w/2,Math.PI,0,false)
    this.game.ctx.fill()
    this.game.ctx.moveTo(this.x,this.y)
    this.game.ctx.fillRect(this.x ,this.y, this.w,this.h-this.w)
    this.game.ctx.moveTo(this.x +this.w/2,this.y+this.h-this.w)
    this.game.ctx.arc(this.x + this.w/2,this.y +this.h-this.w,this.w/2,Math.PI,0,true)
    this.game.ctx.fill()
    this.game.ctx.closePath()

}

Player.prototype.checkColisionUp = function(){
    if(this.y - this.w/2 <= 1){
        this.vy=0
        return true
    }
    
    return false;
}

Player.prototype.checkColisionDown = function(){
    if(this.y+this.h-this.w/2 >= this.game.canvas.height-1){
        this.vy=0
        return true
    }
    return false;
}


Player.prototype.reset = function(p){
    
     this.y = this.game.canvas.height/2 - this.h/2 + this.w/2
}