song1 = "";
song2 = "";
leftX = 0;
rightX = 0;
leftY = 0;
rightY = 0;
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
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotResults);
}
function gotResults()
{
    if(results.length > 0){
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);
        ScoreLeftWrist = results[0].pose.keypoints[9].score;
        ScoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("ScoreLeftWrist = " + ScoreLeftWrist);
        console.log("ScoreRightWrist = " + ScoreRightWrist);
    }
}
function modelLoaded()
{
    console.log('poseNet is initialised!');
}
function draw()
{
    image(video, 0, 0, 600, 500);
    fill("#ff0048");
    stroke("#ff0048");
    if(ScoreRightWrist > 0.2){

    circle(rightWristX, rightWristY, 20);
    if(rightWristY > 0 && rightWristY <= 100){
        document.getElementById("speed").innerHTML = "Speed = 0.5x";
        song.rate(0.5);
    }
    else if(rightWristY > 100 && rightWristY <= 200){
        document.getElementById("speed").innerHTML = "Speed = 1x";
        song.rate(1);
    }
    else if(rightWristY > 200 && rightWristY <= 300){
        document.getElementById("speed").innerHTML = "Speed = 1.5x";
        song.rate(1.5);
    }
    else if(rightWristY > 300 && rightWristY <= 400){
        document.getElementById("speed").innerHTML = "Speed = 2x";
        song.rate(2);
    }
    else{
        document.getElementById("speed").innerHTML = "Speed = 2.5x";
        song.rate(2.5);
    }
}
    if(ScoreLeftWrist > 0.2)
    {
        circle(leftWristX,leftWristY,20);
        InNumberleftWristY = Number(leftWristY);
        remove_decimals = floor(InNumberleftWristY);
        volume = remove_decimals/500;
        document.getElementById("volume").innerHTML = "Volume " + volume;
        song.setVolume(volume);
    }
}
function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1)
}