let canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let ctx = canvas.getContext("2d");
const checkPoint = new Image();
checkPoint.src = "round-star (1).png";

blackObjectArray = [];
whiteObjectArray = [];
let currentColor = "black";
let lastTime = null;
let timestamp = 0;
let maxValue = 500;
let direction = 1; // 1 for black, -1 for white
let isGrounded = null;

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





const cube = {
  x: 100,
  y: 250,
  xSpeed: 0,
  ySpeed: 0,
  baseSpeed: 2,
  acceleration: 0.8,
  deceleration: 0.9,
  maxSpeed: 8,
  speedThreshold: 0.3,
  gravity: 1,
};

let isAcceleratingRight = false;
let isAcceleratingLeft = false;
let isAcceleratingUp = false;
let isCollidingRight = false;
let isCollidingLeft = false;
let isJumping = false;
let groundValidator = false;


function movement() {
  groundValidator = false;
  isCollidingLeft = false;
  isCollidingRight = false;
  let bottom = cube.y + frameHeight;
  let left = cube.x;
  let right = cube.x + frameWidth;
  let hitbox = cube.x + frameWidth / 2;
  const collissionMargin = 80;
  console.log(blackObjectArray)
    blackObjectArray.forEach((blackRect) => {
      let rightEdge = blackRect.x + blackRect.height;
      if (
        rightEdge >= cube.x &&
        blackRect.x <= right &&
        bottom >= blackRect.y && bottom <= blackRect.y + blackRect.height &&
        blackRect.y - collissionMargin <= cube.y &&
        left >= blackRect.x + blackRect.width / 2
      ) {
        console.log("hej")
        isCollidingRight = true;
      } else if (
        blackRect.x <= right &&
        rightEdge >= cube.x &&
        bottom > blackRect.y && bottom < blackRect.y + blackRect.height &&
        blackRect.y - collissionMargin <= cube.y
      ) {
        isCollidingLeft = true;
      }
      if (
        hitbox >= blackRect.x &&
        hitbox <= rightEdge &&
        bottom >= blackRect.y
      ) {
        if (bottom > blackRect.y && isGrounded === false && !isJumping && bottom < blackRect.y + blackRect.height) {
          cube.ySpeed = 0;
          if (!groundValidator) {
            groundValidator = true;
          }
        }
        isGrounded = true;
      } else {
        isGrounded = false;
      }
    });
  if (isAcceleratingRight && !isCollidingLeft) {
    cube.xSpeed += cube.acceleration;
  } else if (isAcceleratingLeft && !isCollidingRight) {
    cube.xSpeed -= cube.acceleration;
  } else {
    if (cube.xSpeed > 0) {
      cube.xSpeed -= cube.acceleration;
    } else if (cube.xSpeed < 0) {
      cube.xSpeed += cube.acceleration;
    } else {
      cube.xSpeed = 0;
    }
  }

  if (cube.xSpeed > cube.maxSpeed) {
    cube.xSpeed = cube.maxSpeed;
  } else if (cube.xSpeed < -cube.maxSpeed) {
    cube.xSpeed = -cube.maxSpeed;
  }

  if (cube.xSpeed > cube.maxSpeed) {
    cube.xSpeed = cube.maxSpeed;
  }
  if (Math.abs(cube.xSpeed) < cube.speedThreshold) {
    cube.xSpeed = 0;
  }

  if (!groundValidator) {
    cube.ySpeed += cube.gravity;
  }

  cube.x += cube.xSpeed;
  cube.y += cube.ySpeed;
  isJumping = false;
}
function whiteDraw() {
  animate();
  whiteObjectArray.forEach((whiteRectangle) => {
    ctx.fillRect(
      whiteRectangle.x,
      whiteRectangle.y,
      whiteRectangle.width,
      whiteRectangle.height
    );
  });
}
function draw() {
  animate();
  debugger
  if(currentColor === "black"){
  ctx.fillStyle = "black";
  }else {
    ctx.fillStyle = "white"
  }
  blackObjectArray.forEach((blackRectangle) => {
    
    ctx.fillRect(
      blackRectangle.x,
      blackRectangle.y,
      blackRectangle.width,
      blackRectangle.height
    );
  });
}

function updateCubePosition() {
  movement();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  backgroundColor(currentColor)
  draw();
}

function handleKeyDown(event) {
   if (event.key === " ") {
    if (currentColor === "black"){
      if(frameY === 2){frameY = 3}
      else if(frameY === 0){frameY = 1}
      currentColor = "white"
      drawMap("white")
    }else{
      if(frameY === 3){frameY = 2}
      else if(frameY === 1){frameY = 0}
      currentColor = "black"
      drawMap("black")
    }
  } 
  if (event.key === "ArrowUp" && groundValidator === true) {
    isAcceleratingUp = true;
    isJumping = true;
    cube.ySpeed = -20;
  }
  if (event.key === "ArrowRight") {
      isAcceleratingRight = true;
     if (currentColor === "black"){frameY = 2;} else if (currentColor === "white"){frameY = 3;} 
    
  } else if (event.key === "ArrowLeft") {
      isAcceleratingLeft = true;
       if (currentColor === "black"){frameY = 0;} else if (currentColor === "white"){frameY = 1;} 
  }
}

function drawMap(color) {
  ctx.drawImage(checkPoint,10,10,75,75); 
  if(color === "white"){
    blackObjectArray = []
    Draw(400, canvas.height - 200, 200, 200, "black");
    Draw(200, canvas.height - 700, 200, 200, "black");
    Draw(1200, canvas.height - 300, 100, 100, "black");
    Draw(700, canvas.height - 500, 100, 100, "black");
  }else {
    blackObjectArray = []
    Draw(50, canvas.height - 100, 200, 200, "black");
    Draw(500, canvas.height - 600, 100, 100, "black");
    Draw(800, canvas.height - 200, 200, 200, "black");


    Draw(1000, canvas.height - 430, 100, 100, "black");

  }
}

drawMap("black")


function handleKeyUp(event) {
  if (event.key === "ArrowRight") {
    isAcceleratingRight = false;
  } else if (event.key === "ArrowLeft") {
    isAcceleratingLeft = false;
  }
  if (event.key === "ArrowUp") {
    isAcceleratingUp = false;
  }
}

const player_model = new Image();
player_model.src = "player.png";
let frameX = 0;
let frameY = 0;
const gameSpeed = 5;
let gameTick = 0;
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
    frameWidth + 3,
    frameHeight + 3
  );

  gameTick++;
  if (!isAcceleratingLeft && !isAcceleratingRight) {
    frameX = 0;
  } else if (gameTick % gameSpeed === 0) {
    frameX++;
    if (frameX > frameAmount) {
      frameX = 0;
    }
  }
}

function backgroundColor(color){
  console.log("banankontakt")
  if(color === "black"){ctx.fillStyle = "white"} else {ctx.fillStyle = "black" }
  ctx.fillRect(0,0,canvas.width, canvas.height)
}



