/* RECORDING */

function getRecordingType() {
    const types = [
        { mime: "audio/webm;codecs=opus", extension: "webm" },
        { mime: "audio/ogg;codecs=opus", extension: "ogg" },
        { mime: "audio/mp4", extension: "mp4" }
    ];

    for (const item of types) {
        if (MediaRecorder.isTypeSupported(item.mime)) return item;
    }

    return { mime: "", extension: "webm" };
}

function startRecording() {
    if (!window.MediaRecorder) {
        $("recordStatus").textContent =
            "Recording is not supported by this browser.";
        return;
    }

    if (mediaRecorder && mediaRecorder.state === "recording") return;

    initializeAudio();

    recordedChunks = [];
    recordedBlob = null;
    hasRecording = false;   

    $("recordingActions").classList.remove("visible");
    $("replayControls").classList.remove("visible");
    $("replayRecording").disabled = true;
    $("stopReplay").disabled = true;

    const format = getRecordingType();
    originalExtension = format.extension;

    try {
        mediaRecorder = format.mime
            ? new MediaRecorder(recordDestination.stream, { mimeType: format.mime })
            : new MediaRecorder(recordDestination.stream);

        mediaRecorder.ondataavailable = event => {
            if (event.data && event.data.size > 0) {
                recordedChunks.push(event.data);
            }
        };

mediaRecorder.onstop = () => {
    recordedBlob = new Blob(recordedChunks, {
        type: mediaRecorder.mimeType || "audio/webm"
        
    });

    hasRecording = recordedChunks.some(chunk => chunk.size > MIN_RECORDING_SIZE);

    if (!hasRecording) {
        recordedBlob = null;
        $("recordStatus").textContent =
            "Nothing to save. Please start Recording, generate, and then click Stop Recording.";

        $("recordingActions").classList.remove("visible");
        $("replayControls").classList.remove("visible");
        return;
    }

    // Hide recording buttons after successful recording
    $("startRecord").hidden = true;
    $("stopRecord").hidden = true;

    if (recordingUrl) URL.revokeObjectURL(recordingUrl);
    recordingUrl = URL.createObjectURL(recordedBlob);

    $("recordingAudio").src = recordingUrl;
    $("replayControls").classList.add("visible");
    $("replayRecording").disabled = false;

    $("recordStatus").textContent =
        "Recording ready! You can replay or save it.";

    $("recordingActions").classList.add("visible");
};

        mediaRecorder.start();

        $("startRecord").disabled = true;
        $("stopRecord").disabled = false;
        $("recordingIndicator").classList.add("active");
        $("recordStatus").textContent = "Recording audio...";

    } catch (error) {
        $("recordStatus").textContent =
            "Could not start recording: " + error.message;
    }
}

function stopRecording() {
    if (!mediaRecorder || mediaRecorder.state !== "recording") return;

    mediaRecorder.stop();

    $("startRecord").disabled = false;
    $("stopRecord").disabled = true;
    $("recordingIndicator").classList.remove("active");
    $("recordStatus").textContent = "Preparing your recording...";
}

function discardRecording() {
    const audio = $("recordingAudio");

    // Stop any replay currently in progress
    audio.pause();
    audio.currentTime = 0;
    audio.removeAttribute("src");
    audio.load();

    $("startRecord").style.display = "";
    $("stopRecord").style.display = "";
    $("stopRecord").disabled = true;

    // Release the temporary recording URL
    if (recordingUrl) {
        URL.revokeObjectURL(recordingUrl);
        recordingUrl = null;
    }

    // Clear the recording data
    recordedBlob = null;
    recordedChunks = [];
    hasRecording = false; 
    
    // Restore recording buttons
    $("startRecord").hidden = false;
    $("stopRecord").hidden = false;

    $("startRecord").disabled = false;
    $("stopRecord").disabled = true;

    // Reset recording controls
    $("recordingActions").classList.remove("visible");
    $("replayControls").classList.remove("visible");
    $("replayRecording").disabled = true;
    $("stopReplay").disabled = true;

    $("recordStatus").textContent =
        "Recording discarded. Ready for a new recording.";
}

