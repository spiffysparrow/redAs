
var lib = {}

LetterA = function(pos, size){
  this.size = size;
  var shadeOfRed = Math.floor(Math.random()*70)
  this.color = "rgba(158, "+ shadeOfRed +", 22, 1)"
  // console.log("rgba(158, "+ shadeOfRed +", 22, 1)");
  this.pos = pos;
  this.angle = null
  this.streek = 0;
  this.currentMove = null
}

LetterA.prototype.render = function() {
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


LetterA.prototype.move = function (dx, dy) {
  this.pos[0] += dx
  this.pos[1] += dy
};
