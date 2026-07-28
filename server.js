const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const { EdgeTTS } = require('node-edge-tts');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.static(path.join(__dirname)));

const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Extensive Dictionary to convert English Words & Abbreviations into 100% Smooth Kannada Phonetics
const ENGLISH_TO_KANNADA_PHONETICS = {
    "kpsc": "ಕೆ.ಪಿ.ಎಸ್.ಸಿ",
    "ksp": "ಕೆ.ಎಸ್.ಪಿ",
    "kas": "ಕೆ.ಎ.ಎಸ್",
    "ias": "ಐ.ಎ.ಎಸ್",
    "ips": "ಐ.ಪಿ.ಎಸ್",
    "fda": "ಎಫ್.ಡಿ.ಎ",
    "sda": "ಎಸ್.ಡಿ.ಎ",
    "pdf": "ಪಿ.ಡಿ.ಎಫ್",
    "url": "ಯು.ಆರ್.ಎಲ್",
    "ssp": "ಎಸ್.ಎಸ್.ಪಿ",
    "nsp": "ಎನ್.ಎಸ್.ಪಿ",
    "otp": "ಒ.ಟಿ.ಪಿ",
    "atm": "ಎ.ಟಿ.ಎಮ್",
    "pm": "ಪಿ.ಎಮ್",
    "cm": "ಸಿ.ಎಮ್",
    "gps": "ಜಿ.ಪಿ.ಎಸ್",
    "fm": "ಎಫ್.ಎಮ್",
    "ott": "ಒ.ಟಿ.ಟಿ",
    "hd": "ಹೆಚ್.ಡಿ",
    "mp3": "ಎಮ್.ಪಿ.3",
    "ai": "ಎ.ಐ",
    "psi": "ಪಿ.ಎಸ್.ಐ",
    "ssc": "ಎಸ್.ಎಸ್.ಸಿ",
    "rrb": "ಆರ್.ಆರ್.ಬಿ",
    "upsc": "ಯು.ಪಿ.ಎಸ್.ಸಿ",
    "kea": "ಕೆ.ಇ.ಎ",
    "puc": "ಪಿ.ಯು.ಸಿ",
    "sslc": "ಎಸ್.ಎಸ್.ಎಲ್.ಸಿ",
    "pro": "ಪ್ರೋ",
    "text": "ಟೆಕ್ಸ್ಟ್",
    "voice": "ವಾಯ್ಸ್",
    "studio": "ಸ್ಟುಡಿಯೋ",
    "welcome": "ವೆಲ್‌ಕಮ್",
    "news": "ನ್ಯೂಸ್",
    "app": "ಆಪ್",
    "link": "ಲಿಂಕ್",
    "audio": "ಆಡಿಯೋ",
    "video": "ವೀಡಿಯೋ",
    "channel": "ಚಾನೆಲ್",
    "subscribe": "ಸಬ್‌ಸ್ಕ್ರೈಬ್",
    "like": "ಲೈಕ್",
    "share": "ಷೇರ್",
    "comment": "ಕಾಮೆಂಟ್",
    "mobile": "ಮೊಬೈಲ್",
    "computer": "ಕಂಪ್ಯೂಟರ್",
    "online": "ಆನ್‌ಲೈನ್",
    "offline": "ಆಫ್‌ಲೈನ್",
    "website": "ವೆಬ್‌ಸೈಟ್",
    "amazon": "ಅಮೆಜಾನ್",
    "unboxing": "ಅನ್‌ಬಾಕ್ಸಿಂಗ್",
    "review": "ರಿವ್ಯೂ",
    "discount": "ಡಿಸ್ಕೌಂಟ್",
    "offer": "ಆಫರ್",
    "deal": "ಡೀಲ್",
    "price": "ಪ್ರೈಸ್",
    "result": "ಫಲಿತಾಂಶ",
    "police": "ಪೊಲೀಸ್",
    "constable": "ಕಾನ್‌ಸ್ಟೇಬಲ್",
    "scholarship": "ವಿದ್ಯಾರ್ಥಿವೇತನ",
    "whatsapp": "ವಾಟ್ಸಾಪ್",
    "youtube": "ಯೂಟ್ಯೂಬ್",
    "google": "ಗೂಗಲ್",
    "job": "ಜಾಬ್",
    "notification": "ನೋಟಿಫಿಕೇಶನ್",
    "official": "ಅಫಿಷಿಯಲ್",
    "direct": "ಡೈರೆಕ್ಟ್",
    "apply": "ಅಪ್ಲೈ",
    "update": "ಅಪ್‌ಡೇಟ್",
    "download": "ಡೌನ್‌ಲೋಡ್",
    "selection": "ಸಿಲೆಕ್ಷನ್",
    "salary": "ಸ್ಯಾಲರಿ",
    "post": "ಪೋಸ್ಟ್",
    "details": "ಡಿಟೇಲ್ಸ್",
    "information": "ಇನ್ಫರ್ಮೇಷನ್",
    "status": "ಸ್ಟೇಟಸ್",
    "govt": "ಗವರ್ನ್‌ಮೆಂಟ್",
    "government": "ಗವರ್ನ್‌ಮೆಂಟ್",
    "scheme": "ಯೋಜನೆ"
};

