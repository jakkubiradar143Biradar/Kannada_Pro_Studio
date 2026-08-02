// Mahiti Chakra 20 Pro Voices State
let selectedVoice = 'm1';

// Voice Changer & Recorder State
let mediaRecorder = null;
let audioChunks = [];
let recordedAudioBlob = null;
let isRecording = false;
let recTimerInterval = null;
let recSeconds = 0;
let isUserTypedText = false; // Flag to track if user typed custom text
let kanglishDebounceTimer = null;
let committedWordChoices = {}; // Maps wordIndex -> userChosenKannadaWord (LOCKED Gboard Choices)
let currentCursorWordIndex = -1;

// Expanded Kanglish Transliteration Fallback Dictionary
const KANGLISH_DICTIONARY = {
    "namaskara": "ನಮಸ್ಕಾರ",
    "hegidira": "ಹೇಗಿದ್ದೀರಾ",
    "kannada": "ಕನ್ನಡ",
    "dhanyavada": "ಧನ್ಯವಾದ",
    "shubhadina": "ಶುಭದಿನ",
    "chennagidini": "ಚೆನ್ನಾಗಿದ್ದೀನಿ",
    "nanna": "ನನ್ನ",
    "namma": "ನಮ್ಮ",
    "hesaru": "ಹೆಸರು",
    "karnataka": "ಕರ್ನಾಟಕ",
    "sundara": "ಸುಂದರ",
    "oota": "ಊಟ",
    "banni": "ಬನ್ನಿ",
    "illa": "ಇಲ್ಲ",
    "houdu": "ಹೌದು",
    "pro": "ಪ್ರೊ",
    "ai": "ಎಐ",
    "studio": "ಸ್ಟುಡಿಯೋ",
    "voice": "ಧ್ವನಿ",
    "rajya": "ರಾಜ್ಯ",
    "namaste": "ನಮಸ್ತೆ",
    "yaaru": "ಯಾರು",
    "yelli": "ಎಲ್ಲಿ",
    "yavaga": "ಯಾವಾಗ",
    "yethake": "ಏತಕ್ಕೆ",
    "yeke": "ಏಕೆ",
    "hosa": "ಹೊಸ",
    "suddi": "ಸುದ್ದಿ",
    "kathe": "ಕಥೆ",
    "mass": "ಮಾಸ್",
    "jahiratu": "ಜಾಹೀರಾತು",
    "shikshana": "ಶಿಕ್ಷಣ",
    "shaili": "ಶೈಲಿ",
    "bandide": "ಬಂದಿದೆ",
    "ide": "ಇದೆ",
    "maadi": "ಮಾಡಿ",
    "madi": "ಮಾಡಿ",
    "kodi": "ಕೊಡಿ",
    "nodi": "ನೋಡಿ",
    "keli": "ಕೇಳಿ",
    "helu": "ಹೇಳು",
    "bhaarat": "ಭಾರತ",
    "bharata": "ಭಾರತ",
    "bengaluru": "ಬೆಂಗಳೂರು",
    "mysuru": "ಮೈಸೂರು",
    "exam": "ಎಕ್ಸಾಮ್",
    "date": "ಡೇಟ್"
};

