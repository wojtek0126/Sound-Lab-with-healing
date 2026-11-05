/* SLIDERS */

function connectSlider(id, outputId, suffix) {
    const slider = $(id);
    const output = $(outputId);

    function update() {
        output.textContent = slider.value + suffix;
    }

    slider.addEventListener("input", update);
    update();
}

connectSlider("soundDuration", "durationValue", " seconds");
connectSlider("soundVolume", "volumeValue", "%");
connectSlider("gap", "gapValue", " seconds");
connectSlider("soundCount", "countValue", "");
connectSlider("randomMax", "randomMaxValue", "");
// Keep minimum and maximum pitch synchronized
function synchronizePitchSliders(changedSlider) {

    const minSlider = $("minPitch");
    const maxSlider = $("maxPitch");

    let min = Number(minSlider.value);
    let max = Number(maxSlider.value);

    if (changedSlider === "minPitch" && min > max) {
        maxSlider.value = min;
    }

    if (changedSlider === "maxPitch" && max < min) {
        minSlider.value = max;
    }

    $("minPitchValue").textContent = minSlider.value + " Hz";
    $("maxPitchValue").textContent = maxSlider.value + " Hz";
}

$("minPitch").addEventListener("input", () => {
    synchronizePitchSliders("minPitch");
    stopGoldenStars();
});

$("maxPitch").addEventListener("input", () => {
    synchronizePitchSliders("maxPitch");
    stopGoldenStars();
});

// Initialize displayed values
synchronizePitchSliders();
// Stop golden stars when pitch is manually changed
$("minPitch").addEventListener("input", stopGoldenStars);
$("maxPitch").addEventListener("input", stopGoldenStars);

/* CUSTOM DROPDOWN CHEVRONS */

document.querySelectorAll("select").forEach(select => {
    const wrapper = document.createElement("div");
    wrapper.className = "select-wrapper";

    select.parentNode.insertBefore(wrapper, select);
    wrapper.appendChild(select);

    const chevron = document.createElement("span");
    chevron.className = "select-chevron";
    wrapper.appendChild(chevron);

    select.addEventListener("pointerdown", () => {
        const wasOpen = wrapper.classList.contains("open");

        document.querySelectorAll(".select-wrapper.open")
            .forEach(item => item.classList.remove("open"));

        if (!wasOpen) {
            wrapper.classList.add("open");
        }
    });

    select.addEventListener("keydown", event => {
        if (
            event.key === "ArrowDown" ||
            event.key === "ArrowUp" ||
            event.key === "Enter" ||
            event.key === " "
        ) {
            wrapper.classList.add("open");
        }

        if (event.key === "Escape") {
            wrapper.classList.remove("open");
        }
    });

    select.addEventListener("change", () => {
        wrapper.classList.remove("open");
    });

    select.addEventListener("blur", () => {
        wrapper.classList.remove("open");
    });
});

document.addEventListener("pointerdown", event => {
    if (!event.target.closest(".select-wrapper")) {
        document.querySelectorAll(".select-wrapper.open")
            .forEach(item => item.classList.remove("open"));
    }
});

