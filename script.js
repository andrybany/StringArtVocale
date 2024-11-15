//https://www.alebalweb-blog.com/85-text-to-speech-player-with-buttons-play-pause-stop-and-voice-choice.html

const synth = window.speechSynthesis;

const inputForm = document.querySelector("form");
const pauseButton = document.querySelector("#pause");

let currentRow = 0;
let pause = false;

function speak() {    
  if (synth.speaking) {
    console.error("speechSynthesis.speaking");
    return;
  }
  
  (async () => {
    const response = await fetch("https://raw.githubusercontent.com/andrybany/StringArtVocale/refs/heads/main/assets/test.txt");
    const data = await response.text();
    const lines = data.split("\n");  
    for (let index = currentRow; index < lines.length; index++) {
      console.log(pause);
      const element = lines[index];                        
      if (element !== "") {        
        const utterThis = new SpeechSynthesisUtterance(element);
        
        utterThis.onend = function (event) {
          console.log("SpeechSynthesisUtterance.onend");
        };

        utterThis.onerror = function (event) {          
          console.error("SpeechSynthesisUtterance.onerror");
          console.log(event);
        };

        utterThis.voice = synth.getVoices().find(x => x.lang === "it-IT");
        synth.speak(utterThis);
        currentRow++;
      }      
    };
  })(); 
}

inputForm.onsubmit = function (event) {  
  event.preventDefault();
  speak();  
};

pauseButton.onclick = function () {      
  pause = true;
  //synth.cancel();
}