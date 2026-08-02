const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const https = require('https');
const { EdgeTTS } = require('node-edge-tts');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname));

const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Cleanup old files every 15 mins
setInterval(() => {
    fs.readdir(uploadDir, (err, files) => {
        if (!err && files) {
            const now = Date.now();
            files.forEach(file => {
                const filePath = path.join(uploadDir, file);
                fs.stat(filePath, (err, stat) => {
                    if (!err && now - stat.mtimeMs > 10 * 60 * 1000) {
                        fs.unlink(filePath, () => {});
                    }
                });
            });
        }
    });
}, 15 * 60 * 1000);

// English Acronyms to Kannada Phonetics
const ENGLISH_TO_KANNADA_PHONETICS = {
    "kpsc": "ಕೆ.ಪಿ.ಎಸ್.ಸಿ", "ksp": "ಕೆ.ಎಸ್.ಪಿ", "kas": "ಕೆ.ಎ.ಎಸ್", "ias": "ಐ.ಎ.ಎಸ್",
    "ips": "ಐ.ಪಿ.ಎಸ್", "fda": "ಎಫ್.ಡಿ.ಎ", "sda": "ಎಸ್.ಡಿ.ಎ", "pdf": "ಪಿ.ಡಿ.ಎಫ್",
    "url": "ಯು.ಆರ್.ಎಲ್", "ssp": "ಎಸ್.ಎಸ್.ಪಿ", "nsp": "ಎನ್.ಎಸ್.ಪಿ", "otp": "ಒ.ಟಿ.ಪಿ",
    "atm": "ಎ.ಟಿ.ಎಮ್", "pm": "ಪಿ.ಎಮ್", "cm": "ಸಿ.ಎಮ್", "gps": "ಜಿ.ಪಿ.ಎಸ್",
    "fm": "ಎಫ್.ಎಮ್", "ott": "ಒ.ಟಿ.ಟಿ", "hd": "ಹೆಚ್.ಡಿ", "mp3": "ಎಮ್.ಪಿ.3",
    "ai": "ಎ.ಐ", "psi": "ಪಿ.ಎಸ್.ಐ", "ssc": "ಎಸ್.ಎಸ್.ಸಿ"
};

function formatHumanFlow(rawText) {
    if (!rawText) return "";
    let cleaned = rawText
        .replace(/\([^)]*\)/g, '')
        .replace(/\[[^\]]*\]/g, '')
        .replace(/\{[^}]*\}/g, '');

    for (const [eng, kan] of Object.entries(ENGLISH_TO_KANNADA_PHONETICS)) {
        const regex = new RegExp(`\\b${eng}\\b`, 'gi');
        cleaned = cleaned.replace(regex, kan);
    }
    return cleaned.replace(/\s+/g, ' ').trim();
}

