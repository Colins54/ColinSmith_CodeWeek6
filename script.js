// Creating an AudioContext instance for managing audio

const audioContext = new (window.AudioContext || window.webkitAudioContext)();
let oscillator = null;
const gainNode = audioContext.createGain();

gainNode.gain.value = 0.5;
gainNode.connect(audioContext.destination);

// Getting references to the sliders and their display elements

const frequencySlider = document.getElementById("frequency");
const gainSlider = document.getElementById("gain");
const freqDisplay = document.getElementById("freqValue");
const gainDisplay = document.getElementById("gainValue");

// Making a toggle button

const toggleButton = document.createElement("button");
toggleButton.textContent = "Start Oscillator";
document.body.appendChild(toggleButton);

// Functions to update freq and gain

const updateFrequency = function (freq) {
  if (oscillator) {
    oscillator.frequency.value = freq;
  }
  freqDisplay.textContent = freq + " Hz";
};

const updateGain = function (gain) {
  gainNode.gain.value = gain;
  gainDisplay.textContent = gain;
};

// Function to start/stop

const toggleOscillator = function () {
  if (!oscillator) {
    oscillator = audioContext.createOscillator();
    oscillator.type = "sine";
    oscillator.frequency.value = frequencySlider.value;
    oscillator.connect(gainNode);
    oscillator.start();
    toggleButton.textContent = "Stop Oscillator";
  } else {
    oscillator.stop();
    oscillator = null;
    toggleButton.textContent = "Start Oscillator";
  }
};

// Adding event listeners to update values

frequencySlider.addEventListener("input", (e) =>
  updateFrequency(e.target.value)
);
gainSlider.addEventListener("input", (e) => updateGain(e.target.value));
toggleButton.addEventListener("click", toggleOscillator);