// 🎯 DEDICATED SAMPLE GREETINGS FOR EACH VOICE MODEL
const VOICE_SAMPLES = {
    'm1': 'ನನ್ನ ಹೆಸರು ಗಗನ್. ಸುದ್ದಿ ಪ್ರಸಾರಕ್ಕೆ ನನ್ನ ಧ್ವನಿ ಸಿದ್ಧವಾಗಿದೆ.',
    'f1': 'ನನ್ನ ಹೆಸರು ಸಪ್ನಾ. ನಿಮ್ಮ ಆಡಿಯೋ ಲೇಖನಗಳಿಗೆ ನನ್ನ ಸ್ಪಷ್ಟ ಧ್ವನಿ ಬಳಸಿ.',
    'm2': 'ನನ್ನ ಹೆಸರು ರಾಜೇಶ್. ಎಫ್‌ಎಂ ರೇಡಿಯೋ ಶೈಲಿಯಲ್ಲಿ ನನ್ನ ಧ್ವನಿ ಕೇಳಿ.',
    'f2': 'ನನ್ನ ಹೆಸರು ರಶ್ಮಿ. ರೇಡಿಯೋ ಜಾಕಿಯಂತೆ ನಿಮ್ಮೊಂದಿಗೆ ಮಾತನಾಡಲು ಬಂದಿದ್ದೇನೆ.',
    'm3': 'ನನ್ನ ಹೆಸರು ವಿಕ್ರಮ್. ಇಂದಿನ ಮುಖ್ಯ ವರದಿಗಳನ್ನು ಓದಲು ಧ್ವನಿ ಸಿದ್ಧ.',
    'f3': 'ನನ್ನ ಹೆಸರು ಪ್ರಿಯಾ. ಬ್ರೇಕಿಂಗ್ ನ್ಯೂಸ್ ಸುದ್ದಿ ಪ್ರಸಾರಕ್ಕೆ ನನ್ನ ಧ್ವನಿ ಬಳಸಿ.',
    'm4': 'ನನ್ನ ಹೆಸರು ದೇವ್. ಮಾಸ್ ಡೈಲಾಗ್ ಮತ್ತು ಆಕ್ಷನ್ ಕಥೆಗಳಿಗೆ ನನ್ನ ಪವರ್‌ಫುಲ್ ಧ್ವನಿ ಸಿದ್ಧ.',
    'f4': 'ನನ್ನ ಹೆಸರು ಪೂಜಾ. ಫ್ಯಾಶನ್ ಮತ್ತು ಶೋ ರೂಮ್ ಜಾಹೀರಾತುಗಳಿಗೆ ನನ್ನ ಧ್ವನಿ ಬಳಸಿ.',
    'm5': 'ನನ್ನ ಹೆಸರು ಅರ್ಜುನ್. ಕ್ರಿಕೆಟ್ ಮತ್ತು ಕ್ರೀಡಾ ವರದಿಗಳಿಗೆ ನನ್ನ ಧ್ವನಿ ಕೇಳಿ.',
    'f5': 'ನನ್ನ ಹೆಸರು ಅನನ್ಯ. ಚಂದಮಾಮ ಕಥೆಗಳನ್ನು ಹೇಳಲು ನನ್ನ ಧ್ವನಿ ಇಲ್ಲಿದೆ.',
    'm6': 'ನನ್ನ ಹೆಸರು ಸೂರ್ಯ. ಟೆಕ್ನಾಲಜಿ ಮತ್ತು ಮೊಬೈಲ್ ರಿವ್ಯೂಗಳಿಗೆ ಧ್ವನಿ ಬಳಸಿ.',
    'f6': 'ನನ್ನ ಹೆಸರು ಕಾವ್ಯ. ರಿಯಾಯಿತಿ ಮತ್ತು ಧಮಾಕಾ ಆಫರ್ ಜಾಹೀರಾತುಗಳಿಗೆ ಧ್ವನಿ ಬಳಸಿ.',
    'm7': 'ನನ್ನ ಹೆಸರು ಗುರು. ಭಕ್ತಿ ಸಂದೇಶ ಮತ್ತು ಪ್ರವಚನಗಳಿಗೆ ನನ್ನ ಧ್ವನಿ ಕೇಳಿ.',
    'f7': 'ನನ್ನ ಹೆಸರು ಸ್ನೇಹಾ. ಸಂಜೆಯ ಎಫ್‌ಎಂ ಕಾರ್ಯಕ್ರಮಗಳಿಗೆ ನನ್ನ ಧ್ವನಿ ಸಿದ್ಧ.',
    'm8': 'ನನ್ನ ಹೆಸರು ಚೇತನ್. ಸುಂದರವಾದ ಕಥೆಗಳನ್ನು ಹೇಳಲು ನನ್ನ ಧ್ವನಿ ಸಿದ್ಧ.',
    'f8': 'ನನ್ನ ಹೆಸರು ಶ್ರೇಯಾ. ಶೈಕ್ಷಣಿಕ ಪಾಠಗಳು ಮತ್ತು ತರಗತಿಗಳಿಗೆ ನನ್ನ ಧ್ವನಿ ಬಳಸಿ.',
    'm9': 'ನನ್ನ ಹೆಸರು ಕಿರಣ್. ಬಿಲ್ಡಿಂಗ್ ಮತ್ತು ಶೋರೂಮ್ ಜಾಹೀರಾತುಗಳಿಗೆ ಧ್ವನಿ ಬಳಸಿ.',
    'f9': 'ನನ್ನ ಹೆಸರು ಮೌಲ್ಯ. ಪ್ರಶಾಂತವಾದ ಮೆಡಿಟೇಶನ್ ಧ್ವನಿ ಇಲ್ಲಿದೆ.',
    'm10': 'ನನ್ನ ಹೆಸರು ಧನಂಜಯ. ಮಾಸ್ ಹಾಗೂ ಪವರ್‌ಫುಲ್ ಕಂಠದ ಧ್ವನಿ ಸಿದ್ಧ.',
    'f10': 'ನನ್ನ ಹೆಸರು ಸ್ಪಂದನಾ. ಎಚ್‌ಡಿ ಕ್ಲಾರಿಟಿ ರೇಡಿಯೋ ಧ್ವನಿ ಇಲ್ಲಿದೆ.'
};

// 🎯 PRESET TEXTS FOR INTONATION STYLES
const PRESET_TEXTS = {
    'news': 'ರಾಜ್ಯದಾದ್ಯಂತ ಕೃಷಿ ಮತ್ತು ಶೈಕ್ಷಣಿಕ ವಲಯಕ್ಕೆ ಸರ್ಕಾರದ ಕಡೆಯಿಂದ ಭಾರಿ ಅನುದಾನ ಬಿಡುಗಡೆಯಾಗಿದೆ. ಅರ್ಹ ಫಲಾನುಭವಿಗಳು ತಕ್ಷಣವೇ ಆನ್‌ಲೈನ್ ಮೂಲಕ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ ಸೌಲಭ್ಯ ಪಡೆಯಿರಿ.',
    'story': 'ಒಂದಾನೊಂದು ಕಾಲದಲ್ಲಿ ದಟ್ಟವಾದ ಸೌಂದರ್ಯದ ಪ್ರಕೃತಿಯ ಕಾಡಿನಲ್ಲಿ ಒಂದು ಸುಂದರವಾದ ಸರೋವರವಿತ್ತು. ಅಲ್ಲಿ ವಾಸಿಸುತ್ತಿದ್ದ ಪ್ರಾಣಿಗಳು ಪರಸ್ಪರ ಪ್ರೀತಿ ಮತ್ತು ಸೌಹಾರ್ದತೆಯಿಂದ ಜೀವಿಸುತ್ತಿದ್ದವು.',
    'mass': 'ಸಾಮ್ರಾಜ್ಯಕ್ಕೆ ಒಬ್ಬನೇ ಸಿಂಹ! ನನ್ನ ದಾರಿ ಅಡ್ಡ ಬಂದರೆ ಯಾವ ಶಕ್ತಿಯೂ ಉಳಿಲು ಸಾಧ್ಯವಿಲ್ಲ! ಇದು ಕನ್ನಡ ಚಿತ್ರರಂಗದ ಭವ್ಯ ಮಾಸ್ ಪವರ್!',
    'ad': 'ಬೃಹತ್ ಧಮಾಕಾ ಆಫರ್! ನಿಮ್ಮ ನೆಚ್ಚಿನ ಬ್ರಾಂಡೆಡ್ ಬಟ್ಟೆಗಳು ಮತ್ತು ಎಲೆಕ್ಟ್ರಾನಿಕ್ಸ್ ಸಾಮಗ್ರಿಗಳ ಮೇಲೆ ಶೇಕಡಾ 50 ರಷ್ಟು ಭಾರಿ ರಿಯಾಯಿತಿ ಸಿಗುತ್ತಿದೆ! ಇಂದು ಭೇಟಿ ನೀಡಿ!',
    'edu': 'ಆತ್ಮೀಯ ವಿದ್ಯಾರ್ಥಿಗಳೇ, ಇಂದಿನ ತರಗತಿಯಲ್ಲಿ ನಾವು ವಿಜ್ಞಾನ ಮತ್ತು ಗಣಿತದ ಪ್ರಮುಖ ಸೂತ್ರಗಳನ್ನು ಸರಳ ಹಾಗೂ ಆಸಕ್ತಿದಾಯಕವಾಗಿ ಕಲಿಯೋಣ.'
};

