function Game (){
    this.canvas = document.getElementById("canvas")
    this.ctx = this.canvas.getContext("2d")
    this.player = new Player(this)
    this.player.x = 2
    this.player2 = new Player(this)
    this.player2.x = this.canvas.width - this.player2.w - 2
    this.ball = new Ball(this)
    this.ball2=""
    this.backgroundColor = "#F5F5F5"
    this.asignPowers()
    
}

Game.prototype.asignPowers = function(){
    var p,p2
    p = new Superpower("Boost",this,this.player)
    p2 = new Superpower("Boost",this,this.player2)
    this.player.powers.boost=p
    this.player2.powers.boost=p2

    p = new Superpower("Shadow",this,this.player)
    p2 = new Superpower("Shadow",this,this.player2)
    this.player.powers.shadow=p
    this.player2.powers.shadow=p2

    p = new Superpower("Ultimate",this,this.player)
    p2 = new Superpower("Ultimate",this,this.player2)
    this.player.powers.ultimate=p
    this.player2.powers.ultimate=p2
}

Game.prototype.start = function(){
    var that = this
    this.interval = setInterval ( function(){
        that.clear()
        that.drawAll()
        that.moveAll()
        that.checkColisions()
        //this.moveAll()
    })
}

Game.prototype.checkColisions = function(){
    this.ball.checkColision()
    if(this.ball2!="") this.ball2.checkColision()
    this.player.checkColisionUp()
    this.player.checkColisionDown()
    this.player2.checkColisionUp()
    this.player2.checkColisionDown()
    

}


Game.prototype.drawBackground = function(){
    this.ctx.beginPath()
    this.ctx.fillStyle = this.backgroundColor
    this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height)
    this.ctx.fillStyle = "black"
    this.ctx.moveTo(this.canvas.width/2,0)
    this.ctx.setLineDash([5, 3]);
    this.ctx.lineTo(this.canvas.width/2,this.canvas.height)
    this.ctx.stroke()
    this.ctx.closePath()

}

Game.prototype.clear = function(){
    this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)
}


Game.prototype.drawAll = function(){
    this.drawBackground()
    this.player.draw()
    this.player2.draw()
    this.ball.draw()
    if(this.ball2!="") this.ball2.draw()
    this.drawPoints()
}

Game.prototype.drawPoints = function(){
    this.ctx.fillStyle = "grey"  
    this.ctx.font = "20px Arial"
    this.ctx.fillText(this.player.points,this.canvas.width/4,20) 
    this.ctx.fillText(this.player2.points,this.canvas.width/4*3,20)   
}

Game.prototype.moveAll = function (){
    this.ball.move()
    if(this.ball2!="") this.ball2.move()
    this.player.move()
    this.player2.move()
}

Game.prototype.newPoint =  function(){
    this.player.reset(1)
    this.player2.reset(2)
   
}