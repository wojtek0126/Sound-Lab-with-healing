let audioContext = null;
let recordDestination = null;
let activeOscillator = null;
let stopRequested = false;
let waitTimer = null;
let waitResolver = null;
let isGenerating = false;

let mediaRecorder = null;
let recordedChunks = [];
let recordedBlob = null;
let hasRecording = false;
let originalExtension = "webm";
let recordingUrl = null;
let uploadedUrl = null;

const $ = id => document.getElementById(id);

const MIN_RECORDING_SIZE = 200; // 200 KB

/* DAY / NIGHT SWITCH */

function setNightMode(enabled) {
    document.body.classList.toggle("night-mode", enabled);

    $("nightSwitch").checked = enabled;
    $("themeLabel").textContent = enabled ? "🌙 NIGHT" : "☀️ DAY";
    $("bulbButton").textContent = "💡";

    $("bulbButton").title = enabled
        ? "Switch back to underwater daytime"
        : "Switch to underwater night mode";
}

$("nightSwitch").addEventListener("change", event => {
    setNightMode(event.target.checked);
});

$("bulbButton").addEventListener("click", () => {
    setNightMode(!$("nightSwitch").checked);
});

/* START IN DAY MODE */

setNightMode(false);