// Setup Listeners & Auto Keep-Alive Server Ping on Load
document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/health').catch(() => {});
    setInterval(() => {
        fetch('/api/health').catch(() => {});
    }, 4 * 60 * 1000);

    const ttsInput = document.getElementById('ttsTextInput');
    if (ttsInput) {
        ttsInput.addEventListener('input', () => {
            if (ttsInput.value.trim().length > 0) {
                isUserTypedText = true;
            } else {
                isUserTypedText = false;
            }
        });
    }

    const kangInput = document.getElementById('kangInput');
    if (kangInput) {
        ['click', 'keyup', 'select'].forEach(evt => {
            kangInput.addEventListener(evt, () => handleKanglishCursorMove());
        });
    }
});

// Select Voice Model - Inserts sample greeting if empty or untyped
function selectVoiceModel(voiceId, element) {
    selectedVoice = voiceId;
    document.querySelectorAll('.voice-models-container .model-card').forEach(c => c.classList.remove('active'));
    if (element) {
        element.classList.add('active');
    }

    const ttsInput = document.getElementById('ttsTextInput');
    if (ttsInput) {
        const val = ttsInput.value.trim();
        const isSampleOrEmpty = (!isUserTypedText || val === '' || Object.values(VOICE_SAMPLES).includes(val) || Object.values(PRESET_TEXTS).includes(val));
        if (isSampleOrEmpty && VOICE_SAMPLES[voiceId]) {
            ttsInput.value = VOICE_SAMPLES[voiceId];
            isUserTypedText = false;
        }
    }
}

// 🎯 SPEECH INTONATION & FLOW STYLE PRESETS ENGINE - Preserves user typed text
function applyFlowPreset(style, element) {
    document.querySelectorAll('.sample-pills-row .pill').forEach(p => p.classList.remove('active'));
    if (element) element.classList.add('active');

    const ttsInput = document.getElementById('ttsTextInput');
    if (ttsInput && PRESET_TEXTS[style]) {
        const val = ttsInput.value.trim();
        const isSampleOrEmpty = (!isUserTypedText || val === '' || Object.values(PRESET_TEXTS).includes(val) || Object.values(VOICE_SAMPLES).includes(val));
        if (isSampleOrEmpty) {
            ttsInput.value = PRESET_TEXTS[style];
            isUserTypedText = false;
        }
    }

    const rateSlider = document.getElementById('rateSlider');
    const pitchSlider = document.getElementById('pitchSlider');
    const volSlider = document.getElementById('volSlider');
    const eqSelect = document.getElementById('eqSelect');

    if (style === 'news') {
        rateSlider.value = "1.2";
        pitchSlider.value = "2";
        volSlider.value = "50";
        eqSelect.value = "studio";
    } else if (style === 'story') {
        rateSlider.value = "0.95";
        pitchSlider.value = "-2";
        volSlider.value = "40";
        eqSelect.value = "radio";
    } else if (style === 'mass') {
        rateSlider.value = "1.1";
        pitchSlider.value = "-8";
        volSlider.value = "70";
        eqSelect.value = "bass";
    } else if (style === 'ad') {
        rateSlider.value = "1.25";
        pitchSlider.value = "4";
        volSlider.value = "60";
        eqSelect.value = "radio";
    } else if (style === 'edu') {
        rateSlider.value = "1.0";
        pitchSlider.value = "0";
        volSlider.value = "50";
        eqSelect.value = "studio";
    }

    updateRateLabel(rateSlider.value);
    updatePitchLabel(pitchSlider.value);
    updateVolLabel(volSlider.value);
}

function clearText() {
    const ttsInput = document.getElementById('ttsTextInput');
    if (ttsInput) {
        ttsInput.value = "";
        isUserTypedText = false;
        ttsInput.focus();
    }
}

// Customizer Sliders
function updateRateLabel(val) {
    const el = document.getElementById('rateVal');
    if (el) el.innerText = val + 'x (Fast)';
}

function updateVolLabel(val) {
    const el = document.getElementById('volVal');
    if (el) el.innerText = `+${val}% (Loud)`;
}

function updatePitchLabel(val) {
    const el = document.getElementById('pitchVal');
    if (el) {
        const v = parseInt(val);
        el.innerText = v > 0 ? `+${v}Hz` : `${v}Hz`;
    }
}

// Kanglish Accordion Toggle
function toggleKanglish() {
    const body = document.getElementById('kangBody');
    if (!body) return;
    if (body.style.display === 'none' || !body.style.display) {
        body.style.display = 'block';
    } else {
        body.style.display = 'none';
    }
}

