//COORDINATES GOES IN ORDER OF YX NOT XY
class Main extends Phaser.Scene{
  constructor(){
    super('Main');
  }
  preload(){
    this.load.image('g', 'assets/grass.png')
    this.load.image('b','assets/block.png')
    this.load.image('main','assets/sprite.png')
    this.load.image('cursor','assets/cursor.png')
    this.load.image('light','assets/light.png')
    this.load.image('gen','assets/gen.png')
    this.load.image('clik','assets/clik.png')
  }
  create(){
    this.colliders = {
      g: this.physics.add.group(),
      b: this.physics.add.group()
    }
    this.objects = this.physics.add.group()
    this.objects_data = []
    this.clik = this.physics.add.sprite(48,48,'clik').setDepth(1)
    this.gen1 = this.physics.add.sprite(304,432,'gen').setDepth(1)
    this.quantam = this.physics.add.sprite(576,576,'gen').setDepth(1)
    this.npc = this.physics.add.sprite(848,848,'main').setDepth(1)
    this.objects_data.push(new gen('name',[304,432],[[496,432]],this.clik,this))
    this.objects_data.push(new npc('name',[848,848],this,this.npc))
    this.objects_data.push(new quantam_obj(this,this.quantam,[[544,544]]))
    this.objects.add(this.gen1)
    this.objects.add(this.npc)
    this.objects.add(this.quantam)
    let l2 = grid()
    let r = render(l2,this.colliders,[48,48])
    this.current = r[0]
    this.data = r[1]
    this.player = this.physics.add.sprite(800,800,'main')
    this.cursor = this.physics.add.sprite(48,48,'cursor')
    this.cameras.main.startFollow(this.player)
    this.sel = [400,400]
    this.flashLight = this.physics.add.sprite(48,48,'light').setVisible(true)
    this.dim = setInterval(dim,2.5,this.current)
  }
  update(){
    let mouse = this.input.mousePointer
    let acx = (mouse.x-(532-this.player.x)-224).toFixed(1);
    let acy = (mouse.y-(532-this.player.y)+160).toFixed(1);
    let fixed = [(Math.floor(acx / 32) * 32)+16,(Math.floor(acy / 32) * 32)+16]
    let cursors = this.input.keyboard.createCursorKeys();
    let velocity = 75
    if (cursors.left.isDown){  
      this.player.setVelocityX(-velocity);
    }else if (cursors.right.isDown){
    this.player.setVelocityX(velocity)
    }
    else{
     this.player.setVelocityX(0)
    }
    if (cursors.up.isDown){
      this.player.setVelocityY(-velocity);
    }else if(cursors.down.isDown){
      this.player.setVelocityY(velocity);
    }else{
      this.player.setVelocityY(0)
    }
    let pc = [parseInt((Math.floor(this.player.x / 32) * 32)+16),parseInt((Math.floor(this.player.y / 32) * 32)+16)]
    this.cursor.setPosition(fixed[0],fixed[1])
    //main player proximity light

    if(this.sel[0] != pc[0] || this.sel[1] != pc[1]){
      this.sel = pc
      console.log(this.sel)
      console.log(this.distance)
    }
    try{
      light(pc[0],pc[1],this.current,0.8)
      light(pc[0]+32,pc[1],this.current,0.6)
      light(pc[0]-32,pc[1],this.current,0.6)
      light(pc[0],pc[1]+32,this.current,0.6)
      light(pc[0],pc[1]-32,this.current,0.6)
      light(pc[0]-32,pc[1]+32,this.current,0.6)
      light(pc[0]+32,pc[1]-32,this.current,0.6)
    }
    catch(e){}
    this.flashLight.setPosition(this.player.x,this.player.y)
    this.distance = (Math.sqrt(((fixed[0] - pc[0])*(fixed[0] - pc[0]))+((fixed[1] - pc[1])*(fixed[1] - pc[1])))/32).toFixed()
    try{
    if(this.distance < 10){
      light(fixed[0],fixed[1],this.current,1.0-this.distance/10)
      light(fixed[0],fixed[1]+32,this.current,1.0-this.distance/10)
      light(fixed[0],fixed[1]-32,this.current,1.0-this.distance/10)
      light(fixed[0]+32,fixed[1],this.current,1.0-this.distance/10)
      light(fixed[0]-32,fixed[1],this.current,1.0-this.distance/10)
      light(fixed[0]+32,fixed[1]-32,this.current,1.0-this.distance/10)
      light(fixed[0]-32,fixed[1]+32,this.current,1.0-this.distance/10)
      light(fixed[0]-32,fixed[1]-32,this.current,1.0-this.distance/10)
    }
    }
    catch(e){}
    let objs = this.objects.getChildren()
    for(let i in objs){
      try{
      objs[i].alpha = tileAt(objs[i].x,objs[i].y,this.current).alpha
      }
      catch(e){}
      this.objects_data[i].call_this(pc,this.current)
      if(objs[i].alpha == 0){
        objs[i].setVisible(false)
      }
      else{
        objs[i].setVisible(true)
      }
    }
    }
  }