const LETTER_MAP = {
    'A': 'ಎ', 'B': 'ಬಿ', 'C': 'ಸಿ', 'D': 'ಡಿ', 'E': 'ಇ', 'F': 'ಎಫ್',
    'G': 'ಜಿ', 'H': 'ಹೆಚ್', 'I': 'ಐ', 'J': 'ಜೆ', 'K': 'ಕೆ', 'L': 'ಎಲ್',
    'M': 'ಎಮ್', 'N': 'ಎನ್', 'O': 'ಓ', 'P': 'ಪಿ', 'Q': 'ಕ್ಯೂ', 'R': 'ಆರ್',
    'S': 'ಎಸ್', 'T': 'ಟಿ', 'U': 'ಯು', 'V': 'ವಿ', 'W': 'ಡಬ್ಲ್ಯೂ', 'X': 'ಎಕ್ಸ್',
    'Y': 'ವೈ', 'Z': 'ಝೆಡ್'
};

function formatHumanFlow(text) {
    let t = text.trim();

    // 🎯 STRIP ALL TEXT INSIDE BRACKETS (...) [...] {...} SO THEY ARE IGNORED IN SPEECH
    t = t.replace(/\(.*?\)/g, '');
    t = t.replace(/\[.*?\]/g, '');
    t = t.replace(/\{.*?\}/g, '');

    Object.keys(ENGLISH_TO_KANNADA_PHONETICS).forEach(engWord => {
        const regex = new RegExp(`\\b${engWord}\\b`, 'gi');
        t = t.replace(regex, ENGLISH_TO_KANNADA_PHONETICS[engWord]);
    });

    t = t.replace(/\b[A-Z]{2,6}\b/g, (match) => {
        return match.split('').map(letter => LETTER_MAP[letter] || letter).join('.');
    });

    t = t.replace(/,\s*/g, ', ');
    t = t.replace(/\.\s*/g, '. ');
    t = t.replace(/\?\s*/g, '? ');
    t = t.replace(/!\s*/g, '! ');
    return t;
}