// 20 Distinct Voice Profiles with Neural Pitch & Speed Preset Tuning
const VOICE_PRESETS = {
    // 10 Male Voice Profiles
    'm1':  { voice: 'kn-IN-GaganNeural', pitch: '+0Hz',  rate: '+5%',  volume: '+50%' }, // Gagan Anchor
    'm2':  { voice: 'kn-IN-GaganNeural', pitch: '-5Hz',  rate: '+15%', volume: '+60%' }, // Rajesh RJ
    'm3':  { voice: 'kn-IN-GaganNeural', pitch: '-2Hz',  rate: '+10%', volume: '+50%' }, // Vikram News
    'm4':  { voice: 'kn-IN-GaganNeural', pitch: '-8Hz',  rate: '+20%', volume: '+70%' }, // Dev Mass (Hero)
    'm5':  { voice: 'kn-IN-GaganNeural', pitch: '-1Hz',  rate: '+25%', volume: '+60%' }, // Arjun Sports
    'm6':  { voice: 'kn-IN-GaganNeural', pitch: '+2Hz',  rate: '+12%', volume: '+50%' }, // Surya Tech
    'm7':  { voice: 'kn-IN-GaganNeural', pitch: '-4Hz',  rate: '-8%',  volume: '+50%' }, // Guru Bhakti
    'm8':  { voice: 'kn-IN-GaganNeural', pitch: '-3Hz',  rate: '-5%',  volume: '+45%' }, // Chetan Story
    'm9':  { voice: 'kn-IN-GaganNeural', pitch: '-3Hz',  rate: '+22%', volume: '+65%' }, // Kiran Ad
    'm10': { voice: 'kn-IN-GaganNeural', pitch: '-10Hz', rate: '+18%', volume: '+75%' }, // Dhananjaya Pro

    // 10 Female Voice Profiles
    'f1':  { voice: 'kn-IN-SapnaNeural', pitch: '+0Hz',  rate: '+5%',  volume: '+50%' }, // Sapna Pro
    'f2':  { voice: 'kn-IN-SapnaNeural', pitch: '+4Hz',  rate: '+18%', volume: '+55%' }, // Rashmi RJ
    'f3':  { voice: 'kn-IN-SapnaNeural', pitch: '+2Hz',  rate: '+12%', volume: '+50%' }, // Priya News
    'f4':  { voice: 'kn-IN-SapnaNeural', pitch: '+6Hz',  rate: '+22%', volume: '+65%' }, // Pooja Fashion
    'f5':  { voice: 'kn-IN-SapnaNeural', pitch: '-1Hz',  rate: '-6%',  volume: '+45%' }, // Ananya Story
    'f6':  { voice: 'kn-IN-SapnaNeural', pitch: '+5Hz',  rate: '+20%', volume: '+60%' }, // Kavya Ad
    'f7':  { voice: 'kn-IN-SapnaNeural', pitch: '+3Hz',  rate: '+15%', volume: '+50%' }, // Sneha FM
    'f8':  { voice: 'kn-IN-SapnaNeural', pitch: '+1Hz',  rate: '+5%',  volume: '+50%' }, // Shreya Edu
    'f9':  { voice: 'kn-IN-SapnaNeural', pitch: '-2Hz',  rate: '-10%', volume: '+40%' }, // Maulya Shanta
    'f10': { voice: 'kn-IN-SapnaNeural', pitch: '+7Hz',  rate: '+15%', volume: '+60%' }  // Spandana Pro
};

// Health Check
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'ok', uptime: process.uptime(), time: new Date().toISOString() });
});

