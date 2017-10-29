var d = new Date();
var $month = d.getMonth()+1;
var $day = d.getDate();
var $date=[$month+'/'+$day];
var $result=$('#result');
var $submit=$('#submit');
var $areaMonth=$('#birthMonth');
var $areaDay=$('#birthDay');
var canvas = document.getElementById("canvas");
var ctx=canvas.getContext('2d');
var W=window.innerWidth;
var H=window.innerHeight;


$submit.on("click", function(){
  var $area = $areaMonth.val() + "/" + $areaDay.val();
  if($area==$date){
     go();
     $result.text("HAPPY BIRTHDAY!").addClass("mb-5").css("color","yellow");
  }else{ stop(); $result.text("HAPPY UNBIRTHDAY!").addClass("mb-5").css("color","white");}
});

function theWindow(){
		window.requestAnimFrame = (function () {
        return window.requestAnimationFrame || 
        window.webkitRequestAnimationFrame || 
        window.mozRequestAnimationFrame || 
        window.oRequestAnimationFrame || 
        window.msRequestAnimationFrame || 
        function (callback) {
            return window.setTimeout(callback, 1000 / 60);
        };
    })();
}

function go () {
  canvas.width = W;
  canvas.height = H;
   $(window).resize(function () {
            W = window.innerWidth;
            H = window.innerHeight;
            canvas.width = W;
            canvas.height = H;
        });
   theWindow();
  callConfetti();
}

function callConfetti(){
    var mp = 150; //max particles
    var particles = [];
    var angle = 0;
    var tiltAngle = 0;
    var confettiActive = true;
    var animationComplete = true;
    var animationHandler;

    // objects

    var particleColors = {
        colorOptions: ["DodgerBlue", "aliceblue", "OliveDrab", "orange", "Gold", "purple", "SlateBlue", "yellow","lightblue", "Violet", "PaleGreen", "green", "blue", "SteelBlue", "teal","red","SandyBrown", "white", "Chocolate", "Crimson"],
        colorIndex: 0,
        getColor: function () {
           if (this.colorIndex > this.colorOptions.length) {
                    this.colorIndex = 0;
                }
            this.colorIndex++;
            return this.colorOptions[this.colorIndex];
        }
    };

    function confettiParticle(color) {
        this.x = Math.random() * W; // x-coordinate
        this.y = (Math.random() * H) - H; //y-coordinate
        this.r = RandomFromTo(10, 30); //radius;
        this.d = (Math.random() * mp) + 10; //density;
        this.color = color;
        this.tilt = Math.floor(Math.random() * 10) - 10;
        this.tiltAngleIncremental = (Math.random() * 0.07) + 0.05;
        this.tiltAngle = 0;

        this.draw = function () {
            ctx.beginPath();
            ctx.lineWidth = this.r / 2;
            ctx.strokeStyle = this.color;
            ctx.moveTo(this.x + this.tilt + (this.r / 4), this.y);
            ctx.lineTo(this.x + this.tilt, this.y + this.tilt + (this.r / 4));
            return ctx.stroke();
        };
    }
  
    (function InitializeConfetti() {
        particles = [];
        animationComplete = false;
        for (var i = 0; i < mp; i++) {
            var particleColor = particleColors.getColor();
            particles.push(new confettiParticle(particleColor));
        }
        StartConfetti();
    })();
  
    function Draw() {
        ctx.clearRect(0, 0, W, H);
        var results = [];
        for (var i = 0; i < mp; i++) {
            (function (j) {
                results.push(particles[j].draw());
            })(i);
        }
        Update();

        return results;
    }

    function RandomFromTo(from, to) {
        return Math.floor(Math.random() * (to - from + 1) + from);
    }


    function Update() {
        var remainingFlakes = 0;
        var particle;
        angle += 0.01;
        tiltAngle += 0.1;

        for (var i = 0; i < mp; i++) {
            particle = particles[i];
            if (animationComplete) return;

            if (!confettiActive && particle.y < -15) {
                particle.y = H + 100;
                continue;
            }

            stepParticle(particle, i);

            if (particle.y <= H) {
                remainingFlakes++;
            }
            CheckForReposition(particle, i);
        }

    }

    function CheckForReposition(particle, index) {
        if ((particle.x > W + 20 || particle.x < -20 || particle.y > H) && confettiActive) {
            if (index % 5 > 0 || index % 2 === 0) //66.67% of the flakes
            {
                repositionParticle(particle, Math.random() * W, -10, Math.floor(Math.random() * 10) - 20);
            } else {
                if (Math.sin(angle) > 0) {
                    //Enter from the left
                    repositionParticle(particle, -20, Math.random() * H, Math.floor(Math.random() * 10) - 20);
                } else {
                    //Enter from the right
                    repositionParticle(particle, W + 20, Math.random() * H, Math.floor(Math.random() * 10) - 20);
                }
            }
        }
    }
    function stepParticle(particle, particleIndex) {
        particle.tiltAngle += particle.tiltAngleIncremental;
        particle.y += (Math.cos(angle + particle.d) + 3 + particle.r / 2) / 2;
        particle.x += Math.sin(angle);
        particle.tilt = (Math.sin(particle.tiltAngle - (particleIndex / 3))) * 15;
    }

    function repositionParticle(particle, xCoordinate, yCoordinate, tilt) {
        particle.x = xCoordinate;
        particle.y = yCoordinate;
        particle.tilt = tilt;
    }

    function StartConfetti() {
        W = window.innerWidth;
        H = window.innerHeight;
        canvas.width = W;
        canvas.height = H;
        (function animloop() {
            if (animationComplete) return null;
            animationHandler = requestAnimFrame(animloop);
            return Draw();
        })();
    }
 
}



