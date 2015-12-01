
lib.totalAs = 0
lib.pageConstants = []

lib.clickLifted = true;
lib.growingA = null;

document.onmousedown = function (e) {
  lib.clickLifted = false;
  setTimeout(function(){
    if(!lib.clickLifted){
      var a1 = new LetterA([e.pageX, e.pageY], .5)
      lib.grow(a1, .1);
    }
  }, 200)
};

document.onmouseup = function (e) {
  lib.clickLifted = true;
  if(lib.growingA === null ){
    if(lib.totalAs > 1000){

    }else{
      lib.clickDraw(e);
    }
  }else{
    lib.fall(lib.growingA, 0)
  }
};

lib.clickDraw = function(e) {
  // console.log("--Total As " + lib.totalAs);

  var randCirclePos = lib.getRandomPointOnCircle()
  var angle = randCirclePos[2]
  randCirclePos = randCirclePos.slice(0, 2)

  lib.renderAsOnCircle(randCirclePos, angle);

  lib.lineToPoint([e.pageX, e.pageY], randCirclePos)

  lib.totalAs++;
}

lib.renderAsOnCircle = function(randCirclePos, angle) {
  var a1 = new LetterA(randCirclePos, 1);
  a1.angle = angle;
  a1.render()
  lib.createRing(a1)
}

lib.lineToPoint = function(start, end){
  var c = lib.canvas
  c.beginPath();
  c.moveTo(start[0], start[1])
  c.lineTo(end[0], end[1]);
  c.lineWidth = 1;
  c.strokeStyle = 'red';
  c.stroke();
}

lib.createRing = function(subject) {

  function addOneA(angle, i, negative){
    var newPos = lib.findCirclePosOffset(subject.angle, .05*i*i * negative)
    var a1 = new LetterA(newPos, 1);
    a1.render()
    lib.pageConstants.push(a1)
  }

  function addEachA(angle, i){
    addOneA(angle, i, 1)
    addOneA(angle, i, -1)

    i++;
    if(i < 8){
      setTimeout(function(){
        addEachA(angle, i);
      }, 50);
    }
  }

  addEachA(subject.angle, 0);
}


lib.findCirclePosOffset = function(startAngle, offset) {
  var angle = startAngle + offset
  var pos = lib.getPointOnCircle(angle)
  return pos
}

lib.getPointOnCircle = function(angle){
  var center = [300, 300]
  var radius = 200;
  var x = Math.cos(angle)*radius;
  var y = Math.sin(angle)*radius;
  x = Math.round(x)
  y = Math.round(y)
  return [x + center[0], y + center[1]]
}

lib.getRandomPointOnCircle = function() {
  var angle = Math.random()*Math.PI*2;
  var pos = lib.getPointOnCircle(angle)
  return [pos[0], pos[1], angle]
}


lib.myAnimation = function(canvas){
  var c = canvas.getContext('2d');
  lib.canvas = c
  var a2 = new LetterA([200, 200], 3);
  lib.fall(a2);
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

lib.grow = function(subject) {
  if (lib.growingA === null){
    lib.growingA = subject;
  }
  var c = lib.canvas;
  c.clearRect(0, 0, canvas.width, canvas.height);
  subject.size += .1;
  console.log(subject);
  subject.render(c)
  lib.drawPageConstants()
  console.log(lib.clickLifted);
  if(lib.clickLifted === false){
    requestAnimationFrame(function(){
      lib.grow(subject)
    })
    }else{
      lib.growingA = null
  }
}

lib.drawPageConstants = function() {
  lib.pageConstants.forEach(function(item){
    var c = lib.canvas
    item.render(c)
  });
};
