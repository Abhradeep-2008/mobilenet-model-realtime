var previous_result = "";

function preload(){}

function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier = ml5.imageClassifier('Mobilenet', modelLoaded);
}

function modelLoaded(){
  console.log("Model Loaded!");
}

function draw(){
  image(video, 0, 0, 300, 300);
  classifier.classify(video, gotResult)
}


function gotResult(error, results){

  if(error){
    console.log(error);
  }
  else{

    if((results[0].confidence > 0.5) && (previous_result != results[0].label)){
    console.log(results);
    previous_result = results[0].label
    var synth = window.speechSynthesis;
    speak_data = "Object detected is - "+results[0].label;
    var utter_this = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utter_this);

    document.getElementById("object").innerHTML = results[0].label;
    document.getElementById("accuracy").innerHTML = results[0].confidence.toFixed(3);
    }
  }
}



