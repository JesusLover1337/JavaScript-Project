let canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let ctx = canvas.getContext("2d");

blackObjectArray = [];
whiteObjectArray = [];
let currentColor = "black";
let lastTime = null;
let timestamp = 0;
let maxValue = 500;
let direction = 1; // 1 for black, -1 for white

class Rectangle {
  constructor(x, y, height, width, color) {
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
    this.color = color;
  }
}
setInterval(updateCubePosition, 20);
document.addEventListener("keydown", handleKeyDown);
document.addEventListener("keyup", handleKeyUp);
function Draw(x, y, height, width, color) {
  if (color == "black") {
    blackObjectArray.push(new Rectangle(x, y, height, width, color));
  } else {
    whiteObjectArray.push(new Rectangle(x, y, height, width, color));
  }
}

Draw(50, canvas.height - 200, 450, 200, "black");
Draw(700, canvas.height - 200, 450, 200, "black");

const cube = {
  x: 0,
  y: 0,
  speed: 0,
  baseSpeed: 2,
  acceleration: 0.6,
  deceleration: 0.9,
  maxSpeed: 8,
  speedThreshold: 0.3,
};

let isAcceleratingRight = false;
let isAcceleratingLeft = false;

function movement() {
  if (isAcceleratingRight) {
    cube.speed += cube.acceleration;
  } else if (isAcceleratingLeft) {
    cube.speed -= cube.acceleration;
  } else {
    if (cube.speed > 0) {
      cube.speed -= cube.acceleration;
    } else if (cube.speed < 0) {
      cube.speed += cube.acceleration;
    } else {
      cube.speed = 0;
    }
  }

  if (cube.speed > cube.maxSpeed) {
    cube.speed = cube.maxSpeed;
  } else if (cube.speed < -cube.maxSpeed) {
    cube.speed = -cube.maxSpeed;
  }

  if (cube.speed > cube.maxSpeed) {
    cube.speed = cube.maxSpeed;
  }
  if (Math.abs(cube.speed) < cube.speedThreshold) {
    cube.speed = 0;
  }

  cube.x += cube.speed;
}
function whiteDraw() {
  ctx.fillstyle = "#FFFFFF";
  ctx.fillRect(cube.x, cube.y, 96, 96);
  whiteObjectArray.forEach((whiteRectangle) => {
    ctx.fillRect(
      whiteRectangle.x,
      whiteRectangle.y,
      whiteRectangle.height,
      whiteRectangle.width
    );
  });
}
function blackDraw() {
  ctx.fillStyle = "#000000";
  /*ctx.fillRect(cube.x, cube.y, 96, 96);*/
  animate();
  blackObjectArray.forEach((blackRectangle) => {
    ctx.fillRect(
      blackRectangle.x,
      blackRectangle.y,
      blackRectangle.height,
      blackRectangle.width
    );
  });
}

function updateCubePosition() {
  movement();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (currentColor == "black") {
    blackDraw();
  } else {
    whiteDraw();
  }
}

function handleKeyDown(event) {
  if (event.key === "ArrowRight") {
    isAcceleratingRight = true;
    frameY = 2;
  } else if (event.key === "ArrowLeft") {
    isAcceleratingLeft = true;
    frameY = 0;
  }
}

function handleKeyUp(event) {
  if (event.key === "ArrowRight") {
    isAcceleratingRight = false;
  } else if (event.key === "ArrowLeft") {
    isAcceleratingLeft = false;
  }
}

const player_model = new Image();
player_model.src = "player.png";
let frameX = 0;
let frameY = 0;
const gameSpeed = 4;
let gamesumidk = 0;
const frameAmount = 3;
const frameHeight = 96;
const frameWidth = 96;

function animate() {
  ctx.drawImage(
    player_model,
    frameWidth * frameX,
    frameHeight * frameY,
    frameWidth,
    frameHeight,
    cube.x,
    cube.y,
    frameWidth + 10,
    frameHeight + 10
  );

  gamesumidk++;
  if (!isAcceleratingLeft && !isAcceleratingRight) {
    frameX = 0;
  } else if (gamesumidk % gameSpeed === 0) {
    frameX++;
    if (frameX > frameAmount) {
      frameX = 0;
    }
  }
}
