Status="";
bottles_image="";
object_detector="";
objects=[];

function preload(){
    bottles_image=loadImage("BOTTLES.jpeg");
}

function setup(){
    canvas=createCanvas(640,350);
    canvas.position(315,200);
    object_detector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting objects";
}

function modelLoaded(){
    console.log("Model Loaded");
    Status=true;
    object_detector.detect(bottles_image,gotResults);
}

function gotResults(error,results){
    if(error){
        console.error(error);
    }
    console.log(results);
    objects=results;
}

function draw(){
    image(bottles_image,0,0,640,350);
    if(Status !=""){
        for(i=0;i<objects.length;i++){
            document.getElementById("status").innerHTML="Status:Objects Detected";
            fill("#ff0000");
            percent=floor(objects[i].confidene*100);
            text(objects[i].label+""+percent+"%"+objects[i].x,objects[i].y);
            noFill();
            stroke("#ff0000");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
}