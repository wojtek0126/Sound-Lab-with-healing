/* SLIDERS */

const sliderLabelUpdates = [];

function formatSeconds(value) {
    const amount = Number(value);

    if (window.currentLanguage === "pl") {
        if (amount === 1) return t("settings.secondSingular");
        if (amount % 10 >= 2 && amount % 10 <= 4 && (amount % 100 < 12 || amount % 100 > 14)) {
            return t("settings.secondsFew");
        }
        return t("settings.seconds");
    }

    return t(amount === 1 ? "settings.secondSingular" : "settings.seconds");
}

function connectSlider(id, outputId, suffix = "") {
    const slider = $(id);
    const output = $(outputId);

    function update() {
        const translatedSuffix = suffix === "seconds"
            ? " " + formatSeconds(slider.value)
            : suffix;
        output.textContent = slider.value + translatedSuffix;
    }

    slider.addEventListener("input", update);
    sliderLabelUpdates.push(update);
    update();
}

connectSlider("soundDuration", "durationValue", "seconds");
connectSlider("soundVolume", "volumeValue", "%");
connectSlider("gap", "gapValue", "seconds");
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
        if (select.disabled) return;

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
        [396, "goldenFrequencies.items.solfeggio.396"],
        [417, "goldenFrequencies.items.solfeggio.417"],
        [528, "goldenFrequencies.items.solfeggio.528"],
        [639, "goldenFrequencies.items.solfeggio.639"],
        [741, "goldenFrequencies.items.solfeggio.741"],
        [852, "goldenFrequencies.items.solfeggio.852"],
        [963, "goldenFrequencies.items.solfeggio.963"]
    ],

    additional: [
        [174, "goldenFrequencies.items.additional.174"],
        [285, "goldenFrequencies.items.additional.285"],
        [1074, "goldenFrequencies.items.additional.1074"],
        [1174, "goldenFrequencies.items.additional.1174"],
        [1152, "goldenFrequencies.items.additional.1152"],
        [2172, "goldenFrequencies.items.additional.2172"]
    ],

    tesla: [
        [333, "goldenFrequencies.items.tesla.333"],
        [639, "goldenFrequencies.items.tesla.639"],
        [999, "goldenFrequencies.items.tesla.999"]
    ],

    angel: [
        [111, "goldenFrequencies.items.angel.111"],
        [222, "goldenFrequencies.items.angel.222"],
        [333, "goldenFrequencies.items.angel.333"],
        [444, "goldenFrequencies.items.angel.444"],
        [555, "goldenFrequencies.items.angel.555"],
        [666, "goldenFrequencies.items.angel.666"],
        [777, "goldenFrequencies.items.angel.777"],
        [888, "goldenFrequencies.items.angel.888"],
        [999, "goldenFrequencies.items.angel.999"]
    ],

    schumann: [
        [7.83, "goldenFrequencies.items.schumann.7.83"]
    ],

    planetary: [
        [141.27, "goldenFrequencies.items.planetary.141.27"],
        [221.23, "goldenFrequencies.items.planetary.221.23"],
        [126.22, "goldenFrequencies.items.planetary.126.22"],
        [144.72, "goldenFrequencies.items.planetary.144.72"],
        [183.58, "goldenFrequencies.items.planetary.183.58"],
        [147.85, "goldenFrequencies.items.planetary.147.85"],
        [207.36, "goldenFrequencies.items.planetary.207.36"],
        [211.44, "goldenFrequencies.items.planetary.211.44"]
    ],

    brainwave: [
        [0.5, 4, "goldenFrequencies.items.brainwave.0.5-4"],
        [4, 8, "goldenFrequencies.items.brainwave.4-8"],
        [8, 12, "goldenFrequencies.items.brainwave.8-12"],
        [12, 30, "goldenFrequencies.items.brainwave.12-30"],
        [30, 100, "goldenFrequencies.items.brainwave.30-100"]
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

    frequencySelect.replaceChildren(new Option(
        t("goldenFrequencies.chooseFrequency"),
        ""
    ));

    setLocalizedText(
        $("goldenDescription"),
        "goldenFrequencies.chooseFrequencyDescription"
    );

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
        setLocalizedText($("goldenDescription"), item[2]);
    } else {
        setLocalizedText($("goldenDescription"), item[1]);
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
    const range = min + (min !== max ? "–" + max : "");
    const descriptionKey = category === "brainwave" ? item[2] : item[1];
    setLocalizedText($("goldenDescription"), "goldenFrequencies.applied", {
        range,
        description: () => t(descriptionKey)
    });

    // Confirmation
    setLocalizedText($("status"), "goldenFrequencies.statusApplied", { range });


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
    toggleButton.setAttribute("aria-label", t("panels.expand"));
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
            t(collapsed ? "panels.expand" : "panels.collapse")
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

document.addEventListener("languagechange", () => {
    sliderLabelUpdates.forEach(update => update());
    synchronizePitchSliders();

    const frequencySelect = $("goldenFrequency");
    if (frequencySelect.options.length > 1) {
        frequencySelect.options[0].textContent = t("goldenFrequencies.chooseFrequency");
    }

    document.querySelectorAll(".panel-chevron").forEach(button => {
        const key = button.getAttribute("aria-expanded") === "true"
            ? "panels.collapse"
            : "panels.expand";
        button.setAttribute("aria-label", t(key));
    });
});
