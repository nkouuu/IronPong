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
    var that = this

    this.activated = false
    this.used = true
    if(this.name=="Boost"){
        this.cooldown = 5
        this.game.boost.play()
        this.game.ball.vx = this.game.ball.vx*2.5
        this.game.ball.vy = this.game.ball.vy*2
        this.game.ball.color ="rgb(247, 233, 45)"

    } 
    if(this.name=="Shadow"){
        this.cooldown = 5
        this.game.shadow.play()
        this.game.ball.color = "white"
        this.game.ball2 = new Ball(this.game)
        this.game.ball2.x =this.game.ball.x
        this.game.ball2.y =this.game.ball.y
        this.game.ball2.vx = -this.game.ball.vx
        this.game.ball2.vy = -this.game.ball.vy
        
        var interval=setInterval(function(){
            if(that.game.player==that.player){
                if(that.game.ball2.x >= that.game.canvas.width*0.6){
                    that.game.ball2=""
                    clearInterval(interval)
                }
    
            }else{
                if(that.game.ball2.x <= that.game.canvas.width*0.4){
                    that.game.ball2=""
                    clearInterval(interval)
                }
            }
            
        })
    }
    if(this.name=="SuperBoost"){
        this.game.superboost.play()
        this.cooldown = 15
        if(Math.abs(this.game.ball.vy)< this.game.ball.vy0*2){
            this.game.ball.vy = this.game.ball.vy*8
            this.game.ball.vx = this.game.ball.vx*2
        }  else{
            this.game.ball.vy = this.game.ball.vy*4
            this.game.ball.vx = this.game.ball.vx*2

        }
        this.game.ball.color ="rgb(248, 21, 21)"
        
    }
    this.wait()
    this.drawCooldown()

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

Superpower.prototype.drawCooldown = function (){
    var that=this
    var i=setInterval(function(){
       if(that.cooldown>9){
           that.counter.innerText="00:"+that.cooldown
       }else if(that.cooldown>0){
        that.counter.innerText="00:0"+that.cooldown
       }else{
           that.counter.innerText=""
           clearInterval(i)
       }

    })
}

Superpower.prototype.finish = function(){
    this.used = false
}