// Detect exact word & index under mouse cursor / caret
function getWordAtCursor(textarea) {
    if (!textarea) return { word: '', index: -1 };
    const text = textarea.value;
    const pos = textarea.selectionStart || text.length;

    const left = text.slice(0, pos).search(/\S+$/);
    const start = left === -1 ? pos : left;

    const right = text.slice(pos).search(/\s/);
    const end = right === -1 ? text.length : pos + right;

    const word = text.slice(start, end).trim();
    
    const wordsBefore = text.slice(0, start).trim().split(/\s+/).filter(w => w.length > 0);
    const wordIndex = text.slice(0, start).trim() === '' ? 0 : wordsBefore.length;

    return { word: word, index: wordIndex };
}

// Handle cursor navigation / mouse click inside Kanglish box
async function handleKanglishCursorMove() {
    const kangInput = document.getElementById('kangInput');
    if (!kangInput || kangInput.value.trim() === '') return;

    const cursorInfo = getWordAtCursor(kangInput);
    if (cursorInfo.word && cursorInfo.word.length >= 1) {
        currentCursorWordIndex = cursorInfo.index;
        await updateSmartVariationsForWord(cursorInfo.word, cursorInfo.index);
    }
}

// Helper: Fetch Google Transliteration Chunk for full text
async function fetchGoogleTransliterationChunk(chunk) {
    if (!chunk || chunk.trim() === '') return { result: '' };
    try {
        const url = `https://inputtools.google.com/request?text=${encodeURIComponent(chunk)}&itc=kn-t-i0-und&num=1`;
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            if (data && data[0] === 'SUCCESS' && data[1] && data[1][0]) {
                const topResult = data[1][0][1][0] || chunk;
                return { result: topResult };
            }
        }
    } catch (err) {
        console.log("Chunk transliteration error:", err);
    }
    const words = chunk.toLowerCase().split(/\s+/);
    const local = words.map(w => KANGLISH_DICTIONARY[w] || w).join(' ');
    return { result: local };
}

// Helper: Fetch suggestions for ONLY the single active word under cursor
async function fetchActiveWordVariations(word) {
    if (!word || word.trim() === '' || word.length < 1) return [];
    try {
        const url = `https://inputtools.google.com/request?text=${encodeURIComponent(word)}&itc=kn-t-i0-und&num=5`;
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            if (data && data[0] === 'SUCCESS' && data[1] && data[1][0] && data[1][0][1]) {
                return data[1][0][1];
            }
        }
    } catch (err) {
        console.log("Active word suggestion error:", err);
    }
    return [];
}

// Update Smart Variations UI chips for specific word at wordIndex
async function updateSmartVariationsForWord(word, wordIndex) {
    const sugContainer = document.getElementById('kangSuggestions');
    const sugChipsRow = document.getElementById('sugChipsRow');
    if (!sugContainer || !sugChipsRow) return;

    if (!word || word.length < 1) {
        sugContainer.style.display = 'none';
        return;
    }

    const wordVariations = await fetchActiveWordVariations(word);
    if (wordVariations && wordVariations.length > 0) {
        sugChipsRow.innerHTML = '';
        wordVariations.slice(0, 5).forEach((v, idx) => {
            const chip = document.createElement('button');
            const isSelected = (committedWordChoices[wordIndex] === v) || (!committedWordChoices[wordIndex] && idx === 0);
            chip.className = isSelected ? 'sug-chip selected' : 'sug-chip';
            chip.innerText = v;
            chip.onclick = () => applyActiveWordSuggestionAt(v, wordIndex, chip);
            sugChipsRow.appendChild(chip);
        });
        sugContainer.style.display = 'flex';
    } else {
        sugContainer.style.display = 'none';
    }
}

// 🌐 CURSOR-AWARE GBOARD KANGLISH TRANSLITERATION ENGINE
async function convertKanglish(text) {
    const resEl = document.getElementById('kangResult');
    const statsEl = document.getElementById('kangStats');
    const sugContainer = document.getElementById('kangSuggestions');

    if (!text || text.trim() === '') {
        committedWordChoices = {};
        if (resEl) resEl.innerText = "Converted Kannada text will appear here...";
        if (statsEl) statsEl.innerText = "0 Words | 0 Chars";
        if (sugContainer) sugContainer.style.display = 'none';
        return;
    }

    const wordsArr = text.trim().split(/\s+/);
    const wordsCount = wordsArr.length;
    const charCount = text.length;
    if (statsEl) statsEl.innerText = `📊 ${wordsCount} Words | ${charCount} Chars (Unlimited Mode)`;

    const kangInput = document.getElementById('kangInput');
    const cursorInfo = getWordAtCursor(kangInput);
    const targetWord = cursorInfo.word || wordsArr[wordsArr.length - 1] || "";
    const targetIndex = cursorInfo.index >= 0 ? cursorInfo.index : wordsArr.length - 1;
    currentCursorWordIndex = targetIndex;

    const localConvertedWords = wordsArr.map((w, idx) => {
        if (committedWordChoices[idx]) return committedWordChoices[idx];
        return KANGLISH_DICTIONARY[w.toLowerCase()] || w;
    });
    if (resEl) resEl.innerText = localConvertedWords.join(' ');

    clearTimeout(kanglishDebounceTimer);
    kanglishDebounceTimer = setTimeout(async () => {
        const finalKannadaWords = [];

        for (let idx = 0; idx < wordsArr.length; idx++) {
            if (committedWordChoices[idx]) {
                finalKannadaWords.push(committedWordChoices[idx]);
            } else {
                const wordToken = wordsArr[idx];
                const resObj = await fetchGoogleTransliterationChunk(wordToken);
                finalKannadaWords.push(typeof resObj === 'object' ? resObj.result : resObj);
            }
        }

        resEl.innerText = finalKannadaWords.join(' ');
        await updateSmartVariationsForWord(targetWord, targetIndex);
    }, 120);
}

