var can;
var ctx;

const coversList = [{
    "filename": "01.jpg",
    "font": "30px 'Architects Daughter'",
    "text-line": "750",
    "text-color": "#000",
    "text-length": "64",
    "color": "#45235b"
}, {
    "filename": "01.jpg",
    "font": "30px 'Architects Daughter'",
    "text-line": "600",
    "text-color": "#000",
    "text-length": "64",
    "color": "#45235b"
}, {
    "filename": "01.jpg",
    "font": "30px 'Architects Daughter'",
    "text-line": "600",
    "text-color": "#000",
    "text-length": "64",
    "color": "#45235b"
}, ];

var nr = 0;

function drawTemplate() {
    var img = document.getElementById("template-img");
    ctx.drawImage(img, 0, 0);

    img = document.getElementById("img-01");
    ctx.drawImage(img, 240, 200);
}

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

function nextImage() {
    if (nr < (coversList.length - 1)) {
        nr++;
    } else {
        nr = 0;
    }
}

function drawAlbumLabel() {
    var stringTitle = document.getElementById('album').value;
    ctx.fillStyle = coversList[nr]["text-color"];
    ctx.font = coversList[nr]["font"];
    ctx.fillText(stringTitle, 280, coversList[nr]["text-line"]);
    ctx.restore();
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
    ctx.save();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
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
    drawAlbumLabel();
    drawText();
}

function pageInit() {
    document.getElementById("input-form").addEventListener("keyup", () => {
        ctx.save();
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        generateImg();
    });

    can = document.getElementById("canvas");
    ctx = can.getContext("2d");

    generateImg();
    setTimeout(() => {
        generateImg();
    }, 100);
    setTimeout(() => {
        generateImg();
    }, 400);
    setTimeout(() => {
        generateImg();
    }, 2000);
}

function generateFile(e) {
    var grd = ctx.createLinearGradient(20, 0, 1060, 1440);
    grd.addColorStop(0, "#151719");
    grd.addColorStop(1, "#45235b");

    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, 1080, 1440);

    drawTemplate();
    drawAlbumLabel();
    drawText();

    var image = can.toDataURL("image/jpg").replace("image/jpg", "image/octet-stream");

    var element = document.createElement('a');
    var filename = 'test.jpg';
    element.setAttribute('href', image);
    element.setAttribute('download', filename);

    element.click();

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawTemplate();
    drawAlbumLabel();
    drawText();
}

window.onload = function () {
    pageInit();
};