function Superpower(name,game,player){
    this.game = game
    this.player = player
    this.name = name
    this.activated = false
    this.used = false
    this.cooldown = 0

}

Superpower.prototype.activate = function (){
    if(this.cooldown == 0){
        this.activated = true

    }
}

Superpower.prototype.use = function(){
    this.activated = false
    this.used = true
    if(this.name=="Boost"){
        this.cooldown = 5
        this.game.ball.vx = this.game.ball.vx*2
        this.wait()

    } 
    if(this.name=="Shadow"){
        this.cooldown = 5
        this.game.ball2 = new Ball(this.game)
        this.game.ball2.vx = -this.game.ball.vx
        this.game.ball2.vy = -this.game.ball.vy
        this.game.ball2.x =this.game.ball.x
        this.game.ball2.y =this.game.ball.y
        var that = this
        var interval=setInterval(function(){
            if(that.game.ball2.x == that.game.canvas.width/2){
                that.game.ball2=""
                clearInterval(interval)
            }

        })
        this.wait()
    }
    if(this.name=="Ultimate"){
        this.cooldown = 15
        if(Math.abs(this.game.ball.vy)<2){
            this.game.ball.vy = this.game.ball.vy*8
            this.game.ball.vx = this.game.ball.vx*2
        }  else{
            this.game.ball.vy = this.game.ball.vy*4
            this.game.ball.vx = this.game.ball.vx*2

        }
        this.wait()
    }

}

Superpower.prototype.wait = function(){
    var that2 = this
    var inter =setInterval(function(){
        that2.cooldown--
        if(that2.cooldown==0){
            clearInterval(inter)
            
        }
        
    },1000)
}

Superpower.prototype.isActivated = function(){
    return this.activated
}
Superpower.prototype.isUsed = function(){
    return this.used
}

Superpower.prototype.draw = function (){

}

Superpower.prototype.finish = function(){
    this.used = false
}