// Google TTS Chunk Fetcher
function fetchGoogleTTSChunk(chunkText) {
    return new Promise((resolve, reject) => {
        const encoded = encodeURIComponent(chunkText);
        const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encoded}&tl=kn&client=tw-ob`;
        
        const req = https.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
        }, (res) => {
            if (res.statusCode !== 200) {
                return reject(new Error(`Google TTS HTTP ${res.statusCode}`));
            }
            const data = [];
            res.on('data', (c) => data.push(c));
            res.on('end', () => resolve(Buffer.concat(data)));
        });
        req.on('error', (err) => reject(err));
        req.setTimeout(3500, () => {
            req.destroy();
            reject(new Error('Google TTS HTTP Timeout'));
        });
    });
}

async function generateGoogleTTS(text) {
    const chunks = text.match(/.{1,140}(\s|$)|.{1,140}/g) || [text];
    const audioBuffers = [];
    for (const c of chunks) {
        if (c.trim()) {
            const buf = await fetchGoogleTTSChunk(c.trim());
            audioBuffers.push(buf);
        }
    }
    if (audioBuffers.length > 0) {
        return Buffer.concat(audioBuffers);
    }
    throw new Error('Google TTS produced no audio');
}

app.post('/api/generate-tts', async (req, res) => {
    try {
        let { text, voice, pitch, rate, volume } = req.body;
        if (!text || !text.trim()) {
            return res.status(400).json({ error: 'Text parameter is required' });
        }

        let rawVoice = voice || 'm1';
        let preset = VOICE_PRESETS[rawVoice] || VOICE_PRESETS['m1'];
        let selectedVoice = preset.voice;

        // Calculate combined pitch & rate from user sliders + voice profile presets
        let userPitchNum = parseInt(pitch) || 0;
        let basePitchNum = parseInt(preset.pitch) || 0;
        let finalPitchNum = userPitchNum + basePitchNum;
        let pitchVal = finalPitchNum >= 0 ? `+${finalPitchNum}Hz` : `${finalPitchNum}Hz`;

        let userRateNum = parseInt(rate) || 0;
        let baseRateNum = parseInt(preset.rate) || 0;
        let finalRateNum = userRateNum + baseRateNum;
        let rateVal = finalRateNum >= 0 ? `+${finalRateNum}%` : `${finalRateNum}%`;

        let volumeVal = volume || preset.volume || '+50%';

        let formattedText = formatHumanFlow(text);
        if (!formattedText) {
            return res.status(400).json({ error: 'Valid text is required after formatting.' });
        }

        const uniqueId = `${Date.now()}_${Math.random().toString(36).substring(7)}`;
        const tempMp3Path = path.join(uploadDir, `speech_${uniqueId}.mp3`);

        let finalAudioBuffer = null;

        // 1. Primary Attempt: EdgeTTS with Neural SSML Prosody Pitch/Rate Shifting
        try {
            const edgePromise = new Promise(async (resolve, reject) => {
                try {
                    const tts = new EdgeTTS({
                        voice: selectedVoice,
                        lang: 'kn-IN',
                        outputFormat: 'audio-24khz-48kbitrate-mono-mp3',
                        pitch: pitchVal,
                        rate: rateVal,
                        volume: volumeVal
                    });
                    await tts.ttsPromise(formattedText, tempMp3Path);
                    if (fs.existsSync(tempMp3Path) && fs.statSync(tempMp3Path).size > 0) {
                        resolve(fs.readFileSync(tempMp3Path));
                    } else {
                        reject(new Error('EdgeTTS empty file'));
                    }
                } catch (e) {
                    reject(e);
                }
            });

            const timeoutPromise = new Promise((_, reject) =>
                setTimeout(() => reject(new Error('EdgeTTS 4s Timeout')), 4000)
            );

            finalAudioBuffer = await Promise.race([edgePromise, timeoutPromise]);
            console.log(`⚡ Primary EdgeTTS Succeeded for voice ${rawVoice} (${selectedVoice}, pitch=${pitchVal}, rate=${rateVal})`);

        } catch (edgeErr) {
            console.log(`⚠️ Primary EdgeTTS failed for ${rawVoice}. Activating Instant Google HD Engine:`, edgeErr.message);
        }

        // 2. Backup Engine: Instant Google HD Engine
        if (!finalAudioBuffer) {
            try {
                finalAudioBuffer = await generateGoogleTTS(formattedText);
                console.log("⚡ Instant Google HD Engine Fallback Succeeded!");
            } catch (gErr) {
                console.error("❌ Both EdgeTTS and Google TTS failed:", gErr);
            }
        }

        if (finalAudioBuffer && finalAudioBuffer.length > 0) {
            res.set({
                'Content-Type': 'audio/mpeg',
                'Content-Disposition': 'inline; filename="mahiti_chakra_speech.mp3"'
            });
            res.send(finalAudioBuffer);

            if (fs.existsSync(tempMp3Path)) {
                fs.unlink(tempMp3Path, () => {});
            }
        } else {
            res.status(500).json({ error: 'Audio generation failed on all engines.' });
        }

    } catch (err) {
        console.error('TTS Generation Error:', err);
        res.status(500).json({ error: 'Error generating speech: ' + (err.message || err) });
    }
});

app.use('/uploads', express.static(uploadDir));

app.listen(PORT, () => {
    console.log(`🚀 Mahiti Chakra Voice Studio running on port ${PORT}`);
});
