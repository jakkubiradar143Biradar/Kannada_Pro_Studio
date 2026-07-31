// Mahiti Chakra 20 Pro Voices State
let selectedVoice = 'm1';

// Voice Changer & Recorder State
let mediaRecorder = null;
let audioChunks = [];
let recordedAudioBlob = null;
let isRecording = false;

// Kanglish Transliteration Dictionary
const KANGLISH_DICTIONARY = {
    "namaskara": "ನಮಸ್ಕಾರ",
    "hegidira": "ಹೇಗಿದ್ದೀರಾ",
    "kannada": "ಕನ್ನಡ",
    "dhanyavada": "ಧನ್ಯವಾದ",
    "shubhadina": "ಶುಭದಿನ",
    "chennagidini": "ಚೆನ್ನಾಗಿದ್ದೀನಿ",
    "nanna": "ನನ್ನ",
    "hesaru": "ಹೆಸರು",
    "karnataka": "ಕರ್ನಾಟಕ",
    "sundara": "ಸುಂದರ",
    "oota": "ಊಟ",
    "banni": "ಬನ್ನಿ",
    "illa": "ಇಲ್ಲ",
    "houdu": "ಹೌದು"
};

// 🎯 DEDICATED PRESET TEXTS FOR EACH INTONATION STYLE
const PRESET_TEXTS = {
    'news': 'ರಾಜ್ಯದಾದ್ಯಂತ ಕೃಷಿ ಮತ್ತು ಶೈಕ್ಷಣಿಕ ವಲಯಕ್ಕೆ ಸರ್ಕಾರದ ಕಡೆಯಿಂದ ಭಾರಿ ಅನುದಾನ ಬಿಡುಗಡೆಯಾಗಿದೆ. ಅರ್ಹ ಫಲಾನುಭವಿಗಳು ತಕ್ಷಣವೇ ಆನ್‌ಲೈನ್ ಮೂಲಕ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ ಸೌಲಭ್ಯ ಪಡೆಯಿರಿ.',
    'story': 'ಒಂದಾನೊಂದು ಕಾಲದಲ್ಲಿ ದಟ್ಟವಾದ ಸೌಂದರ್ಯದ ಪ್ರಕೃತಿಯ ಕಾಡಿನಲ್ಲಿ ಒಂದು ಸುಂದರವಾದ ಸರೋವರವಿತ್ತು. ಅಲ್ಲಿ ವಾಸಿಸುತ್ತಿದ್ದ ಪ್ರಾಣಿಗಳು ಪರಸ್ಪರ ಪ್ರೀತಿ ಮತ್ತು ಸೌಹಾರ್ದತೆಯಿಂದ ಜೀವಿಸುತ್ತಿದ್ದವು.',
    'mass': 'ಸಾಮ್ರಾಜ್ಯಕ್ಕೆ ಒಬ್ಬನೇ ಸಿಂಹ! ನನ್ನ ದಾರಿ ಅಡ್ಡ ಬಂದರೆ ಯಾವ ಶಕ್ತಿಯೂ ಉಳಿಲು ಸಾಧ್ಯವಿಲ್ಲ! ಇದು ಕನ್ನಡ ಚಿತ್ರರಂಗದ ಭವ್ಯ ಮಾಸ್ ಪವರ್!',
    'ad': 'ಬೃಹತ್ ಧಮಾಕಾ ಆಫರ್! ನಿಮ್ಮ ನೆಚ್ಚಿನ ಬ್ರಾಂಡೆಡ್ ಬಟ್ಟೆಗಳು ಮತ್ತು ಎಲೆಕ್ಟ್ರಾನಿಕ್ಸ್ ಸಾಮಗ್ರಿಗಳ ಮೇಲೆ ಶೇಕಡಾ 50 ರಷ್ಟು ಭಾರಿ ರಿಯಾಯಿತಿ ಸಿಗುತ್ತಿದೆ! ಇಂದು ಭೇಟಿ ನೀಡಿ!',
    'edu': 'ಆತ್ಮೀಯ ವಿದ್ಯಾರ್ಥಿಗಳೇ, ಇಂದಿನ ತರಗತಿಯಲ್ಲಿ ನಾವು ವಿಜ್ಞಾನ ಮತ್ತು ಗಣಿತದ ಪ್ರಮುಖ ಸೂತ್ರಗಳನ್ನು ಸರಳ ಹಾಗೂ ಆಸಕ್ತಿದಾಯಕವಾಗಿ ಕಲಿಯೋಣ.'
};

