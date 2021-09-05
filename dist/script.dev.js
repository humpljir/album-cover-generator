"use strict";

var can;

function pageInit() {
  document.getElementById("input-form").addEventListener("onchange", function () {});
  can = document.getElementById("canvas");
  var ctx = can.getContext("2d");
  var img = document.getElementById("template-img");
  ctx.drawImage(img, 0, 0);
}

function generateFile(e) {
  var image = can.toDataURL("image/png").replace("image/png", "image/octet-stream");
  var element = document.createElement('a');
  var filename = 'test.png';
  element.setAttribute('href', image);
  element.setAttribute('download', filename);
  element.click();
}

window.onload = function () {
  pageInit();
};