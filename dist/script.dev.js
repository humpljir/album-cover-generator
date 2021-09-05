"use strict";

var can;
var ctx;

function drawText() {
  var stringTitle = document.getElementById('song').value;
  ctx.fillStyle = '#ffffffcf';
  ctx.font = '700 50px Nunito';
  ctx.fillText(stringTitle, 150, 950);
  var stringTitle = document.getElementById('artist').value + " • " + document.getElementById('album').value;
  ctx.fillStyle = '#ffffff7b';
  ctx.font = '400 30px Nunito';
  ctx.fillText(stringTitle, 150, 1000);
  ctx.restore();
}

function drawTemplate() {
  var img = document.getElementById("template-img");
  ctx.drawImage(img, 0, 0);
  img = document.getElementById("img-01");
  ctx.drawImage(img, 240, 200);
}

document.getElementById('album').addEventListener('keyup', function () {
  ctx.save();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawTemplate();
  var stringTitle = document.getElementById('album').value;
  ctx.fillStyle = '#fff';
  ctx.font = '700 50px Nunito';
  ctx.fillText(stringTitle, 140, 1000);
  ctx.restore();
});

function generateImg() {
  var grd = ctx.createLinearGradient(20, 0, 1060, 1440);
  grd.addColorStop(0, "#151719");
  grd.addColorStop(1, "#45235b");
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, 1080, 1440);
  drawTemplate();
  drawText();
  document.getElementById("canvas-to-img").src = can.toDataURL("image/jpg");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawTemplate();
  drawText();
}

function pageInit() {
  document.getElementById("input-form").addEventListener("keyup", function () {
    ctx.save();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    generateImg();
  });
  can = document.getElementById("canvas");
  ctx = can.getContext("2d");
  generateImg();
}

function generateFile(e) {
  var grd = ctx.createLinearGradient(20, 0, 1060, 1440);
  grd.addColorStop(0, "#151719");
  grd.addColorStop(1, "#45235b");
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, 1080, 1440);
  drawTemplate();
  drawText();
  var image = can.toDataURL("image/jpg").replace("image/jpg", "image/octet-stream");
  var element = document.createElement('a');
  var filename = 'test.jpg';
  element.setAttribute('href', image);
  element.setAttribute('download', filename);
  element.click();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawTemplate();
  drawText();
}

window.onload = function () {
  pageInit();
};