var can;
var ctx;
var timeout;

const coversList = [{
    "filename": "01.jpg",
    "font": "17px 'Press Start 2P'",
    "text-x": "260",
    "text-y": "250",
    "text-color": "#000",
    "text-length": "64",
    "text-align": "left",
    "bg-color": "#4d8786"
}, {
    "filename": "02.jpg",
    "font": "66.6px 'UnifrakturCook'",
    "text-x": "540",
    "text-y": "720",
    "text-color": "#fffb49",
    "text-length": "64",
    "text-align": "center",
    "bg-color": "#374b63"
}, {
    "filename": "03.jpg",
    "font": "30px 'Nosifer'",
    "text-x": "540",
    "text-y": "300",
    "text-color": "#001",
    "text-length": "64",
    "text-align": "center",
    "bg-color": "#920d16"
}, {
    "filename": "04.jpg",
    "font": "50px 'Playfair Display'",
    "text-x": "540",
    "text-y": "720",
    "text-color": "#fff",
    "text-length": "64",
    "text-align": "center",
    "bg-color": "#353848"
}, {
    "filename": "05.jpg",
    "font": "50px 'Yomogi'",
    "text-x": "540",
    "text-y": "330",
    "text-color": "#001",
    "text-length": "64",
    "text-align": "center",
    "bg-color": "#b37c82"
}, {
    "filename": "06.jpg",
    "font": "33px 'Barrio'",
    "text-x": "795",
    "text-y": "260",
    "text-color": "#fff",
    "text-length": "64",
    "text-align": "right",
    "bg-color": "#78797a"
}, {
    "filename": "07.jpg",
    "font": "90px 'Six Caps'",
    "text-x": "260",
    "text-y": "779",
    "text-color": "#b63ec5",
    "text-length": "64",
    "text-align": "left",
    "bg-color": "#a551ae"
}, {
    "filename": "08.jpg",
    "font": "60px 'Dancing Script'",
    "text-x": "280",
    "text-y": "730",
    "text-color": "#fff",
    "text-length": "64",
    "text-align": "left",
    "bg-color": "#50415a"
}, {
    "filename": "09.jpg",
    "font": "40px 'Atomic Age'",
    "text-x": "540",
    "text-y": "280",
    "text-color": "#68ff33",
    "text-length": "64",
    "text-align": "center",
    "bg-color": "#42543b"
}, {
    "filename": "10.jpg",
    "font": "23px 'Anton'",
    "text-x": "818",
    "text-y": "250",
    "text-color": "#000",
    "text-length": "64",
    "text-align": "right",
    "bg-color": "#7a312a"
}, {
    "filename": "11.jpg",
    "font": "500 30px 'Caveat'",
    "text-x": "280",
    "text-y": "750",
    "text-color": "#000",
    "text-length": "64",
    "text-align": "left",
    "bg-color": "#22386a"
}];

var nr = 0;

function drawTemplate() {
    var img = document.getElementById("template-img");
    ctx.drawImage(img, 0, 0);

    img = document.getElementById("album-img");
    ctx.drawImage(img, 240, 200);
}

function drawText() {
    ctx.textAlign = "left";
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
    document.getElementById("album-img").src = "img/covers/" + coversList[nr]["filename"];
    document.querySelector("body").style.background = "linear-gradient(147deg, #151719 0%, " + coversList[nr]["bg-color"] + " 100%)";
    hardRedraw();
}

function drawAlbumLabel() {
    ctx.textAlign = coversList[nr]["text-align"];
    var stringTitle = document.getElementById('album').value;
    ctx.fillStyle = coversList[nr]["text-color"];
    ctx.font = coversList[nr]["font"];
    ctx.fillText(stringTitle, coversList[nr]["text-x"], coversList[nr]["text-y"]);
    ctx.restore();
}

function drawBackground() {
    var grd = ctx.createLinearGradient(20, 0, 1060, 1440);
    grd.addColorStop(0, "#151719");
    grd.addColorStop(1, coversList[nr]["bg-color"]);

    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, 1080, 1440);
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

    drawBackground();
    drawTemplate();
    drawAlbumLabel();
    drawText();
    document.getElementById("canvas-to-img").src = can.toDataURL("image/jpg");

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawTemplate();
    drawAlbumLabel();
    drawText();
}

function hardRedraw() {
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

function pageInit() {
    document.getElementById("input-form").addEventListener("keyup", () => {
        if (!timeout) {
            timeout = setTimeout(function () {

                // Reset timeout
                timeout = null;

                ctx.save();
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                generateImg();
            }, 50);
        }
    });

    document.querySelector("body").style.background = "linear-gradient(147deg, #151719 0%, " + coversList[nr]["bg-color"] + " 100%)";
    can = document.getElementById("canvas");
    ctx = can.getContext("2d");

    hardRedraw();

    popUp('You can change album picture style simply by touching it!');
}

function generateFile(e) {
    drawBackground();
    drawTemplate();
    drawAlbumLabel();
    drawText();

    popUp('On mobile phone: Tap and hold the image above and then press “Add to photos”. The picture is now automatically saved in your “Photos” app.');

    var image = can.toDataURL("image/jpg").replace("image/jpg", "image/octet-stream");

    var element = document.createElement('a');
    var filename = "generated_album_cover.jpg";
    element.setAttribute('href', image);
    element.setAttribute('download', filename);

    element.click();

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawTemplate();
    drawAlbumLabel();
    drawText();
}

function popUp(content) {
    document.getElementById('popup-content').innerHTML = content;
    document.getElementById('popup-wrapper').classList.add('popup-show');
    setTimeout(() => {
        document.getElementById('popup-wrapper').classList.remove('popup-show');
    }, 4000);
}

window.onload = function () {
    pageInit();
};