// 🎯 SPEECH INTONATION & FLOW STYLE PRESETS ENGINE
function applyFlowPreset(style, element) {
    document.querySelectorAll('.sample-pills-row .pill').forEach(p => p.classList.remove('active'));
    if (element) element.classList.add('active');

    const ttsInput = document.getElementById('ttsTextInput');
    if (ttsInput && PRESET_TEXTS[style]) {
        ttsInput.value = PRESET_TEXTS[style];
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
        ttsInput.focus();
    }
}

// Select Voice Model
function selectVoiceModel(voiceId, element) {
    selectedVoice = voiceId;
    document.querySelectorAll('.voice-models-container .model-card').forEach(c => c.classList.remove('active'));
    if (element) {
        element.classList.add('active');
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

// Kanglish Accordion & Translator
function toggleKanglish() {
    const body = document.getElementById('kangBody');
    if (!body) return;
    if (body.style.display === 'none' || !body.style.display) {
        body.style.display = 'block';
    } else {
        body.style.display = 'none';
    }
}

function convertKanglish(text) {
    const resEl = document.getElementById('kangResult');
    if (!text) {
        if (resEl) resEl.innerText = "Converted Kannada text will appear here...";
        return;
    }
    const words = text.toLowerCase().split(/\s+/);
    const converted = words.map(w => KANGLISH_DICTIONARY[w] || w).join(' ');
    if (resEl) resEl.innerText = converted;
}

function applyKanglish() {
    const resEl = document.getElementById('kangResult');
    const res = resEl ? resEl.innerText : '';
    if (res && res !== "Converted Kannada text will appear here...") {
        const ttsInput = document.getElementById('ttsTextInput');
        if (ttsInput) ttsInput.value = res;
    }
}

// Web Audio API Real-time Vocal EQ Engine
async function applyVocalEQ(audioArrayBuffer, eqType) {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const decodedData = await audioCtx.decodeAudioData(audioArrayBuffer);

    const offlineCtx = new OfflineAudioContext(
        decodedData.numberOfChannels,
        decodedData.length,
        decodedData.sampleRate
    );

    const source = offlineCtx.createBufferSource();
    source.buffer = decodedData;

    let lastNode = source;

    if (eqType === 'bass') {
        const bassFilter = offlineCtx.createBiquadFilter();
        bassFilter.type = "lowshelf";
        bassFilter.frequency.value = 120;
        bassFilter.gain.value = 14;

        const subFilter = offlineCtx.createBiquadFilter();
        subFilter.type = "peaking";
        subFilter.frequency.value = 80;
        subFilter.gain.value = 6;

        lastNode.connect(bassFilter);
        bassFilter.connect(subFilter);
        lastNode = subFilter;

    } else if (eqType === 'radio') {
        const hp = offlineCtx.createBiquadFilter();
        hp.type = "highpass";
        hp.frequency.value = 150;

        const mid = offlineCtx.createBiquadFilter();
        mid.type = "peaking";
        mid.frequency.value = 2500;
        mid.gain.value = 8;

        const comp = offlineCtx.createDynamicsCompressor();
        comp.threshold.value = -20;
        comp.knee.value = 20;
        comp.ratio.value = 8;

        lastNode.connect(hp);
        hp.connect(mid);
        mid.connect(comp);
        lastNode = comp;

    } else if (eqType === 'bright') {
        const hs = offlineCtx.createBiquadFilter();
        hs.type = "highshelf";
        hs.frequency.value = 3500;
        hs.gain.value = 12;

        const hp = offlineCtx.createBiquadFilter();
        hp.type = "highpass";
        hp.frequency.value = 200;

        lastNode.connect(hp);
        hp.connect(hs);
        lastNode = hs;

    } else {
        const comp = offlineCtx.createDynamicsCompressor();
        comp.threshold.value = -24;
        comp.ratio.value = 4;

        const warm = offlineCtx.createBiquadFilter();
        warm.type = "peaking";
        warm.frequency.value = 1800;
        warm.gain.value = 3;

        lastNode.connect(comp);
        comp.connect(warm);
        lastNode = warm;
    }

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
        // Scroll modal to top
        modal.scrollTop = 0;
    }
}

function closeVoiceChangerModal(e) {
    const modal = document.getElementById('voiceChangerModal');
    if (modal) modal.classList.remove('active');
}

// Live Microphone Recording Toggle
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
                recordedAudioBlob = new Blob(audioChunks, { type: 'audio/wav' });
                if (recStatus) recStatus.innerText = "✅ Live Voice Recorded Successfully!";
            };

            mediaRecorder.start();
            isRecording = true;
            if (recText) recText.innerText = "Stop Recording";
            if (recIcon) recIcon.innerText = "⏹️";
            if (recBtn) recBtn.classList.add('recording');
            if (recStatus) recStatus.innerText = "🎙️ Recording live voice... Speak now!";
        } catch (err) {
            console.error("Microphone Access Error:", err);
            alert("Microphone access is required to record voice. Please grant microphone permission.");
        }
    } else {
        if (mediaRecorder && mediaRecorder.state !== 'inactive') {
            mediaRecorder.stop();
            mediaRecorder.stream.getTracks().forEach(track => track.stop());
        }
        isRecording = false;
        if (recText) recText.innerText = "Start Recording";
        if (recIcon) recIcon.innerText = "🎙️";
        if (recBtn) recBtn.classList.remove('recording');
    }
}