const goldenFrequencies = {

    solfeggio: [
        [396, "Liberation – grounding, security and releasing negative energy."],
        [417, "Change – creativity, emotional transformation and letting go of the past."],
        [528, "Love – compassion, transformation and the traditional association with DNA repair."],
        [639, "Connection – communication, understanding and relationship harmony."],
        [741, "Awakening – self-expression, clarity and communication."],
        [852, "Intuition – spiritual insight and meditation."],
        [963, "Universal connection – oneness and spiritual awareness."]
    ],

    additional: [
        [174, "Foundation – security and stability."],
        [285, "Healing – physical and emotional balance."],
        [1074, "Spiritual frequency – spiritual experiences and higher consciousness."],
        [1174, "Balance – equilibrium of body and mind."],
        [1152, "Spiritual purification – clarity and cleansing negative energies."],
        [2172, "Spiritual enlightenment – expanded awareness and deeper connection."]
    ],

    tesla: [
        [333, "Balance and harmony."],
        [639, "Harmony in relationships."],
        [999, "Completion and spiritual enlightenment."]
    ],

    angel: [
        [111, "New beginnings and spiritual awakening."],
        [222, "Balance and harmony in relationships."],
        [333, "Spiritual awareness and intuition."],
        [444, "Protection and divine guidance."],
        [555, "Transformation and adaptability."],
        [666, "Balance and spiritual integration."],
        [777, "Spiritual awareness and divine alignment."],
        [888, "Abundance, prosperity and universal alignment."],
        [999, "Completion, spiritual fulfilment and new beginnings."]
    ],

    schumann: [
        [7.83, "Schumann Resonance – Earth's heartbeat, traditionally associated with grounding and connection to nature."]
    ],

    planetary: [
        [141.27, "Mercury – communication and intellect."],
        [221.23, "Venus – love and harmony."],
        [126.22, "Earth – stability and grounding."],
        [144.72, "Mars – action and energy."],
        [183.58, "Jupiter – abundance and expansion."],
        [147.85, "Saturn – discipline and structure."],
        [207.36, "Uranus – innovation and change."],
        [211.44, "Neptune – intuition and dreams."]
    ],

    brainwave: [
        [0.5, 4, "Delta – associated with deep sleep and relaxation."],
        [4, 8, "Theta – associated with meditation and deep relaxation."],
        [8, 12, "Alpha – associated with calm alertness and creativity."],
        [12, 30, "Beta – associated with active thinking and focus."],
        [30, 100, "Gamma – associated with cognitive activity and mental performance."]
    ]
};

/* BUTTONS */

$("one").addEventListener("click", () => generate(1, false, true));
$("randomOne").addEventListener("click", generateRandomSingle);

$("sequence").addEventListener("click", () => {
    generate(Number($("soundCount").value), false, false);
});

$("randomSequence").addEventListener("click", generateRandomSequence);
$("stop").addEventListener("click", stopSound);

$("startRecord").addEventListener("click", startRecording);
$("stopRecord").addEventListener("click", stopRecording);

$("replayRecording").addEventListener("click", replayRecording);
$("stopReplay").addEventListener("click", stopReplay);

$("saveWav").addEventListener("click", saveWav);
$("saveOriginal").addEventListener("click", saveOriginal);

setPlayerButtons(false);
$("replayRecording").disabled = true;
$("stopReplay").disabled = true;

$("discardRecording").addEventListener("click", discardRecording);

$("discardUploadedAudio").addEventListener(
    "click",
    discardUploadedAudio
);

/* GOLDEN FREQUENCIES */

$("goldenCategory").addEventListener("change", () => {

    const category = $("goldenCategory").value;
    const frequencySelect = $("goldenFrequency");

    frequencySelect.innerHTML =
        '<option value="">Choose a frequency</option>';

    $("goldenDescription").textContent =
        "Choose a frequency to see its traditional association.";

    $("applyGoldenFrequency").disabled = true;

    if (!category || !goldenFrequencies[category]) {
        frequencySelect.disabled = true;
        return;
    }

    frequencySelect.disabled = false;

    goldenFrequencies[category].forEach((item, index) => {

        const option = document.createElement("option");

        option.value = index;

        if (category === "brainwave") {
            option.textContent =
                item[0] + "–" + item[1] + " Hz";
        } else {
            option.textContent = item[0] + " Hz";
        }

        frequencySelect.appendChild(option);
    });

    frequencySelect.selectedIndex = 0;
});


$("goldenFrequency").addEventListener("change", () => {

    const category = $("goldenCategory").value;
    const selectedIndex = $("goldenFrequency").value;

    $("applyGoldenFrequency").disabled = true;

    if (selectedIndex === "" || !category) return;

    const item = goldenFrequencies[category][Number(selectedIndex)];

    if (!item) return;

    if (category === "brainwave") {
        $("goldenDescription").textContent = item[2];
    } else {
        $("goldenDescription").textContent = item[1];
    }

    $("applyGoldenFrequency").disabled = false;
});