function getModelPreset(rawVoice) {
    let selectedVoice = 'kn-IN-SapnaNeural';
    let basePitch = 0;

    const maleModels = [
        'kn-IN-GaganNeural', 'mahiti_job', 'mahiti_farmer', 'mahiti_senior', 'mahiti_pension',
        'mobile_gadget', 'headphone_audio', 'car_accessory', 'laptop_pc', 'fitness_health',
        'fm_radio_ad', 'luxury_brand', 'supermarket_discount', 'app_launch', 'cinema_sponsor', 'real_estate',
        'shorts_facts', 'science_trivia', 'stock_money', 'food_vlogger', 'travel_vlogger',
        'gaming_esports', 'mystery_crime', 'sports_match', 'motivation_coach', 'ott_reviewer',
        'prajwal_news', 'political_debate', 'business_reporter', 'crime_bulletin', 'geo_news', 'podcast_interviewer', 'editorial_reader',
        'vikram_deep', 'drama_stage', 'movie_villain', 'retro_hero', 'royal_warrior', 'docu_host', 'award_host', 'wedding_mc', 'standup_comic', 'maharaja_darbar',
        'suhas_teacher', 'corporate_hr', 'doctor_health', 'legal_policy', 'code_instructor', 'cyber_security', 'gps_nav', 'museum_guide',
        'guruji_elder', 'dasara_purana', 'fantasy_story', 'horror_ghost', 'history_epic', 'coastal_folk', 'spiritual_gita', 'kingdom_legend',
        'chintu_boy', 'circus_clown', 'toy_robot', 'wizard_magic', 'teenager_boy', 'puppet_show',
        'announcer_public', 'ksrtc_bus', 'traffic_safety', 'raghu_vintage',
        'mystic_spirit', 'walkie_talkie', 'neumann_mic', 'shopping_mela', 'coffee_chat'
    ];

    if (maleModels.includes(rawVoice)) {
        selectedVoice = 'kn-IN-GaganNeural';
    } else {
        selectedVoice = 'kn-IN-SapnaNeural';
    }

    const pitchMap = {
        'mahiti_job': 3, 'mahiti_scheme': 2, 'mahiti_scholarship': 4, 'mahiti_farmer': -2,
        'mahiti_senior': -4, 'mahiti_pension': -2, 'mahiti_dairy': 2, 'mahiti_women': 3,
        'mahiti_result': 4, 'mahiti_health': 2,
        'amazon_unboxing': 4, 'mobile_gadget': 2, 'home_kitchen': -2, 'fashion_lifestyle': 3,
        'flash_sale': 6, 'headphone_audio': -6, 'car_accessory': -4, 'baby_kids': 8,
        'fitness_health': 4, 'laptop_pc': 0, 'fm_radio_ad': -6, 'luxury_brand': -4,
        'supermarket_discount': 4, 'travel_resort': 2, 'app_launch': 4, 'food_restaurant': 3,
        'bank_festival': -2, 'cinema_sponsor': -8, 'real_estate': -2, 'shopping_mall': 4,
        'shorts_facts': 6, 'science_trivia': 2, 'stock_money': 0, 'food_vlogger': 4,
        'travel_vlogger': 3, 'gaming_esports': 6, 'mystery_crime': -10, 'sports_match': 8,
        'prajwal_news': 3, 'political_debate': -2, 'business_reporter': 0, 'weather_reader': 2,
        'crime_bulletin': -4, 'geo_news': -2, 'podcast_interviewer': 2, 'editorial_reader': -2,
        'kavitha_grandma': -6, 'radhika_audiobook': -2, 'dasara_purana': -8, 'fantasy_story': -4,
        'kids_animal_story': 8, 'horror_ghost': -12, 'history_epic': -6, 'coastal_folk': -4,
        'spiritual_gita': -6, 'kingdom_legend': -8,
        'suhas_teacher': 2, 'corporate_hr': -2, 'aira_ai': 4, 'doctor_health': -2,
        'legal_policy': -4, 'meditation_yoga': -4, 'code_instructor': 0, 'cyber_security': -6,
        'gps_nav': 2, 'museum_guide': -2,
        'vikram_deep': -10, 'drama_stage': -4, 'movie_villain': -12, 'retro_hero': -6,
        'royal_warrior': -8, 'docu_host': -10, 'award_host': -4, 'wedding_mc': 4,
        'standup_comic': 4, 'maharaja_darbar': -10,
        'ananya_kid': 10, 'chintu_boy': 8, 'cartoon_kid': 12, 'circus_clown': 8,
        'toy_robot': 6, 'wizard_magic': -10, 'talking_parrot': 14, 'toddler_baby': 12,
        'teenager_boy': 4, 'puppet_show': 8,
        'announcer_public': 4, 'ksrtc_bus': 2, 'airport_flight': 4, 'traffic_safety': -4,
        'raghu_vintage': -4, 'mystic_spirit': -12, 'walkie_talkie': -6, 'neumann_mic': 0,
        'shopping_mela': 6, 'coffee_chat': 2
    };

    basePitch = pitchMap[rawVoice] || 0;

    return { selectedVoice, basePitch };
}

app.post('/api/generate-tts', async (req, res) => {
    let { text, voice, pitch, rate, volume } = req.body;
    if (!text || !text.trim()) {
        return res.status(400).json({ error: 'Text parameter is required' });
    }

    let rawVoice = voice || 'mahiti_job';
    let { selectedVoice, basePitch } = getModelPreset(rawVoice);

    let userPitchNum = parseInt(pitch) || 0;
    let finalPitchNum = userPitchNum + basePitch;
    let pitchVal = finalPitchNum >= 0 ? `+${finalPitchNum}Hz` : `${finalPitchNum}Hz`;

    let rateVal = rate || '+15%';
    let volumeVal = volume || '+50%';

    const uniqueId = `${Date.now()}_${Math.random().toString(36).substring(7)}`;
    const tempMp3Path = path.join(uploadDir, `speech_${uniqueId}.mp3`);

    let formattedText = formatHumanFlow(text);

    try {
        console.log(`Executing 100-Model Node Edge-TTS (${rawVoice} -> ${selectedVoice}): '${formattedText.substring(0, 60)}...'`);

        const tts = new EdgeTTS({
            voice: selectedVoice,
            lang: 'kn-IN',
            outputFormat: 'audio-24khz-48kbitrate-mono-mp3',
            pitch: pitchVal,
            rate: rateVal,
            volume: volumeVal
        });

        await tts.ttsPromise(formattedText, tempMp3Path);

        if (fs.existsSync(tempMp3Path)) {
            res.set({
                'Content-Type': 'audio/mpeg',
                'Content-Disposition': 'inline; filename="mahiti_chakra_speech.mp3"'
            });

            const stream = fs.createReadStream(tempMp3Path);
            stream.pipe(res);

            res.on('finish', () => {
                fs.unlink(tempMp3Path, () => {});
            });
        } else {
            res.status(500).json({ error: 'Output audio file not generated.' });
        }

    } catch (err) {
        console.error('Node Edge-TTS Synthesis Error:', err);
        res.status(500).json({ error: 'TTS generation failed: ' + err.message });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Kannada Pro AI Voice Studio running on port ${PORT}`);
});