function stop(){
var NUM_CONFETTI = 350;
var COLORS = [[85,71,106], [174,61,99], [219,56,83], [244,92,68], [248,182,70]];
var PI_2 = 2*Math.PI;

var range = (a,b) => ((b-a)*Math.random()) + a;

var drawCircle = function(x,y,r,style) {
  ctx.beginPath();
  ctx.arc(x,y,r,0,PI_2,false);
  ctx.fillStyle = style;
  return ctx.fill();
};

var xpos = 0.5;

document.onmousemove = e => xpos = e.pageX/W;

window.requestAnimationFrame = (() =>
  window.requestAnimationFrame       ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame    ||
  window.oRequestAnimationFrame      ||
  window.msRequestAnimationFrame     ||
  (callback => window.setTimeout(callback, 1000 / 60))
);


class Confetti {

  constructor() {
    this.style = COLORS[range(0,5)];
    this.rgb = `rgba(${this.style[0]},${this.style[1]},${this.style[2]}`;
    this.r = range(2,6);
    this.r2 = 2*this.r;
    this.replace();
  }

  replace() {
    this.opacity = 0;
    this.dop = 0.03*range(1,4);
    this.x = range(-this.r2,W-this.r2);
    this.y = range(-20,H-this.r2);
    this.xmax = W-this.r;
    this.ymax = H-this.r;
    this.vx = (range(0,2)+(8*xpos))-5;
    return this.vy = (0.7*this.r)+range(-1,1);
  }

  draw() {
    this.x += this.vx;
    this.y += this.vy;
    this.opacity += this.dop;
    if (this.opacity > 1) {
      this.opacity = 1;
      this.dop *= -1;
    }
    if ((this.opacity < 0) || (this.y > this.ymax)) { this.replace(); }
    if (!(0 < this.x && this.x < this.xmax)) {
      this.x = (this.x + this.xmax) % this.xmax;
    }
    return drawCircle(this.x,this.y,this.r,`${this.rgb},${this.opacity})`);
  }
}


var confetti = (__range__(1, NUM_CONFETTI, true).map((i) => new Confetti()));

window.step = function() {
  requestAnimationFrame(step);
  ctx.clearRect(0,0,W,H);
  return Array.from(confetti).map((c) => c.draw());
};

step();

function __range__(left, right, inclusive) {
  let range = [];
  let ascending = left < right;
  let end = !inclusive ? right : ascending ? right + 1 : right - 1;
  for (let i = left; ascending ? i < end : i > end; ascending ? i++ : i--) {
    range.push(i);
  }
  return range;
}
}
var canvas = document.getElementById("canvas");
var ctx=canvas.getContext('2d');
var W=window.innerWidth;
var H=window.innerHeight;