// APPLY CHIP CHOICE AT SPECIFIC WORD INDEX
function applyActiveWordSuggestionAt(variationWord, targetIndex, clickedChip) {
    const resEl = document.getElementById('kangResult');
    if (!resEl) return;

    if (targetIndex >= 0) {
        committedWordChoices[targetIndex] = variationWord;

        const currentResWords = resEl.innerText.trim().split(/\s+/);
        if (currentResWords.length > targetIndex) {
            currentResWords[targetIndex] = variationWord;
            resEl.innerText = currentResWords.join(' ');
        }
    }

    document.querySelectorAll('.sug-chip').forEach(c => c.classList.remove('selected'));
    if (clickedChip) {
        clickedChip.classList.add('selected');
    }
}

function copyKanglishResult() {
    const resEl = document.getElementById('kangResult');
    const res = resEl ? resEl.innerText : '';
    if (res && res !== "Converted Kannada text will appear here...") {
        navigator.clipboard.writeText(res);
        alert("📋 Converted Kannada Text Copied!");
    }
}

function clearKanglish() {
    const kangInput = document.getElementById('kangInput');
    const resEl = document.getElementById('kangResult');
    const statsEl = document.getElementById('kangStats');
    const sugContainer = document.getElementById('kangSuggestions');

    committedWordChoices = {};
    if (kangInput) kangInput.value = '';
    if (resEl) resEl.innerText = 'Converted Kannada text will appear here...';
    if (statsEl) statsEl.innerText = '0 Words | 0 Chars';
    if (sugContainer) sugContainer.style.display = 'none';
}

function applyKanglish() {
    const resEl = document.getElementById('kangResult');
    const res = resEl ? resEl.innerText : '';
    if (res && res !== "Converted Kannada text will appear here...") {
        const ttsInput = document.getElementById('ttsTextInput');
        if (ttsInput) {
            ttsInput.value = res;
            isUserTypedText = true;
        }
    }
}

// 🎧 Web Audio API Real-time Vocal Pitch & Formant Engine for 20 Unique Voice Models
async function applyVocalEQ(audioArrayBuffer, eqType, voiceId) {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const decodedData = await audioCtx.decodeAudioData(audioArrayBuffer);

    // Define unique pitch semitones for each of the 20 models
    const VOICE_PITCH_PROFILES = {
        'm1': 0,     // Gagan Anchor (Anchor News Male)
        'f1': 5,     // Sapna Pro (Female Pro)
        'm2': -6,    // Rajesh RJ (Heavy Bass Broadcast DJ)
        'f2': 6,     // Rashmi RJ (Female FM RJ)
        'm3': -3,    // Vikram News (Deep News Male)
        'f3': 4,     // Priya News (Crisp News Female)
        'm4': -8,    // Dev Mass (Action Hero Heavy Mass)
        'f4': 7,     // Pooja Fashion (Ultra Bright Female)
        'm5': -2,    // Arjun Sports (Energetic Male)
        'f5': 3,     // Ananya Story (Warm Story Female)
        'm6': 1,     // Surya Tech (Tech Male)
        'f6': 6,     // Kavya Ad (Ad Commercial Female)
        'm7': -5,    // Guru Bhakti (Devotional Male)
        'f7': 5,     // Sneha FM (Soft FM Female)
        'm8': -3,    // Chetan Story (Narrative Male)
        'f8': 2,     // Shreya Edu (Classroom Female)
        'm9': -4,    // Kiran Ad (Promo Male)
        'f9': 1,     // Maulya Shanta (Meditation Female)
        'm10': -9,   // Dhananjaya Pro (Mass Power Male)
        'f10': 8     // Spandana Pro (Crystal HD Female)
    };

    const semitoneShift = VOICE_PITCH_PROFILES[voiceId] !== undefined ? VOICE_PITCH_PROFILES[voiceId] : 0;
    const pitchRatio = Math.pow(2, semitoneShift / 12.0);

    const renderDuration = decodedData.duration / (pitchRatio > 0 ? pitchRatio : 1);
    const offlineCtx = new OfflineAudioContext(
        decodedData.numberOfChannels,
        Math.ceil(renderDuration * decodedData.sampleRate),
        decodedData.sampleRate
    );

    const source = offlineCtx.createBufferSource();
    source.buffer = decodedData;
    source.playbackRate.value = pitchRatio;

    let lastNode = source;

    // Formant EQ Resonators for Gender & Character Distinction
    if (semitoneShift < -2) {
        // Deep Male Formant Boost
        const maleFormant = offlineCtx.createBiquadFilter();
        maleFormant.type = "lowshelf";
        maleFormant.frequency.value = 220;
        maleFormant.gain.value = 12;

        const subBass = offlineCtx.createBiquadFilter();
        subBass.type = "peaking";
        subBass.frequency.value = 90;
        subBass.gain.value = 8;

        lastNode.connect(maleFormant);
        maleFormant.connect(subBass);
        lastNode = subBass;
    } else if (semitoneShift > 2) {
        // Female High Formant Boost & Male Chest Cut
        const hp = offlineCtx.createBiquadFilter();
        hp.type = "highpass";
        hp.frequency.value = 240;

        const femaleFormant = offlineCtx.createBiquadFilter();
        femaleFormant.type = "highshelf";
        femaleFormant.frequency.value = 3200;
        femaleFormant.gain.value = 10;

        lastNode.connect(hp);
        hp.connect(femaleFormant);
        lastNode = femaleFormant;
    }

    // EQ Preset Filters
    if (eqType === 'bass') {
        const bassFilter = offlineCtx.createBiquadFilter();
        bassFilter.type = "lowshelf";
        bassFilter.frequency.value = 120;
        bassFilter.gain.value = 14;
        lastNode.connect(bassFilter);
        lastNode = bassFilter;
    } else if (eqType === 'radio') {
        const mid = offlineCtx.createBiquadFilter();
        mid.type = "peaking";
        mid.frequency.value = 2500;
        mid.gain.value = 8;
        lastNode.connect(mid);
        lastNode = mid;
    } else if (eqType === 'bright') {
        const hs = offlineCtx.createBiquadFilter();
        hs.type = "highshelf";
        hs.frequency.value = 3500;
        hs.gain.value = 10;
        lastNode.connect(hs);
        lastNode = hs;
    }

    const compressor = offlineCtx.createDynamicsCompressor();
    compressor.threshold.value = -20;
    compressor.ratio.value = 5;
    lastNode.connect(compressor);
    lastNode = compressor;

    lastNode.connect(offlineCtx.destination);
    source.start(0);

    const renderedBuffer = await offlineCtx.startRendering();
    return audioBufferToWav(renderedBuffer);
}

