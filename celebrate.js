//initial confetti codes: http://jsfiddle.net/hcxabsgh/

var d = new Date();
var $month = d.getMonth()+1;
var $day = d.getDate();
var $date=[$month+'/'+$day];
var $result=$('#result');
var $submit=$('#submit');
var $areaMonth=$('#birthMonth');
var $areaDay=$('#birthDay');
var $special=$('#special');
var canvas = document.getElementById("canvas");
var ctx=canvas.getContext('2d');
var W=window.innerWidth;
var H=window.innerHeight;
var mp = 250; //max particles
var particles = [];
var angle = 0;
var tiltAngle = 0;
var animationHandler;
//constructor?
var particleColors = {
        colorOptions: ["DodgerBlue", "aliceblue", "OliveDrab", "orange", "Gold", "purple", "SlateBlue", "yellow","lightblue", "Violet", "PaleGreen", "green", "blue", "SteelBlue", "teal","red","SandyBrown", "white", "Chocolate", "Crimson"],
        colorIndex: 0,
        getColor: function () {
           if (this.colorIndex > this.colorOptions.length-1) {
                    this.colorIndex = 0;
                }
            this.colorIndex++;
            return this.colorOptions[this.colorIndex];
        }
    }

$submit.on("click", function(){
  var $area = $areaMonth.val() + "/" + $areaDay.val();
  $result.text('');
  $special.text('');
   if($area=="/"||$areaMonth.val()==''||$areaDay.val()==''){return alert("Please enter your birth date info.")};
	 idDate($area,$date);
})

function idDate(a,b){
	if(a==b){
    $result.text("HAPPY BIRTHDAY!").addClass("mb-5").css("color","yellow");
  }else{$result.text("HAPPY UNBIRTHDAY!").addClass("mb-5").css("color","white");}
	if(b=="10/31"){particleColors.colorOptions=['orange','black','purple','green','Violet','orange'];$special.text("HAPPY HALLOWEEN!").addClass("mb-5").css("color","orange");}
  if(b=="12/25"){particleColors.colorOptions=['red','Crimson','green','PaleGreen','Gold','silver'];$special.text("HAPPY HOLIDAYS!").addClass("mb-5").css("color","dodgerblue");}
  if(b=="01/01"){particleColors.colorOptions=['red','Gold','white','silver','dodgerblue'];$special.text("HAPPY NEW YEAR!").addClass("mb-5").css("color","Gold");}
  if(b=="02/14"){particleColors.colorOptions=['red','pink','Crimson','white'];$special.text("HAPPY VALENTINES DAY!").addClass("mb-5").css("color","brickred");}
  if(b=="03/17"){particleColors.colorOptions=['green','PaleGreen','Gold','yellow'];$special.text("HAPPY SAINT PATRICK'S DAY!").addClass("mb-5").css("color","Lime");}
  if(b=="07/04"){particleColors.colorOptions=['red','white','blue','red','white','blue'];$special.text("HAPPY 4TH OF JULY!").addClass("mb-5").css("color","Gold");}
  go();
}
//init window
function theWindow(){
   window.requestAnimationFrame = (function () {
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

//response to submit button
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
  InitializeConfetti();
}


//gather particle colors
function InitializeConfetti() {
        particles = [];
        for (var i = 0; i < mp; i++) {
            var particleColor = particleColors.getColor();
            particles.push(new confettiParticle(particleColor));
        }
        StartConfetti();
    };
	
//start the decent	
    function StartConfetti() {
        W = window.innerWidth;
        H = window.innerHeight;
        canvas.width = W;
        canvas.height = H;
        (function animloop() {
            animationHandler = requestAnimationFrame(animloop);
            return Draw();
        })();
    }
 
	
//gather particle data	
function confettiParticle(color) {
        this.x = Math.random() * W; // x-coordinate
        this.y = (Math.random() * H) - H; //y-coordinate
        this.r = randomFromTo(10, 30); //radius;
        this.d = (Math.random() * mp) + 20; //density;
        this.color = color;
        this.tilt = Math.floor(Math.random() * 10);
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
  
  
	//move start position randomly
    function randomFromTo(from, to) {
        return Math.floor(Math.random() * (to - from + 2) + from);
    }
  
  //put particles on canvas
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


//update particle array after start
    function Update() {
        var remainingFlakes = 0;
        var particle;
        angle += 0.01;
        tiltAngle += 0.1;

        for (var i = 0; i < mp; i++) {
            particle = particles[i];
            stepParticle(particle, i);

            if (particle.y <= H) {
                remainingFlakes++;
            }
            CheckForReposition(particle, i);
        }

    }

	
	//move particle x axis as it falls
    function CheckForReposition(particle, index) {
        if (particle.x > W + 20 || particle.x < -20 || particle.y > H) {
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
	
	//make particle float and twirl as it falls
    function stepParticle(particle, particleIndex) {
        particle.tiltAngle += particle.tiltAngleIncremental;
        particle.y += (Math.cos(angle + particle.d) + 3 + particle.r / 2) / 2.5;
        particle.x += Math.sin(angle);
        particle.tilt = (Math.sin(particle.tiltAngle - (particleIndex / 3))) * 15;
    }

	
	//tilt action
    function repositionParticle(particle, xCoordinate, yCoordinate, tilt) {
        particle.x = xCoordinate;
        particle.y = yCoordinate;
        particle.tilt = tilt;
    }
