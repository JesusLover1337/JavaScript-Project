# JavaScript-Project

https://js13kgames.com/games/onoff/index.html

function transition() {
if ((maxValue <= 1000) & (maxValue > 0)) {
maxValue -= 50;
}

progress = Math.min(1, (maxValue / 500) \* direction);

if (progress < 1) {
const backgroundColor = `rgb(${255 * progress}, ${255 * progress}, ${
      255 * progress
    })`;
ctx.clearRect(0, 0, canvas.width, canvas.height);
ctx.fillStyle = backgroundColor;
ctx.fillRect(0, 0, canvas.width, canvas.height);
}
} to be added
