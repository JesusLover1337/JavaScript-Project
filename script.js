let canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let ctx = canvas.getContext("2d");
ctx.fillstyle = "black";
ctx.fillRect(50, canvas.height - 200, 450, 200);
ctx.fillRect(700, canvas.height - 200, 450, 200);
ctx.fillRect(500, canvas.height - 500, 96, 96);
