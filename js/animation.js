var canvas,
 stage,
 width = 650,
 height = 400,
 particles = [],
 max = 15,
 mouseX = 0,
 mouseY = 0,

 speed = 10,
 size = 20;

function Particle(x, y, xs, ys) {
  this.x = x;
  this.y = y;
  this.xs = xs;
  this.ys = ys;
  this.life = 0;
}

function resizeCanvas() {
  setTimeout(function() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    mouseX = canvas.width / 2;
    mouseY = canvas.height * 0.5;
   stage.globalCompositeOperation = "lighter";
  }, 0);
}

function init() {

  canvas=document.getElementById("canvas");

  resizeCanvas();

  if (canvas.getContext) {

    stage = canvas.getContext("2d");
    canvas.addEventListener("mousemove", getMousePos);

    window.addEventListener("resize", function() {
      resizeCanvas();
      stage.globalCompositeOperation="lighter";
      mouseX = canvas.width / 2;
      mouseY = canvas.height * 0.8;
    });

    var timer = setInterval(update, 20);
  }
}

function getMousePos (evt) {
  var rect = canvas.getBoundingClientRect();
  var root = document.documentElement;

  mouseX = evt.clientX - rect.left - root.scrollLeft;
  mouseY = evt.clientY - rect.top - root.scrollTop;
}

function update() {

  for (var i = 0; i < 10; i++) {

    var p = new Particle(mouseX, mouseY, (Math.random() * 2 * speed - speed) / 2, 0 - Math.random() * 1 * speed);
    particles.push(p);
  }
  stage.clearRect(0, 0, width, height);

  for (i=0; i<particles.length; i++) {

    stage.fillStyle = "rgba("+(20-(particles[i].life*2))+","+((particles[i].life*2)+50)+","+(particles[i].life*2)+","+(((max-particles[i].life)/max)*0.4)+")";

    stage.beginPath();
    stage.arc(particles[i].x,particles[i].y,(max-particles[i].life)/max*(size/2)+(size/2),0,2*Math.PI);
    stage.fill();

    particles[i].x += particles[i].xs;
    particles[i].y += particles[i].ys;

    particles[i].life++;
    if (particles[i].life >= max) {
      particles.splice(i, 1);
      i--;
    }
  }
}
init();