// Helper: Convert AudioBuffer to WAV Blob
function audioBufferToWav(buffer) {
    const numOfChan = buffer.numberOfChannels;
    const length = buffer.length * numOfChan * 2 + 44;
    const outBuffer = new ArrayBuffer(length);
    const view = new DataView(outBuffer);
    const channels = [];
    let sample = 0;
    let offset = 0;
    let pos = 0;

    function setUint16(data) { view.setUint16(pos, data, true); pos += 2; }
    function setUint32(data) { view.setUint32(pos, data, true); pos += 4; }

    setUint32(0x46464952);
    setUint32(length - 8);
    setUint32(0x45564157);
    setUint32(0x20746d66);
    setUint32(16);
    setUint16(1);
    setUint16(numOfChan);
    setUint32(buffer.sampleRate);
    setUint32(buffer.sampleRate * 2 * numOfChan);
    setUint16(numOfChan * 2);
    setUint16(16);
    setUint32(0x61746164);
    setUint32(length - pos - 4);

    for (let i = 0; i < buffer.numberOfChannels; i++) {
        channels.push(buffer.getChannelData(i));
    }

    while (offset < buffer.length) {
        for (let i = 0; i < numOfChan; i++) {
            sample = Math.max(-1, Math.min(1, channels[i][offset]));
            sample = (0.5 + sample < 0 ? sample * 32768 : sample * 32767) | 0;
            view.setInt16(pos, sample, true);
            pos += 2;
        }
        offset++;
    }

    return new Blob([outBuffer], { type: 'audio/wav' });
}

// COMPACT FLOATING SHARE POPOVER TOGGLE (RIGHT ABOVE BUTTON)
function toggleSharePopover(e) {
    if (e) e.stopPropagation();
    const popover = document.getElementById('sharePopover');
    if (popover) {
        popover.classList.toggle('active');
    }
}

function closeSharePopover() {
    const popover = document.getElementById('sharePopover');
    if (popover) {
        popover.classList.remove('active');
    }
}

function copyShareLink() {
    const targetUrl = 'https://mahitichakra.in/kannada-ai-voice-studio/';
    navigator.clipboard.writeText(targetUrl);
    alert(`📋 Studio Link Copied!\n\n${targetUrl}`);
    closeSharePopover();
}

// Close popover when clicking anywhere outside
document.addEventListener('click', function(e) {
    const popover = document.getElementById('sharePopover');
    const shareBtn = document.getElementById('shareAudioBtn');
    if (popover && popover.classList.contains('active')) {
        if (!popover.contains(e.target) && e.target !== shareBtn && (!shareBtn || !shareBtn.contains(e.target))) {
            popover.classList.remove('active');
        }
    }
});

// 🎙️ PRO VOICE CHANGER & AI NOISE CLEANER MODAL & ADVANCED ENGINE
function openVoiceChangerModal() {
    const modal = document.getElementById('voiceChangerModal');
    if (modal) {
        modal.classList.add('active');
        modal.scrollTop = 0;
    }
}

function closeVoiceChangerModal(e) {
    const modal = document.getElementById('voiceChangerModal');
    if (modal) modal.classList.remove('active');
}

// Recording Timer Counter
function startRecTimer() {
    recSeconds = 0;
    const timerText = document.getElementById('recTimerText');
    const vis = document.getElementById('recVisualizer');
    if (vis) vis.style.display = 'flex';
    
    if (recTimerInterval) clearInterval(recTimerInterval);
    recTimerInterval = setInterval(() => {
        recSeconds++;
        const mins = String(Math.floor(recSeconds / 60)).padStart(2, '0');
        const secs = String(recSeconds % 60).padStart(2, '0');
        if (timerText) timerText.innerText = `${mins}:${secs}`;
    }, 1000);
}

function stopRecTimer() {
    if (recTimerInterval) clearInterval(recTimerInterval);
    const vis = document.getElementById('recVisualizer');
    if (vis) vis.style.display = 'none';
}

// Live Microphone Recording Toggle (Web + App Fallback)
async function toggleRecording() {
    const recText = document.getElementById('recText');
    const recIcon = document.getElementById('recIcon');
    const recStatus = document.getElementById('recStatus');
    const recBtn = document.getElementById('recordBtn');

    if (!isRecording) {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            audioChunks = [];
            mediaRecorder = new MediaRecorder(stream);
            
            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) audioChunks.push(event.data);
            };

            mediaRecorder.onstop = () => {
                stopRecTimer();
                recordedAudioBlob = new Blob(audioChunks, { type: 'audio/wav' });
                if (recStatus) recStatus.innerText = "✅ Live Voice Recorded Successfully!";
            };

            mediaRecorder.start();
            isRecording = true;
            startRecTimer();
            if (recText) recText.innerText = "Stop Recording";
            if (recIcon) recIcon.innerText = "⏹️";
            if (recBtn) recBtn.classList.add('recording');
            if (recStatus) recStatus.innerText = "🔴 Live Voice Recording Active... Speak now!";
        } catch (err) {
            console.error("Microphone Access Error:", err);
            const appMicInput = document.getElementById('appMicInput');
            if (appMicInput) {
                alert("Opening Android App Voice Recorder...");
                appMicInput.click();
            } else {
                alert("Microphone access permission required.");
            }
        }
    } else {
        if (mediaRecorder && mediaRecorder.state !== 'inactive') {
            mediaRecorder.stop();
            mediaRecorder.stream.getTracks().forEach(track => track.stop());
        }
        isRecording = false;
        stopRecTimer();
        if (recText) recText.innerText = "Start Recording";
        if (recIcon) recIcon.innerText = "🎙️";
        if (recBtn) recBtn.classList.remove('recording');
    }
}