$submit.on("click", function(){
  var $area = $areaMonth.val() + "/" + $areaDay.val();
  if($area==$date){
     go();
     $result.text("HAPPY BIRTHDAY!").addClass("mb-5").css("color","yellow");
  }else{ stop(); $result.text("HAPPY UNBIRTHDAY!").addClass("mb-5").css("color","white");}
})



function go () {
  canvas.width = W;
  canvas.height = H;
   $(window).resize(function () {
            W = window.innerWidth;
            H = window.innerHeight;
            canvas.width = W;
            canvas.height = H;
        });
   window.requestAnimFrame = (function () {
        return window.requestAnimationFrame || 
        window.webkitRequestAnimationFrame || 
        window.mozRequestAnimationFrame || 
        window.oRequestAnimationFrame || 
        window.msRequestAnimationFrame || 
        function (callback) {
            return window.setTimeout(callback, 1000 / 60);
        };
    })();
  callConfetti()
}

function callConfetti(){
    var mp = 150; //max particles
    var particles = [];
    var angle = 0;
    var tiltAngle = 0;
    var confettiActive = true;
    var animationComplete = true;
    var deactivationTimerHandler;
    var reactivationTimerHandler;
    var animationHandler;

    // objects

    var particleColors = {
        colorOptions: ["DodgerBlue", "aliceblue", "OliveDrab", "orange", "Gold", "purple", "SlateBlue", "yellow","lightblue", "Violet", "PaleGreen", "green", "blue", "SteelBlue", "teal","red","SandyBrown", "white", "Chocolate", "Crimson"],
        colorIndex: 0,
        getColor: function () {
           if (this.colorIndex > this.colorOptions.length) {
                    this.colorIndex = 0;
                }
            this.colorIndex++;
            return this.colorOptions[this.colorIndex];
        }
    }

    function confettiParticle(color) {
        this.x = Math.random() * W; // x-coordinate
        this.y = (Math.random() * H) - H; //y-coordinate
        this.r = RandomFromTo(10, 30); //radius;
        this.d = (Math.random() * mp) + 10; //density;
        this.color = color;
        this.tilt = Math.floor(Math.random() * 10) - 10;
        this.tiltAngleIncremental = (Math.random() * 0.07) + .05;
        this.tiltAngle = 0;

        this.draw = function () {
            ctx.beginPath();
            ctx.lineWidth = this.r / 2;
            ctx.strokeStyle = this.color;
            ctx.moveTo(this.x + this.tilt + (this.r / 4), this.y);
            ctx.lineTo(this.x + this.tilt, this.y + this.tilt + (this.r / 4));
            return ctx.stroke();
        }
    }
  
    (function InitializeConfetti() {
        particles = [];
        animationComplete = false;
        for (var i = 0; i < mp; i++) {
            var particleColor = particleColors.getColor();
            particles.push(new confettiParticle(particleColor));
        }
        StartConfetti();
    })();
  
    function Draw() {
        ctx.clearRect(0, 0, W, H);
        var results = [];
        for (var i = 0; i < mp; i++) {
            (function (j) {
                results.push(particles[j].draw());
            })(i);
        }
        Update();

        return results;
    }

    function RandomFromTo(from, to) {
        return Math.floor(Math.random() * (to - from + 1) + from);
    }


    function Update() {
        var remainingFlakes = 0;
        var particle;
        angle += 0.01;
        tiltAngle += 0.1;

        for (var i = 0; i < mp; i++) {
            particle = particles[i];
            if (animationComplete) return;

            if (!confettiActive && particle.y < -15) {
                particle.y = H + 100;
                continue;
            }

            stepParticle(particle, i);

            if (particle.y <= H) {
                remainingFlakes++;
            }
            CheckForReposition(particle, i);
        }

    }

    function CheckForReposition(particle, index) {
        if ((particle.x > W + 20 || particle.x < -20 || particle.y > H) && confettiActive) {
            if (index % 5 > 0 || index % 2 == 0) //66.67% of the flakes
            {
                repositionParticle(particle, Math.random() * W, -10, Math.floor(Math.random() * 10) - 20);
            } else {
                if (Math.sin(angle) > 0) {
                    //Enter from the left
                    repositionParticle(particle, -20, Math.random() * H, Math.floor(Math.random() * 10) - 20);
                } else {
                    //Enter from the right
                    repositionParticle(particle, W + 20, Math.random() * H, Math.floor(Math.random() * 10) - 20);
                }
            }
        }
    }
    function stepParticle(particle, particleIndex) {
        particle.tiltAngle += particle.tiltAngleIncremental;
        particle.y += (Math.cos(angle + particle.d) + 3 + particle.r / 2) / 2;
        particle.x += Math.sin(angle);
        particle.tilt = (Math.sin(particle.tiltAngle - (particleIndex / 3))) * 15;
    }

    function repositionParticle(particle, xCoordinate, yCoordinate, tilt) {
        particle.x = xCoordinate;
        particle.y = yCoordinate;
        particle.tilt = tilt;
    }

    function StartConfetti() {
        W = window.innerWidth;
        H = window.innerHeight;
        canvas.width = W;
        canvas.height = H;
        (function animloop() {
            if (animationComplete) return null;
            animationHandler = requestAnimFrame(animloop);
            return Draw();
        })();
    }

    function ClearTimers() {
        clearTimeout(reactivationTimerHandler);
        clearTimeout(animationHandler);
    }
 
};



