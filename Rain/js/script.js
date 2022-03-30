var canvas;
var ctx;
var animating = true;
var width;
var height;
var rain = [];
drops = 0;
var dropsMax = 75;
var dropsSpeed = 12;  
var grav = 0.1; 
var maxDist = 10;
var distMult = 0.1;
var dropsSize = 3;
var dropsColor = "rgba(255,255,255,0.5)";
var background = "rgba(8, 30, 69,1)";

// Initialize canvas
function init() {
    canvas = document.getElementById("rain");
    if(canvas.getContext){
        ctx = canvas.getContext('2d');
    }
    width = canvas.width;
    height = canvas.height;
    setSize();
    createRain();
    draw();
}

function setSize(){
    console.log("Begin");
    console.log(window.innerWidth);
    console.log(document.documentElement.clientWidth);
    console.log(document.body.clientWidth);
    console.log(window.innerHeight);
    console.log(document.documentElement.clientHeight);
    console.log(document.body.clientHeight);
    width = window.innerWidth || document.documentElement.clientWidth || 
document.body.clientWidth;
    height = window.innerHeight|| document.documentElement.clientHeight|| 
document.body.clientHeight;
    drops = Math.floor(width*dropsMax/100);
    canvas.width = width;
    canvas.height = height;
}

// Canvas draw function
function draw() {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, width, height);
    
    updateRain();
    for (var i = 0; i < rain.length; i++) {
        rain[i].draw();
    }

    if(animating)
        requestAnimationFrame(draw);
}


// Rain drop object
function RainDrop() {
    this.x = Math.floor(Math.random() * width);
    this.y = Math.floor(Math.random() * height);
    this.distance = Math.floor(Math.random() * maxDist);
    this.size = dropsSize/(1+this.distance*distMult);
    this.speed = dropsSpeed/(1+this.distance*distMult);
    this.color = dropsColor;
    this.draw = function() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size*2);
        /*ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();*/
    }
}

// Create rain drops
function createRain() {
    rain = [];
    for (var i = 0; i < drops; i++) {
        rain.push(new RainDrop());
    }
}

// Update rain drops
function updateRain() {
    for (var i = 0; i < rain.length; i++) {
        rain[i].speed += grav;
        rain[i].y += Math.floor(rain[i].speed);
        if (rain[i].y > height) {
            rain[i].speed = dropsSpeed/(1+rain[i].distance*distMult);
            rain[i].y = 0;
            rain[i].x = Math.floor(Math.random() * width);
        }
    }
}

// Window reisze event listener
window.addEventListener('resize', function() {
    setSize();
    createRain();
});

// Pause function
function pause() {
    animating = !animating;
    draw();
}