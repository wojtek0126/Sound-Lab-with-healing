const supportedLanguages = ["en", "pl"];
const languageStorageKey = "sound-lab.language";
const localeMessages = Object.create(null);
const dynamicTranslations = new WeakMap();
let currentLanguage = "en";

function t(key, parameters = {}) {
    const message = localeMessages[currentLanguage]?.[key]
        ?? localeMessages.en?.[key]
        ?? key;

    return String(message).replace(/\{(\w+)\}/g, (placeholder, name) =>
        Object.prototype.hasOwnProperty.call(parameters, name)
            ? String(typeof parameters[name] === "function"
                ? parameters[name]()
                : parameters[name])
            : placeholder
    );
}

function setLocalizedText(element, key, parameters = {}) {
    dynamicTranslations.set(element, { key, parameters });
    element.dataset.i18n = key;
    element.textContent = t(key, parameters);
}

function getElementTranslation(element, key, parameters) {
    const message = t(key, parameters);
    const icon = element.parentElement?.querySelector(":scope > .section-heading-icon");

    if (icon && message.startsWith(icon.textContent)) {
        return message.slice(icon.textContent.length).trimStart();
    }

    return message;
}

function readSavedLanguage() {
    try {
        return localStorage.getItem(languageStorageKey);
    } catch (error) {
        return null;
    }
}

function saveLanguage(language) {
    try {
        localStorage.setItem(languageStorageKey, language);
    } catch (error) {
        // The selected language still works when storage is unavailable.
    }
}

function applyTranslations() {
    document.documentElement.lang = currentLanguage;
    document.title = t("document.title");

    document.querySelectorAll("[data-i18n]").forEach(element => {
        const dynamic = dynamicTranslations.get(element);
        element.textContent = getElementTranslation(
            element,
            element.dataset.i18n,
            dynamic?.parameters
        );
    });

    document.querySelectorAll("[data-i18n-attr]").forEach(element => {
        element.dataset.i18nAttr.split(";").forEach(binding => {
            const separator = binding.indexOf(":");
            if (separator < 0) return;

            const attribute = binding.slice(0, separator).trim();
            const key = binding.slice(separator + 1).trim();
            element.setAttribute(attribute, t(key));
        });
    });

    const languageSelect = document.getElementById("languageSelect");
    if (languageSelect) languageSelect.value = currentLanguage;

    document.dispatchEvent(new CustomEvent("languagechange", {
        detail: { language: currentLanguage }
    }));
}

async function initializeLocalization() {
    const results = await Promise.allSettled(supportedLanguages.map(async language => {
        const response = await fetch(`locales/${language}.json`, { cache: "no-cache" });
        if (!response.ok) {
            throw new Error(`Could not load ${language}.json (${response.status})`);
        }
        localeMessages[language] = await response.json();
    }));

    const englishLoaded = results[0].status === "fulfilled";
    if (!englishLoaded) {
        throw results[0].reason;
    }

    if (results[1].status === "rejected") {
        console.error("Could not load Polish translations.", results[1].reason);
    }

    const savedLanguage = readSavedLanguage();
    currentLanguage = savedLanguage === "pl" && localeMessages.pl ? "pl" : "en";
    saveLanguage(currentLanguage);
    applyTranslations();
    return true;
}

const localizationReady = initializeLocalization().catch(error => {
    console.error("Could not initialize localization. Serve the app over HTTP to load locale JSON files.", error);
    return false;
});

async function setLanguage(language) {
    const ready = await localizationReady;

    if (!ready || !supportedLanguages.includes(language) || !localeMessages[language]) return;

    currentLanguage = language;
    saveLanguage(language);
    applyTranslations();
}

document.getElementById("languageSelect")?.addEventListener("change", event => {
    setLanguage(event.target.value);
});

window.t = t;
window.setLocalizedText = setLocalizedText;
window.setLanguage = setLanguage;
window.localizationReady = localizationReady;
Object.defineProperty(window, "currentLanguage", {
    get: () => currentLanguage
});