// Handle Audio File Upload / App Recorder
function handleAudioUpload(event) {
    const file = event.target.files[0];
    const recStatus = document.getElementById('recStatus');
    if (file) {
        recordedAudioBlob = file;
        if (recStatus) recStatus.innerText = `✅ Voice Audio Input Ready: ${file.name}`;
    }
}

// Update VC Sliders Labels
function updateVcPitchLabel(val) {
    const el = document.getElementById('vcPitchVal');
    if (el) {
        const v = parseInt(val);
        el.innerText = v > 0 ? `+${v} Semitones` : `${v} Semitones`;
    }
}

function updateVcSpeedLabel(val) {
    const el = document.getElementById('vcSpeedVal');
    if (el) el.innerText = `${val}x`;
}

// Process Audio (Advanced Pitch Shift + Formant Morphing + AI Noise Cleaner)
async function processVoiceChanger() {
    const recStatus = document.getElementById('recStatus');
    const processBtn = document.getElementById('processVcBtn');
    const targetVoice = document.getElementById('vcTargetVoice').value;
    const cleanNoise = document.getElementById('noiseCleanCheck').checked;
    const customPitchSemis = parseFloat(document.getElementById('vcPitchSlider').value);
    const customSpeed = parseFloat(document.getElementById('vcSpeedSlider').value);

    if (!recordedAudioBlob) {
        alert("Please record your voice or upload an audio file first!");
        return;
    }

    if (recStatus) recStatus.innerText = "⏳ Morphing Voice & Cleaning Background Noise...";
    if (processBtn) processBtn.innerText = "⚡ Processing...";

    try {
        const arrayBuffer = await recordedAudioBlob.arrayBuffer();
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const decodedData = await audioCtx.decodeAudioData(arrayBuffer);

        let semitoneShift = customPitchSemis;
        
        if (targetVoice === 'gagan') semitoneShift = -5;
        else if (targetVoice === 'sapna') semitoneShift = 6;
        else if (targetVoice === 'rajesh') semitoneShift = -7;
        else if (targetVoice === 'rashmi') semitoneShift = 5;
        else if (targetVoice === 'dev_mass') semitoneShift = -9;
        else if (targetVoice === 'child') semitoneShift = 10;
        else if (targetVoice === 'robot') semitoneShift = -2;

        const pitchRatio = Math.pow(2, semitoneShift / 12.0) * customSpeed;
        const renderDuration = decodedData.duration / pitchRatio;

        const offlineCtx = new OfflineAudioContext(
            decodedData.numberOfChannels,
            Math.ceil(renderDuration * decodedData.sampleRate),
            decodedData.sampleRate
        );

        const source = offlineCtx.createBufferSource();
        source.buffer = decodedData;
        source.playbackRate.value = pitchRatio;

        let lastNode = source;

        // 1. AI Noise Cleaner Filters
        if (cleanNoise) {
            const hpFilter = offlineCtx.createBiquadFilter();
            hpFilter.type = "highpass";
            hpFilter.frequency.value = 135;

            const notchFilter = offlineCtx.createBiquadFilter();
            notchFilter.type = "peaking";
            notchFilter.frequency.value = 60;
            notchFilter.gain.value = -24;

            const lpFilter = offlineCtx.createBiquadFilter();
            lpFilter.type = "lowpass";
            lpFilter.frequency.value = 8500;

            const compressor = offlineCtx.createDynamicsCompressor();
            compressor.threshold.value = -22;
            compressor.ratio.value = 6;

            lastNode.connect(hpFilter);
            hpFilter.connect(notchFilter);
            notchFilter.connect(lpFilter);
            lpFilter.connect(compressor);
            lastNode = compressor;
        }

        // 2. Formant Resonator & Vocal Resonance Filter
        if (semitoneShift < -2) {
            const formantFilter = offlineCtx.createBiquadFilter();
            formantFilter.type = "lowshelf";
            formantFilter.frequency.value = 240;
            formantFilter.gain.value = 14;

            const subBass = offlineCtx.createBiquadFilter();
            subBass.type = "peaking";
            subBass.frequency.value = 100;
            subBass.gain.value = 8;

            lastNode.connect(formantFilter);
            formantFilter.connect(subBass);
            lastNode = subBass;

        } else if (semitoneShift > 2) {
            const femaleFormant = offlineCtx.createBiquadFilter();
            femaleFormant.type = "highshelf";
            femaleFormant.frequency.value = 2800;
            femaleFormant.gain.value = 12;

            const presence = offlineCtx.createBiquadFilter();
            presence.type = "peaking";
            presence.frequency.value = 4000;
            presence.gain.value = 6;

            lastNode.connect(femaleFormant);
            femaleFormant.connect(presence);
            lastNode = presence;
        }

        if (targetVoice === 'robot') {
            const bp = offlineCtx.createBiquadFilter();
            bp.type = "bandpass";
            bp.frequency.value = 1500;
            bp.Q.value = 3.5;
            lastNode.connect(bp);
            lastNode = bp;
        }

        lastNode.connect(offlineCtx.destination);
        source.start(0);

        const renderedBuffer = await offlineCtx.startRendering();
        const processedWavBlob = audioBufferToWav(renderedBuffer);
        const processedUrl = URL.createObjectURL(processedWavBlob);

        const vcPlayer = document.getElementById('vcAudioPlayer');
        const vcWrapper = document.getElementById('vcAudioWrapper');
        const vcDlBtn = document.getElementById('vcDownloadBtn');

        if (vcPlayer && vcWrapper) {
            vcPlayer.src = processedUrl;
            vcWrapper.style.display = 'block';
            vcPlayer.play();
        }

        if (vcDlBtn) {
            vcDlBtn.href = processedUrl;
            vcDlBtn.classList.remove('disabled');
        }

        if (recStatus) recStatus.innerText = "✅ AI Voice Morphing & Background Noise Cleared!";
        if (processBtn) processBtn.innerText = "⚡ Process & Transform Voice";

    } catch (err) {
        console.error(err);
        if (recStatus) recStatus.innerText = "❌ Error processing audio. Try again.";
        if (processBtn) processBtn.innerText = "⚡ Process & Transform Voice";
    }
}

