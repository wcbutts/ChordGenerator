let activeOscillators = []; 
let audioContext = new (window.AudioContext || window.webkitAudioContext)(); 

function Playnote (note) {
  
    let oscillator; 
    let gainNode; 

    const frequencies = {
        "C": 261.63,
        "C#": 277.18,
        "D": 293.66,
        "D#": 311.13,
        "E": 329.63,
        "F": 349.23,
        "F#": 369.99,
        "G": 392.00,
        "G#": 415.30,
        "A": 440.00,
        "A#": 466.16,
        "B": 493.88,
        "C2": 523.26
    };

    oscillator = audioContext.createOscillator();
    oscillator.type = "sine";
    oscillator.frequency.value = frequencies[note];
    oscillator.connect(audioContext.destination);
    oscillator.start();
    activeOscillators.push(oscillator);

    gainNode =audioContext.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    const volumeSlider = document.getElementById("volumeRange");
    gainNode.gain.setValueAtTime(volumeSlider.value, audioContext.currentTime);


    volumeSlider.addEventListener("input", function() {
        gainNode.gain.setValueAtTime(volumeSlider.value, audioContext.currentTime)});
}

function Stopnote () {
   activeOscillators.forEach(oscillator => {
    oscillator.stop();
   });
}
activeOscillators = [];
