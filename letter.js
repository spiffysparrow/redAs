var lib = {}

lib.totalAs = 0
lib.pageConstants = []

lib.clickDraw = function(e) {
  console.log("--Total As " + lib.totalAs);
  var pos = lib.getRandomPointOnCircle()
  var angle = pos[2]
  pos = pos.slice(0, 2)
  var a1 = new lib.LetterA(pos, 1);
  a1.angle = angle;
  a1.render()
  lib.createRing(a1)
  var c = lib.canvas
  c.beginPath();
  c.moveTo(e.pageX, e.pageY)
  c.lineTo(pos[0], pos[1]);
  c.lineWidth = 1;
  c.strokeStyle = 'red';
  c.stroke();

  lib.totalAs++;

}

window.onload = function(){
  console.log("loaded!")
  document.onmousedown = lib.clickDraw;
}

lib.fall = function(subject, moved) {
  var moved = moved || 0
  var c = lib.canvas;
  c.clearRect(0, 0, canvas.width, canvas.height);
  subject.move(moved, moved)
  moved++;
  subject.render(c)
  lib.drawPageConstants()
  if(subject.pos[0] < 800){
    requestAnimationFrame(function(){
      lib.fall(subject, moved)
    })
  }
}

lib.createRing = function(subject) {

  function addA(angle, i){
    var newPos = lib.findCirclePosOffset(subject.angle, .05*i*i)
    var a1 = new lib.LetterA(newPos, 1);
    a1.render()
    lib.pageConstants.push(a1)

    var newPos = lib.findCirclePosOffset(subject.angle, .05*i*i*-1)
    var a2 = new lib.LetterA(newPos, 1);
    a2.render()
    lib.pageConstants.push(a2)
    console.log(i)

    i++;
    if(i < 8){
      setTimeout(function(){
        addA(angle, i);
      }, 50)
    }
  }

  addA(subject.angle, 0);
}



lib.findCirclePosOffset = function(startAngle, offset) {
  var center = [300, 300]
  var radius = 200;
  var angle = startAngle + offset
  var x = Math.cos(angle)*radius;
  var y = Math.sin(angle)*radius;
  x = Math.round(x)
  y = Math.round(y)
  var newPos = [x + center[0], y + center[1]]
  return newPos
}


lib.drawPageConstants = function() {
  lib.pageConstants.forEach(function(item){
    var c = lib.canvas
    item.render(c)
  });
};


lib.getRandomPointOnCircle = function() {
  var center = [300, 300]
  var radius = 200;
  var angle = Math.random()*Math.PI*2;
  var x = Math.cos(angle)*radius;
  var y = Math.sin(angle)*radius;
  x = Math.round(x)
  y = Math.round(y)
  return [x + center[0], y + center[1], angle]
}


lib.myAnimation = function(canvas){

  var c = canvas.getContext('2d');
  lib.canvas = c
  var a2 = new lib.LetterA([200, 200], 3);
  lib.fall(a2);

}



lib.LetterA = function(pos, size){
  this.size = size;
  var shadeOfRed = Math.floor(Math.random()*70)
  this.color = "rgba(158, "+ shadeOfRed +", 22, 1)"
  console.log("rgba(158, "+ shadeOfRed +", 22, 1)");
  this.pos = pos;
  this.angle = null
  this.streek = 0;
  this.currentMove = null
}

lib.LetterA.prototype.render = function() {
  var c = lib.canvas
  c.fillStyle = this.color;
  var x = this.pos[0]
  var y = this.pos[1]
  var size = this.size
  c.beginPath();
  c.moveTo(x, y);
  c.lineTo(x + 10 * size, y - 20 * size);
  c.lineTo(x + 20 * size, y);
  c.moveTo(x + 2.5 * size, y - 5 * size);
  c.lineTo(x + 20 * size, y - 5 * size);
  c.lineWidth = 4;
  c.strokeStyle = this.color;
  c.stroke();
  lib.totalAs++;
};


lib.LetterA.prototype.move = function (dx, dy) {
  this.pos[0] += dx
  this.pos[1] += dy
};
