song1 = "";
song2 = "";
function preload(){
    song1 = loadSound("Faded.mp3");
    song2 = loadSound("Sia Unstoppable.mp3");
}
function setup()
{
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
}
function draw()
{
    image(video, 0, 0, 600, 500);
}