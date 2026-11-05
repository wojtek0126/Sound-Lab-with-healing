/* AUDIO GENERATOR */

function random(min, max) {
    return Math.random() * (max - min) + min;
}

function randomInt(min, max) {
    return Math.floor(random(min, max + 1));
}

function pick(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function initializeAudio() {
    if (!audioContext) {
        const AudioContextClass =
            window.AudioContext || window.webkitAudioContext;

        audioContext = new AudioContextClass();
        recordDestination = audioContext.createMediaStreamDestination();
    }

    if (audioContext.state === "suspended") {
        audioContext.resume();
    }
}

function wait(seconds) {
    return new Promise(resolve => {
        if (stopRequested) {
            resolve();
            return;
        }

        waitResolver = resolve;

        waitTimer = setTimeout(() => {
            waitTimer = null;
            waitResolver = null;
            resolve();
        }, seconds * 1000);
    });
}

function cancelWait() {
    if (waitTimer !== null) {
        clearTimeout(waitTimer);
        waitTimer = null;
    }

    if (waitResolver !== null) {
        const resolve = waitResolver;
        waitResolver = null;
        resolve();
    }
}

function stopSound() {
    stopRequested = true;
    cancelWait();

    if (activeOscillator) {
        try { activeOscillator.stop(); } catch (error) {}
        activeOscillator = null;
    }

    setLocalizedText($("status"), "generator.stopping");
}

function updateButtons(playing) {
    $("one").disabled = playing;
    $("randomOne").disabled = playing;
    $("sequence").disabled = playing;
    $("randomSequence").disabled = playing;
    $("stop").disabled = !playing;
}

function getPitchRange() {
    let min = Number($("minPitch").value);
    let max = Number($("maxPitch").value);

    if (min > max) [min, max] = [max, min];

    return { min, max };
}

function getWaveform() {
    const selected = $("waveformSelect").value;

    if (selected === "random") {
        return pick(["sine", "square", "triangle", "sawtooth"]);
    }

    return selected;
}

function playSound(index, duration, volume) {
    initializeAudio();

    return new Promise(resolve => {
        const oscillator = audioContext.createOscillator();
        const gain = audioContext.createGain();

        const range = getPitchRange();
        const frequency = random(range.min, range.max);
        const waveform = getWaveform();

        oscillator.type = waveform;
        oscillator.frequency.value = frequency;
        gain.gain.value = Math.max(0, Math.min(1, volume / 100));

        oscillator.connect(gain);
        gain.connect(audioContext.destination);
        gain.connect(recordDestination);

        activeOscillator = oscillator;

        $("number").textContent = index;
        $("frequency").textContent = Number(frequency.toFixed(2)) + " Hz";
        $("waveform").textContent = t("settings." + waveform).toUpperCase();
        $("actualVolume").textContent = Math.round(volume) + "%";

        oscillator.onended = () => {
            oscillator.disconnect();
            gain.disconnect();

            if (activeOscillator === oscillator) {
                activeOscillator = null;
            }

            resolve();
        };

        oscillator.start();
        oscillator.stop(audioContext.currentTime + duration);
    });
}

async function generate(count, randomMode, singleSound = false) {
    if (isGenerating) return;

    isGenerating = true;
    stopRequested = false;
    updateButtons(true);

    $("progress").textContent = "";
    setLocalizedText($("status"), "generator.generating");

    try {
        initializeAudio();

        for (let i = 1; i <= count; i++) {
            if (stopRequested) break;

            if (i > 1 || (!singleSound && !randomMode)) {
                const gap = randomMode
                    ? random(0, 10)
                    : Number($("gap").value);

                if (gap > 0) {
                    setLocalizedText($("status"), "generator.waiting", {
                        seconds: gap.toFixed(1)
                    });

                    await wait(gap);
                }

                if (stopRequested) break;
            }

            const duration = randomMode
                ? random(1, 10)
                : Number($("soundDuration").value);

            const volume = randomMode
                ? randomInt(1, 100)
                : Number($("soundVolume").value);

            setLocalizedText($("status"), "generator.playing", { index: i });
            setLocalizedText($("progress"), "generator.progress", {
                index: i,
                count
            });

            await playSound(i, duration, volume);
        }

        setLocalizedText(
            $("status"),
            stopRequested ? "generator.stopped" : "generator.complete"
        );

    } catch (error) {
        setLocalizedText($("status"), "generator.audioError", {
            message: error.message
        });
    } finally {
        isGenerating = false;
        activeOscillator = null;
        updateButtons(false);
    }
}

function generateRandomSingle() {
    generate(1, true, true);
}

function generateRandomSequence() {
    const count = randomInt(1, Number($("randomMax").value));
    generate(count, true, false);
}

/* UPLOADED AUDIO PLAYER */

const uploadedAudio = $("uploadedAudio");

function formatTime(seconds) {
    if (!Number.isFinite(seconds)) return "0:00";

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    return minutes + ":" + String(remainingSeconds).padStart(2, "0");
}

function updatePlayerDisplay() {
    const duration = uploadedAudio.duration;
    const current = uploadedAudio.currentTime;

    $("currentTime").textContent = formatTime(current);
    $("totalTime").textContent = formatTime(duration);

    if (Number.isFinite(duration) && duration > 0) {
        const position = current / duration * 1000;
        $("seekBar").value = position;
        $("seekPercent").textContent =
            Math.round(current / duration * 100) + "%";
    } else {
        $("seekBar").value = 0;
        $("seekPercent").textContent = "0%";
    }
}

function setPlayerButtons(enabled) {
    $("filePlay").disabled = !enabled;
    $("filePause").disabled = !enabled;
    $("rewind").disabled = !enabled;
    $("forward").disabled = !enabled;
    $("seekBar").disabled = !enabled;
    $("playbackSpeed").disabled = !enabled;
}

$("audioFile").addEventListener("change", event => {
    const file = event.target.files[0];

    if (!file) return;


    // Check WAV format
if (!file.name.toLowerCase().endsWith(".wav")) {

    $("playerTooltip").style.display = "block";

    setLocalizedText($("fileName"), "player.noFile");

    setLocalizedText($("playerStatus"), "player.unsupportedFormat");

    $("playerStatus").style.color = "#ff6b6b";

    $("audioFile").value = "";

    setPlayerButtons(false);

    $("audioFileActions").classList.remove("visible");

    setTimeout(() => {
        setLocalizedText($("playerStatus"), "player.initialStatus");

        $("playerStatus").style.color = "";
    }, 2000);

    return;
}

    // Valid WAV file selected
    $("playerTooltip").style.display = "none";

    if (uploadedUrl) URL.revokeObjectURL(uploadedUrl);

    uploadedAudio.pause();
    uploadedAudio.removeAttribute("src");
    uploadedAudio.load();

    uploadedUrl = URL.createObjectURL(file);
    uploadedAudio.src = uploadedUrl;

    setLocalizedText($("fileName"), "player.selectedFile", {
        filename: file.name
    });
    setLocalizedText($("playerStatus"), "player.loading");
    $("audioFileActions").classList.add("visible");
    setPlayerButtons(false);
});

uploadedAudio.addEventListener("loadedmetadata", () => {
    setPlayerButtons(true);
    uploadedAudio.playbackRate = Number($("playbackSpeed").value);
    updatePlayerDisplay();

    setLocalizedText($("playerStatus"), "player.ready");
});

uploadedAudio.addEventListener("timeupdate", updatePlayerDisplay);

uploadedAudio.addEventListener("play", () => {
    setLocalizedText($("playerStatus"), "player.playing");
});

uploadedAudio.addEventListener("pause", () => {
    if (!uploadedAudio.ended) {
        setLocalizedText($("playerStatus"), "player.paused");
    }
});

uploadedAudio.addEventListener("ended", () => {
    setLocalizedText($("playerStatus"), "player.finished");
});

uploadedAudio.addEventListener("error", () => {
    setLocalizedText($("playerStatus"), "player.playbackError");
});

$("filePlay").addEventListener("click", async () => {
    try {
        await uploadedAudio.play();
    } catch (error) {
        setLocalizedText($("playerStatus"), "player.playError", {
            message: error.message
        });
    }
});

$("filePause").addEventListener("click", () => {
    uploadedAudio.pause();
});

$("rewind").addEventListener("click", () => {
    uploadedAudio.currentTime = Math.max(0, uploadedAudio.currentTime - 10);
    updatePlayerDisplay();
});

$("forward").addEventListener("click", () => {
    if (Number.isFinite(uploadedAudio.duration)) {
        uploadedAudio.currentTime = Math.min(
            uploadedAudio.duration,
            uploadedAudio.currentTime + 10
        );
    }
    updatePlayerDisplay();
});

$("seekBar").addEventListener("input", () => {
    if (Number.isFinite(uploadedAudio.duration)) {
        uploadedAudio.currentTime =
            Number($("seekBar").value) / 1000 * uploadedAudio.duration;
        updatePlayerDisplay();
    }
});

$("playbackSpeed").addEventListener("change", () => {
    uploadedAudio.playbackRate = Number($("playbackSpeed").value);

    setLocalizedText($("playerStatus"), "player.speedStatus", {
        speed: uploadedAudio.playbackRate
    });
});

function discardUploadedAudio() {
    // Stop uploaded audio
    uploadedAudio.pause();
    uploadedAudio.currentTime = 0;

    // Remove the audio source
    uploadedAudio.removeAttribute("src");
    uploadedAudio.load();

    // Release the temporary file URL
    if (uploadedUrl) {
        URL.revokeObjectURL(uploadedUrl);
        uploadedUrl = null;
    }

    // Reset the file input
    $("audioFile").value = "";

    // Reset player controls
    setPlayerButtons(false);

    $("seekBar").value = 0;
    $("seekPercent").textContent = "0%";
    $("currentTime").textContent = "0:00";
    $("totalTime").textContent = "0:00";

    $("playbackSpeed").value = "1";

    // Hide discard button
    $("audioFileActions").classList.remove("visible");

    // Reset status
    setLocalizedText($("fileName"), "player.noFile");
    setLocalizedText($("playerStatus"), "player.initialStatus");

    // For enabling and disabling text about file to download format
    $("playerTooltip").style.display = "block";    
}