// Handle Audio File Upload
function handleAudioUpload(event) {
    const file = event.target.files[0];
    const recStatus = document.getElementById('recStatus');
    if (file) {
        recordedAudioBlob = file;
        if (recStatus) recStatus.innerText = `✅ File Uploaded: ${file.name}`;
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

        // 1. AI Noise Cleaner
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

        // 2. Formant Resonator & Gender Morphing Filter
        if (semitoneShift < -2) {
            // Male Deep Voice Formant Filter
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
            // Female High Voice Formant Filter
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

// Generate Speech Function
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
    if (progressBarFill) progressBarFill.style.width = '10%';
    if (playerStatus) playerStatus.innerText = '⏳ Processing HD Speech...';

    const startTime = performance.now();
    let timerInterval = setInterval(() => {
        const elapsedSec = ((performance.now() - startTime) / 1000).toFixed(1);
        if (timerLog) timerLog.innerText = `⏳ Generating HD Audio... ${elapsedSec}s`;
        if (progressBarFill && parseFloat(progressBarFill.style.width) < 85) {
            progressBarFill.style.width = (parseFloat(progressBarFill.style.width) + 5) + '%';
        }
    }, 100);

    try {
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

        if (!response.ok) throw new Error("Synthesis failed");

        const rawArrayBuffer = await response.arrayBuffer();

        if (progressBarFill) progressBarFill.style.width = '90%';
        const processedWavBlob = await applyVocalEQ(rawArrayBuffer, eq);
        const audioUrl = URL.createObjectURL(processedWavBlob);
        
        const player = document.getElementById('mainAudioPlayer');
        if (player) {
            player.src = audioUrl;
            player.play();
        }

        // Enable All Pro Export Buttons
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

        clearInterval(timerInterval);
        const totalDurationSec = ((performance.now() - startTime) / 1000).toFixed(2);
        
        if (progressBarFill) progressBarFill.style.width = '100%';
        if (timerLog) timerLog.innerText = `⚡ Generated in ${totalDurationSec}s with ${eq.toUpperCase()} EQ!`;
        if (playerStatus) playerStatus.innerText = `✅ Generated in ${totalDurationSec}s!`;
        if (genBtn) genBtn.classList.remove('loading');

        setTimeout(() => {
            if (progressContainer) progressContainer.style.display = 'none';
        }, 3000);

    } catch (err) {
        clearInterval(timerInterval);
        console.error(err);
        if (playerStatus) playerStatus.innerText = "❌ Error Generating Speech";
        if (timerLog) timerLog.innerText = "❌ Generation Failed";
        if (genBtn) genBtn.classList.remove('loading');
        alert("Error generating speech. Please try again.");
    }
}