/* REPLAY LATEST RECORDING */

async function replayRecording() {
    const audio = $("recordingAudio");

    if (!recordedBlob) return;

    try {
        audio.pause();
        audio.currentTime = 0;
        await audio.play();

        $("recordStatus").textContent = "Replaying latest recording...";
        $("replayRecording").disabled = true;
        $("stopReplay").disabled = false;
    } catch (error) {
        $("recordStatus").textContent =
            "Nothing to replay. please generate a sound or sequence first";
    }
}

function stopReplay() {
    const audio = $("recordingAudio");

    audio.pause();
    audio.currentTime = 0;

    $("replayRecording").disabled = !recordedBlob;
    $("stopReplay").disabled = true;
    $("recordStatus").textContent = "Replay stopped.";
}

$("recordingAudio").addEventListener("ended", () => {
    $("replayRecording").disabled = !recordedBlob;
    $("stopReplay").disabled = true;
    $("recordStatus").textContent = "Replay finished.";
});

/* DOWNLOAD RECORDINGS */

function downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = filename;

    document.body.appendChild(link);
    link.click();
    link.remove();

    setTimeout(() => URL.revokeObjectURL(url), 60000);
}

function saveOriginal() {
    if (!hasRecording || !recordedBlob) {
        $("recordStatus").textContent =
            "No recording available. Please record a sound or sequence first.";
        return;
    }

    downloadBlob(
        recordedBlob,
        "random-sound-lab-recording." + originalExtension
    );
}

function audioBufferToWav(buffer) {
    const channels = buffer.numberOfChannels;
    const sampleRate = buffer.sampleRate;
    const frames = buffer.length;
    const bytesPerSample = 2;
    const dataSize = frames * channels * bytesPerSample;

    const arrayBuffer = new ArrayBuffer(44 + dataSize);
    const view = new DataView(arrayBuffer);

    function writeString(offset, string) {
        for (let i = 0; i < string.length; i++) {
            view.setUint8(offset + i, string.charCodeAt(i));
        }
    }

    writeString(0, "RIFF");
    view.setUint32(4, 36 + dataSize, true);
    writeString(8, "WAVE");
    writeString(12, "fmt ");
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, channels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * channels * bytesPerSample, true);
    view.setUint16(32, channels * bytesPerSample, true);
    view.setUint16(34, 16, true);
    writeString(36, "data");
    view.setUint32(40, dataSize, true);

    const channelData = [];

    for (let c = 0; c < channels; c++) {
        channelData.push(buffer.getChannelData(c));
    }

    let offset = 44;

    for (let i = 0; i < frames; i++) {
        for (let c = 0; c < channels; c++) {
            let sample = Math.max(-1, Math.min(1, channelData[c][i]));

            const intSample = sample < 0
                ? sample * 32768
                : sample * 32767;

            view.setInt16(offset, intSample, true);
            offset += 2;
        }
    }

    return new Blob([arrayBuffer], { type: "audio/wav" });
}

async function saveWav() {
    if (!hasRecording || !recordedBlob) {
            $("recordStatus").textContent =
            "No recording available. Please record a sound or sequence first.";
        return;
}

    $("recordStatus").textContent = "Converting recording to WAV...";

    try {
        initializeAudio();

        const arrayBuffer = await recordedBlob.arrayBuffer();
        const decoded = await audioContext.decodeAudioData(arrayBuffer);
        const wavBlob = audioBufferToWav(decoded);

        downloadBlob(wavBlob, "random-sound-lab-recording.wav");

        $("recordStatus").textContent = "WAV file created successfully!";
    } catch (error) {
        $("recordStatus").textContent =
            "Could not convert to WAV. Try saving the original format.";
    }
}
