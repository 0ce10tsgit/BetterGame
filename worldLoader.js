//world loading and other util functions
function tileAt(x,y,arr){
  for(let i in arr){
    for(let f in arr[i]){
      if(arr[i][f].x == x && arr[i][f].y == y){
        return arr[i][f]
      }
    }
  }
}
function grid(){
  let fin = []
  let temp = []
  for(let i = 0; i < 50; i++){
    for(let z = 0; z < 50; z++){
      temp.push('b')
    }
    fin.push(temp)
    temp = []
  }
  fin.push(temp)
  return fin
}
function light(x,y,map,alpha){
  let ref = tileAt(x,y,map)
  ref.setVisible(true)
  ref.alpha = alpha
  return true
}
function load(name){
  fetch(name)
  .then(response => response.text())
  .then(fin => {
  localStorage.setItem(name,fin);
  })
  try{
  var raw = localStorage.getItem(name).split(' ')
  }catch(e){
   alert('something went wrong cus replit is stupid') 
  }
  localStorage.removeItem(name)
  var world = []
  let row = []
  for(let i in raw){
    if(raw[i].includes('\n')){
      row.push(raw[i].split('\n')[0])
      world.push(row)
      row = []
      row.push(raw[i].split('\n')[1])
    }
    else{
      row.push(raw[i])
    }
  }
  world.push(row)
  return world
}
function render(arr,colliders,coords=[400,400]){
  let temp = []
  let final = []
  let num = 0
  let world = arr
  let data = []
  let temp2 = []
  let n;
  for(let i in world){
    for(let z in world[i]){
      n = colliders[world[i][z]].create(coords[0],coords[1],world[i][z])
      temp.push(n)
      n.alpha = 0.4
      coords[0] += 32
      num++
      temp2.push({
        key : world[i][z],
        coords : [coords[0],coords[1]]
        })
    }
  coords[0] -= num*32
  num = 0
  coords[1] += 32
  final.push(temp)
  data.push(temp2)
  temp2 = []
  temp = []
  }
  return [final,data]
}
function derender(arr){
  for(let i in arr){
    for(let p in arr[i]){
      arr[i][p].destroy()
    }
  }
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function reset(arr){
  for(let i in arr){
    for(let p in arr[i]){
      arr[i][p].alpha = 0.05
    }
  }
}
function dim(arr){
  for(let i in arr){
    for(let s in arr[i]){
      if(arr[i][s].alpha > 0.0){
        arr[i][s].alpha = arr[i][s].alpha - 0.01
      }
      if(arr[i][s].alpha == 0.0){
        arr[i][s].setVisible(false)
      }
    }
  }
}
function full(ref_arr,alpha){
  ref_arr.forEach(arr => {
    for(let i in arr){
      arr[i].setVisible(true)
      arr[i].alpha = 1
    }
  })
}
function source(map,center,dense=1){
      light(center[0],center[1],map,0.6)
      light(center[0]+32,center[1]+32,map,0.4)
      light(center[0]-32,center[1]-32,map,0.4)
      light(center[0],center[1]+32,map,0.4)
      light(center[0],center[1]-32,map,0.4)
      light(center[0]+32,center[1],map,0.4)
      light(center[0]-32,center[1],map,0.4)
      light(center[0]-32,center[1]+32,map,0.4)
      light(center[0]-32,center[1]+32,map,0.4)
      light(center[0]+32,center[1]-32,map,0.4)
      if(dense > 1){
        light(center[0]+64,center[1]-64,map,0.3)
        light(center[0]+64,center[1]-32,map,0.3)
        light(center[0]+64,center[1],map,0.3)
        light(center[0]+64,center[1]+32,map,0.3)
        light(center[0]+64,center[1]+64,map,0.3)
        light(center[0]+64,center[1]+64,map,0.3)
        light(center[0]-64,center[1]-64,map,0.3)
        light(center[0]-64,center[1]-32,map,0.3)
        light(center[0]-64,center[1],map,0.3)
        light(center[0]-64,center[1]+32,map,0.3)
        light(center[0]-64,center[1]+64,map,0.3)
        light(center[0],center[1]+64,map,0.3)
        light(center[0]-32,center[1]+64,map,0.3)
        light(center[0]+32,center[1]+64,map,0.3)
        light(center[0],center[1]-64,map,0.3)
        light(center[0]-32,center[1]-64,map,0.3)
        light(center[0]+32,center[1]-64,map,0.3)
      }
}
function text(x,y,text){
   this.add.text(x,y,text, { font: 'Courier New '})
}