// 🔊 ROBUST GENERATE SPEECH WITH 20 DISTINCT VOICE CHARACTER ENGINE
async function generateProTTS() {
    const textInput = document.getElementById('ttsTextInput');
    const text = textInput ? textInput.value.trim() : '';
    if (!text) {
        alert("Please enter text first!");
        return;
    }

    const rate = ((parseFloat(document.getElementById('rateSlider').value) - 1.0) * 100).toFixed(0);
    const pitch = document.getElementById('pitchSlider').value;
    const vol = document.getElementById('volSlider').value;
    const eq = document.getElementById('eqSelect').value;
    
    const rateParam = rate >= 0 ? `+${rate}%` : `${rate}%`;
    const pitchParam = pitch >= 0 ? `+${pitch}Hz` : `${pitch}Hz`;
    const volParam = `+${vol}%`;

    const genBtn = document.getElementById('generateBtn');
    const playerStatus = document.getElementById('playerStatus');
    const progressContainer = document.getElementById('progressContainer');
    const progressBarFill = document.getElementById('progressBarFill');
    const timerLog = document.getElementById('timerLog');

    if (genBtn) genBtn.classList.add('loading');
    if (progressContainer) progressContainer.style.display = 'block';
    if (timerLog) timerLog.style.display = 'flex';
    if (progressBarFill) progressBarFill.style.width = '15%';
    if (playerStatus) playerStatus.innerText = '⏳ Processing HD Speech...';

    const startTime = performance.now();
    let timerInterval = setInterval(() => {
        const elapsedSec = ((performance.now() - startTime) / 1000).toFixed(1);
        if (timerLog) timerLog.innerText = `⏳ Generating HD Audio... ${elapsedSec}s`;
        if (progressBarFill && parseFloat(progressBarFill.style.width) < 85) {
            progressBarFill.style.width = (parseFloat(progressBarFill.style.width) + 4) + '%';
        }
    }, 100);

    let audioSuccess = false;
    let rawArrayBuffer = null;
    let maxRetries = 3;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            if (attempt > 1 && playerStatus) {
                playerStatus.innerText = `⏳ Waking up HD Voice Engine... (Attempt ${attempt}/${maxRetries})`;
            }

            const response = await fetch('/api/generate-tts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    text: text,
                    voice: selectedVoice,
                    pitch: pitchParam,
                    rate: rateParam,
                    volume: volParam
                })
            });

            if (response.ok) {
                rawArrayBuffer = await response.arrayBuffer();
                if (rawArrayBuffer && rawArrayBuffer.byteLength > 100) {
                    audioSuccess = true;
                    break;
                }
            }
        } catch (err) {
            console.log(`Frontend Fetch Attempt ${attempt} failed:`, err);
        }
        await new Promise(r => setTimeout(r, 1000));
    }

    clearInterval(timerInterval);

    if (audioSuccess && rawArrayBuffer) {
        try {
            if (progressBarFill) progressBarFill.style.width = '90%';
            // Apply 20 Unique Voice Model Formant Pitch Transposition!
            const processedWavBlob = await applyVocalEQ(rawArrayBuffer, eq, selectedVoice);
            const audioUrl = URL.createObjectURL(processedWavBlob);
            
            const player = document.getElementById('mainAudioPlayer');
            if (player) {
                player.src = audioUrl;
                player.play();
            }

            const mp3Btn = document.getElementById('downloadMp3Btn');
            if (mp3Btn) {
                mp3Btn.href = audioUrl;
                mp3Btn.download = `mahiti_chakra_${selectedVoice}_${eq}.mp3`;
                mp3Btn.classList.remove('disabled');
            }

            const wavBtn = document.getElementById('downloadWavBtn');
            if (wavBtn) {
                wavBtn.href = audioUrl;
                wavBtn.download = `mahiti_chakra_${selectedVoice}_${eq}_master.wav`;
                wavBtn.classList.remove('disabled');
            }

            const totalDurationSec = ((performance.now() - startTime) / 1000).toFixed(2);
            if (progressBarFill) progressBarFill.style.width = '100%';
            if (timerLog) timerLog.innerText = `⚡ Generated in ${totalDurationSec}s with ${selectedVoice.toUpperCase()} Voice Profile!`;
            if (playerStatus) playerStatus.innerText = `✅ Generated in ${totalDurationSec}s!`;
            if (genBtn) genBtn.classList.remove('loading');

            setTimeout(() => {
                if (progressContainer) progressContainer.style.display = 'none';
            }, 3000);
            return;
        } catch (postErr) {
            console.error("Audio EQ Post-processing Error:", postErr);
        }
    }

    if (playerStatus) playerStatus.innerText = "⚠️ Voice Engine is waking up. Please click Generate again!";
    if (timerLog) timerLog.innerText = "⚠️ Temporary Network Timeout. Please retry.";
    if (genBtn) genBtn.classList.remove('loading');
    if (progressContainer) progressContainer.style.display = 'none';
}