$("applyGoldenFrequency").addEventListener("click", () => {

    const category = $("goldenCategory").value;
    const selectedIndex = $("goldenFrequency").value;

    if (!category || selectedIndex === "") return;

    const item = goldenFrequencies[category][Number(selectedIndex)];

    if (!item) return;

    let min;
    let max;

    if (category === "brainwave") {
        min = item[0];
        max = item[1];
    } else {
        min = item[0];
        max = item[0];
    }

    // Apply selected frequency
    $("minPitch").value = min;
    $("maxPitch").value = max;
    // Start golden stars when a golden frequency is applied
    showGoldenStars();

    // Update slider labels
    $("minPitchValue").textContent = min + " Hz";
    $("maxPitchValue").textContent = max + " Hz";

    // Update description
    $("goldenDescription").textContent =
        "✓ Applied: " + min +
        (min !== max ? "–" + max : "") +
        " Hz. " +
        (category === "brainwave" ? item[2] : item[1]);

    // Confirmation
    $("status").textContent =
        "Golden frequency applied: " +
        min + (min !== max ? "–" + max : "") + " Hz";


});

/* CONTINUOUS GOLDEN FREQUENCY STARS */

let goldenStarInterval = null;

function showGoldenStars() {

    const container = $("goldenStars");

    if (!container) return;

    // Do not start a second animation loop
    if (goldenStarInterval !== null) return;

    // Respect reduced-motion preference
    if (window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches) return;

    function createGoldenStar() {

        const star = document.createElement("span");

        star.className = "golden-star";
        star.textContent = Math.random() > 0.5 ? "✦" : "✧";

        star.style.left = Math.random() * 100 + "%";

        star.style.fontSize =
            (9 + Math.random() * 13) + "px";

        const duration = 4 + Math.random() * 3;

        star.style.animationDuration = duration + "s";

        container.appendChild(star);

        setTimeout(() => {
            star.remove();
        }, duration * 1000);
    }

    // Start gentle continuous falling
    for (let i = 0; i < 8; i++) {
        setTimeout(createGoldenStar, i * 70);
    }

    goldenStarInterval = setInterval(() => {
        createGoldenStar();
    }, 120);
}

function stopGoldenStars() {

    if (goldenStarInterval !== null) {
        clearInterval(goldenStarInterval);
        goldenStarInterval = null;
    }

    const container = $("goldenStars");

    if (container) {
        container.innerHTML = "";
    }
}

/* START IN DAY MODE */

setNightMode(false);


/* FOLDABLE PANELS */

document.querySelectorAll(".panel").forEach(panel => {

    const heading = panel.querySelector(":scope > h2");

    // Skip panels without a heading
    if (!heading) return;

    // Create content wrapper
    const content = document.createElement("div");
    content.className = "panel-content";

    // Move everything below the heading into the wrapper
    while (heading.nextSibling) {
        content.appendChild(heading.nextSibling);
    }

    panel.appendChild(content);

    // Create + / - toggle button
    const toggleButton = document.createElement("button");

    toggleButton.type = "button";
    toggleButton.className = "panel-chevron";
    toggleButton.textContent = "+";
    toggleButton.setAttribute("aria-label", "Expand section");
    toggleButton.setAttribute("aria-expanded", "false");

    // Collapse every panel by default
    panel.classList.add("collapsed");

    heading.appendChild(toggleButton);

    // Shared toggle function
    function togglePanel() {

        const collapsed = panel.classList.toggle("collapsed");

        toggleButton.textContent = collapsed ? "+" : "−";

        toggleButton.setAttribute(
            "aria-expanded",
            String(!collapsed)
        );

        toggleButton.setAttribute(
            "aria-label",
            collapsed ? "Expand section" : "Collapse section"
        );
    }

    // Clicking the + / - button always toggles
    toggleButton.addEventListener("click", event => {
        event.stopPropagation();
        togglePanel();
    });

    // Clicking the panel expands it ONLY when collapsed
    panel.addEventListener("click", event => {

        if (!panel.classList.contains("collapsed")) return;

        // Ignore clicks on interactive elements
        if (event.target.closest(
            "button, input, select, textarea, a, audio, label"
        )) return;

        togglePanel();
    });

});
