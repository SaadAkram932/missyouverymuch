const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth - 26;
canvas.height = window.innerHeight - 66;
const c = canvas.getContext("2d");

var mouse = {
    x: undefined,
    y: undefined
};

var maxRadius = 70;
var minRadius = 10;


window.addEventListener("mousemove", function (e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

window.addEventListener("touchmove", function (event) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    console.log(mouse);
});

function Circle(x, y, dx, dy, radius, hue) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.hue = hue;
    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        // c.strokeStyle = `hsl(${this.hue}, 100%, 50%)`;
        c.lineWidth = 2;
        c.fillStyle = `hsl(${this.hue}, 100%, 50%)`;
        c.fill();
        c.stroke();
    }
    this.update = function () {
        //Keep balls in the frame
        if (this.x + this.radius > window.innerWidth - 26 || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius > window.innerHeight - 66 || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
        // Velocity control
        this.x += this.dx;
        this.y += this.dy;

        //Interactivity

        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
            if (this.radius < maxRadius) {
                this.radius++;
            }
        } else if (this.radius > minRadius) {
            this.radius--;
        }

        this.draw();
    }

}
var circleArray = [];
for (let i = 0; i < 360; i++) {

    var radius = Math.floor(Math.random() * 50);
    var x = Math.random() * (innerWidth - 26 - radius * 2) + radius;
    var y = Math.random() * (innerHeight - 66 - radius * 2) + radius;
    var dx = (Math.random() - 0.5) * 5;
    var dy = (Math.random() - 0.5) * 5;
    var hue = i; //Math.floor(Math.random() * 360)
    circleArray.push(new Circle(x, y, dx, dy, radius, hue));

}
console.log(circleArray);
function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    for (let i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }
}
animate();

