class gen{
  constructor(name,xy,nodes,click,game){
    this.game = game
    this.clik = click
    this.name = name
    this.xy = xy
    this.nodes = nodes
    this.map;
    this.fireControl = false
  }
  call_this(pc,newmap){
    this.map = newmap
    let d = (Math.sqrt(((this.xy[0] - pc[0])*(this.xy[0] - pc[0]))+((this.xy[1] - pc[1])*(this.xy[1] - pc[1])))/32).toFixed()
      if(d < 1.5){
        this.clik.setPosition(this.xy[0],this.xy[1])
        this.clik.setVisible(true)
        this.clik.setAlpha(1)
      }
      else{
        this.clik.setVisible(false)
      }
    if(this.xy[0] == pc[0] && this.xy[1] == pc[1]){
      this.fireControl = true
    }                                                                                                                                                            
    if(this.fireControl){
      this.activateNodes()
    }
    }
  activateNodes(){
    for(let i in this.nodes){
      source(this.map,this.nodes[i],2)
    }
  }
  }
class npc{
  constructor(name,xy,game,obj){
    this.name = name
    this.xy = xy
    this.map;
    this.control = false
    this.game = game
    this.obj = obj
    this.text = this.game.add.text(this.xy[0], this.xy[1], 'NPC text', { font: "30px Arial Black", fill: "#fff" });
  }
  call_this(pc,newmap){
  if(this.xy[0] == pc[0] && this.xy[1] == pc[1]){
      if(!this.control){
        this.control = true
        this.text.setVisible(true).setDepth(1)
        this.text.alpha = this.obj.alpha
      }
  }
  else{
    this.control = false
    this.text.setVisible(false)
  }
}
}
class quantam_obj{
  constructor(game,obj,locations){
    this.game = game
    this.obj = obj
    this.map;
    this.locations = locations
    
  }
  call_this(pc,newmap){
    this.map = newmap
    if(this.obj.alpha == 0){
      for(let i in this.locations){
        if([this.obj.x,this.obj.y] != this.locations[i] && tileAt(this.locations[i][0],this.locations[i][1]).alpha == 0){
          this.obj.setPosition(this.locations[i][0],this.locations[i][1])
        }
      }
      }
    }
}