function stop(){
const NUM_CONFETTI = 350;
const COLORS = [[85,71,106], [174,61,99], [219,56,83], [244,92,68], [248,182,70]];
const PI_2 = 2*Math.PI;

const range = (a,b) => ((b-a)*Math.random()) + a;

const drawCircle = function(x,y,r,style) {
  ctx.beginPath();
  ctx.arc(x,y,r,0,PI_2,false);
  ctx.fillStyle = style;
  return ctx.fill();
};

let xpos = 0.5;

document.onmousemove = e => xpos = e.pageX/W;

theWindow();


class Confetti {

  constructor() {
    this.style = COLORS[~~range(0,5)];
    this.rgb = `rgba(${this.style[0]},${this.style[1]},${this.style[2]}`;
    this.r = range(2,6);
    this.r2 = 2*this.r;
    this.replace();
  }

  replace() {
    this.opacity = 0;
    this.dop = 0.03*range(1,4);
    this.x = range(-this.r2,W-this.r2);
    this.y = range(-20,H-this.r2);
    this.xmax = W-this.r;
    this.ymax = H-this.r;
    this.vx = (range(0,2)+(8*xpos))-5;
    return this.vy = (0.7*this.r)+range(-1,1);
  }

  draw() {
    this.x += this.vx;
    this.y += this.vy;
    this.opacity += this.dop;
    if (this.opacity > 1) {
      this.opacity = 1;
      this.dop *= -1;
    }
    if ((this.opacity < 0) || (this.y > this.ymax)) { this.replace(); }
    if (!(0 < this.x && this.x < this.xmax)) {
      this.x = (this.x + this.xmax) % this.xmax;
    }
    return drawCircle(this.x,this.y,this.r,`${this.rgb},${this.opacity})`);
  }
}


const confetti = (__range__(1, NUM_CONFETTI, true).map((i) => new Confetti));

window.step = function() {
  requestAnimFrame(step);
  ctx.clearRect(0,0,W,H);
  return Array.from(confetti).map((c) => c.draw());
};

step();

function __range__(left, right, inclusive) {
  let range = [];
  let ascending = left < right;
  let end = !inclusive ? right : ascending ? right + 1 : right - 1;
  for (let i = left; ascending ? i < end : i > end; ascending ? i++ : i--) {
    range.push(i);
  }
  return range;
}
}