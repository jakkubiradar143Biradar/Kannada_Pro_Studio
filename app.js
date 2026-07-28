// Mahiti Chakra & 100 Pro Voice Models State
let selectedVoice = 'mahiti_job';

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

// 100 DEDICATED CUSTOM SAMPLE DIALOGUES FOR ALL 100 MODELS
const MODEL_DIALOGUES = {
    'mahiti_job': 'ಕೇಂದ್ರ ಹಾಗೂ ರಾಜ್ಯ ಸರ್ಕಾರದ ನೂತನ ಸರ್ಕಾರಿ ಉದ್ಯೋಗ ಮಾಹಿತಿ : ಉದ್ಯೋಗ ಆಕಾಂಕ್ಷಿಗಳಿಗೆ ಸುವರ್ಣ ಅವಕಾಶ! ಪೋಲೀಸ್, ಕೆ ಪಿ ಎ ಸ್ಸಿ ಬ್ಯಾಂಕಿಂಗ್, ರೈಲ್ವೇಸ್ ಹಾಗೂ ರಾಜ್ಯದ ವಿವಿಧ ಇಲಾಖೆಗಳ ಖಾಲಿ ಹುದ್ದೆಗಳ ಸಂಪೂರ್ಣ ವಿವರಗಳು, ಶೈಕ್ಷಣಿಕ ಅರ್ಹತೆ ಮತ್ತು ಅರ್ಜಿ ಸಲ್ಲಿಸುವ ಉಚಿತ ಡೈರೆಕ್ಟ್ ಲಿಂಕ್ ಪಡೆಯಲು ಈಗಲೇ ನಮ್ಮ "ಮಾಹಿತಿ ಚಕ್ರ" ಡಾಟ್ ಇನ್ (mahitichakra.in) ವೆಬ್ಸೈಟ್ಗೆ ಭೇಟಿ ನೀಡಿ!',
    'mahiti_scheme': "ಕರ್ನಾಟಕ ಸರ್ಕಾರದ ಉಚಿತ ಯೋಜನೆಗಳು 2026: ಉದ್ಯೋಗ ಮತ್ತು ಕೃಷಿ ವಲಯಕ್ಕೆ ಹೊಸ ಅನುದಾನ ಬಿಡುಗಡೆಯಾಗಿದೆ. ಅರ್ಹ ಫಲಾನುಭವಿಗಳು ತಕ್ಷಣವೇ ಆನ್‌ಲೈನ್ ಮೂಲಕ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ.",
    'mahiti_scholarship': "ವಿದ್ಯಾರ್ಥಿವೇತನ 2026: ಮೆಟ್ರಿಕ್ ನಂತರದ ಎಲ್ಲಾ ಅರ್ಹ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ರಾಜ್ಯ ಸರ್ಕಾರದ ಕಡೆಯಿಂದ ಉಚಿತ ಶೈಕ್ಷಣಿಕ ಧನಸಹಾಯ ಲಭ್ಯವಿದೆ.",
    'mahiti_farmer': "ರೈತರ ಬೆಳೆ ವಿಮೆ ಮತ್ತು ಪಿಎಂ ಕಿಸಾನ್ ಯೋಜನೆ 2026: ಬೆಳೆ ಹಾನಿ ಪರಿಹಾರ ಹಣ ನೇರವಾಗಿ ರೈತರ ಬ್ಯಾಂಕ್ ಖಾತೆಗೆ ಜಮಾ ಆಗಿದೆ. ಸ್ಟೇಟಸ್ ಚೆಕ್ ಮಾಡುವ ವಿಧಾನ ಇಲ್ಲಿದೆ.",
    'mahiti_senior': "ಹಿರಿಯ ನಾಗರಿಕರ ಮಾಸಿಕ ಪಿಂಚಣಿ ಯೋಜನೆ: 60 ವರ್ಷ ಮೇಲ್ಪಟ್ಟ ಎಲ್ಲಾ ಹಿರಿಯ ನಾಗರಿಕರಿಗೆ ಪ್ರತಿ ತಿಂಗಳು ಉಚಿತ ಗೌರವ ಧನ ಸಿಗಲಿದೆ.",
    'mahiti_pension': "ಅಂಗವಿಕಲರ ವೇತನ ಯೋಜನೆ 2026: ಮಾಸಿಕ ಪಿಂಚಣಿ ಹಣವನ್ನು 2000 ರೂಪಾಯಿಗೆ ಏರಿಕೆ ಮಾಡಲಾಗಿದೆ. ಸ್ಟೇಟಸ್ ಚೆಕ್ ಮಾಡುವ ವಿಧಾನ ಇಲ್ಲಿದೆ.",
    'mahiti_dairy': "ಮಹಿಳೆಯರಿಗಾಗಿ ಹೈನುಗಾರಿಕೆ ಯೋಜನೆ 2026: ಹಸು ಮತ್ತು ಕುರಿ ಸಾಕಾಣಿಕೆಗೆ ಶೇಕಡಾ 75 ರಷ್ಟು ಉಚಿತ ಸಬ್ಸಿಡಿ ಸಿಗಲಿದೆ. ಅರ್ಜಿ ಸಲ್ಲಿಸುವ ವಿಧಾನ ಇಲ್ಲಿದೆ.",
    'mahiti_women': "ಮಹಿಳಾ ಸಮೃದ್ಧಿ ಮತ್ತು ಗೃಹಲಕ್ಷ್ಮಿ ಯೋಜನೆ 2026: ರಾಜ್ಯದ ಎಲ್ಲಾ ಅರ್ಹ ಮಹಿಳೆಯರಿಗೆ ಉಚಿತ ಸ್ವಯಂ ಉದ್ಯೋಗ ಸಾಲ ಸೌಲಭ್ಯ ಲಭ್ಯವಿದೆ.",
    'mahiti_result': "ಪರೀಕ್ಷಾ ಫಲಿತಾಂಶ ಲೈವ್ 2026: ಪೋಲೀಸ್ ಕಾನ್‌ಸ್ಟೇಬಲ್ ಮತ್ತು KPSC ಪರೀಕ್ಷೆಯ ಮೆರಿಟ್ ಲಿಸ್ಟ್ ಬಿಡುಗಡೆಯಾಗಿದೆ. ನಿಮ್ಮ ಫಲಿತಾಂಶ ತಕ್ಷಣ ಚೆಕ್ ಮಾಡಿ.",
    'mahiti_health': "ಆಯುಷ್ಮಾನ್ ಆರೋಗ್ಯ ಸಂಜೀವಿನಿ ಯೋಜನೆ: ರಾಜ್ಯದ ಪ್ರತಿಯೊಂದು ಕುಟುಂಬಕ್ಕೂ 5 ಲಕ್ಷ ರೂಪಾಯಿಯ ಉಚಿತ ವೈದ್ಯಕೀಯ ಚಿಕಿತ್ಸೆ ಸೌಲಭ್ಯ ಸಿಗಲಿದೆ.",
    'amazon_unboxing': "ಅಮೆಜಾನ್ ಗ್ರೇಟ್ ಇಂಡಿಯನ್ ಫೆಸ್ಟಿವಲ್ ಸೇಲ್‌ನಲ್ಲಿ ಹೊಸ ಬ್ರಾಂಡೆಡ್ ಸ್ಮಾರ್ಟ್‌ಫೋನ್ ಮತ್ತು ಗ್ಯಾಜೆಟ್‌ಗಳ ಮೇಲೆ ಶೇಕಡಾ 50 ರಷ್ಟು ಭಾರಿ ಆಫರ್ ನೀಡಲಾಗಿದೆ. ಲಿಂಕ್ ಮೇಲೆ ಕ್ಲಿಕ್ ಮಾಡಿ ಈಗಲೇ ಆರ್ಡರ್ ಮಾಡಿ!",
    'mobile_gadget': "ಇಂದಿನ ಅತ್ಯುತ್ತಮ ಸ್ಮಾರ್ಟ್‌ಫೋನ್ ಗ್ಯಾಜೆಟ್ ರಿವ್ಯೂ: 108 ಮೆಗಾಪಿಕ್ಸೆಲ್ ಕ್ಯಾಮೆರಾ ಮತ್ತು ಸೂಪರ್ ಫಾಸ್ಟ್ ಪ್ರೊಸೆಸರ್ ಹೊಂದಿರುವ ಈ ಫೋನ್ ಬೆಲೆ ಕೇವಲ 15,000 ರೂಪಾಯಿ!",
    'home_kitchen': "ಅಮೆಜಾನ್ ಗೃಹೋಪಯೋಗಿ ವಸ್ತುಗಳ ಆಫರ್: ನಿಮ್ಮ ಅಡುಗೆ ಮನೆಗೆ ಬೇಕಾದ ಮಿಕ್ಸರ್, ಓವನ್ ಮತ್ತು ಸ್ಮಾರ್ಟ್ ಸಾಮಗ್ರಿಗಳ ಮೇಲೆ ಭಾರಿ ರಿಯಾಯಿತಿ ಸಿಗುತ್ತಿದೆ.",
    'fashion_lifestyle': "ಟ್ರೆಂಡಿ ಫ್ಯಾಷನ್ ಮತ್ತು ಬ್ಯೂಟಿ ಪ್ರಾಡಕ್ಟ್‌ಗಳ ಗ್ರ್ಯಾಂಡ್ ಸೇಲ್! ಬ್ರಾಂಡೆಡ್ ಉಡುಪುಗಳು ಮತ್ತು ಕಾಸ್ಮೆಟಿಕ್ಸ್ ಮೇಲೆ ಅತ್ಯುತ್ತಮ ಡಿಸ್ಕೌಂಟ್ ಆಫರ್ ಲಭ್ಯವಿದೆ.",
    'flash_sale': "ಫ್ಲ್ಯಾಶ್ ಸೇಲ್ ಅಲರ್ಟ್! ಮುಂದಿನ 2 ಗಂಟೆಗಳಲ್ಲಿ ಕೇವಲ ಅರ್ಧ ಬೆಲೆಗೆ ಲಭ್ಯವಿರುವ ಪ್ರಮುಖ ಅಮೆಜಾನ್ ಡೀಲ್ಸ್‌ಗಳು ಇಲ್ಲಿದೆ. ತಕ್ಷಣವೇ ಬೈ ಮಾಡಿ!",
    'headphone_audio': "ಹೆವಿ ಬೇಸ್ ಸೌಂಡ್ ಹೆಡ್‌ಫೋನ್ ಮತ್ತು ಬ್ಲೂಟೂತ್ ಸ್ಪೀಕರ್‌ಗಳ ಮೇಲೆ ಬಿಗ್ ಡಿಸ್ಕೌಂಟ್! ಸ್ಪಷ್ಟ ಆಡಿಯೋ ಅನುಭವಕ್ಕಾಗಿ ಈಗಲೇ ಚೆಕ್ ಮಾಡಿ.",
    'car_accessory': "ನಿಮ್ಮ ಕಾರು ಮತ್ತು ಬೈಕ್‌ಗೆ ಬೇಕಾದ ಆಧುನಿಕ ಗ್ಯಾಜೆಟ್‌ಗಳು ಮತ್ತು ಸೇಫ್ಟಿ ಆಕ್ಸೆಸರೀಸ್‌ಗಳ ಮೇಲೆ ಶೇಕಡಾ 40 ರಷ್ಟು ಆಫರ್ ಲಭ್ಯವಿದೆ.",
    'baby_kids': "ಮಕ್ಕಳ ಆಟಿಕೆಗಳು ಮತ್ತು ಬೇಬಿ ಕೇರ್ ಪ್ರಾಡಕ್ಟ್‌ಗಳ ಮೇಲೆ ಪ್ರತ್ಯೇಕ ರಿಯಾಯಿತಿ! ಮೃದುವಾದ ಹಾಗೂ ಸುರಕ್ಷಿತ ವಸ್ತುಗಳನ್ನು ಉಚಿತ ಡೆಲಿವರಿಯಲ್ಲಿ ಪಡೆಯಿರಿ.",
    'fitness_health': "ಫಿಟ್‌ನೆಸ್ ಮತ್ತು ಜಿಮ್ ಸಾಮಗ್ರಿಗಳ ಬಿಗ್ ಸೇಲ್! ಪ್ರೋಟೀನ್ ಡ್ರೈವ್ಸ್, ಡಂಬಲ್ಸ್ ಮತ್ತು ಸ್ಮಾರ್ಟ್ ವಾಚ್‌ಗಳ ಮೇಲೆ ಭಾರಿ ರಿಯಾಯಿತಿ ಪಡೆಯಿರಿ.",
    'laptop_pc': "ಗೇಮಿಂಗ್ ಲ್ಯಾಪ್‌ಟಾಪ್ ಮತ್ತು ಪಿಸಿ ಕಾಂಪೊನೆಂಟ್‌ಗಳ ಸೂಪರ್ ಡೀಲ್! ಹೈ-ಸ್ಪೀಡ್ ಗ್ರಾಫಿಕ್ಸ್ ಕಾರ್ಡ್ ಮತ್ತು ಪ್ರೊಸೆಸರ್ ಲ್ಯಾಪ್‌ಟಾಪ್‌ಗಳು ಭಾರಿ ಆಫರ್‌ನಲ್ಲಿ ಲಭ್ಯ.",
    'fm_radio_ad': "ಧಮಾಕಾ ಆಫರ್! ನಿಮ್ಮ ನೆಚ್ಚಿನ ಬ್ರಾಂಡೆಡ್ ಬಟ್ಟೆಗಳು ಮತ್ತು ಎಲೆಕ್ಟ್ರಾನಿಕ್ಸ್ ಮೇಲೆ ಶೇಕಡಾ 60 ರಷ್ಟು ಧಮಾಕಾ ರಿಯಾಯಿತಿ! ಇಂದು ಭೇಟಿ ನೀಡಿ!",
    'luxury_brand': "ಪ್ರೀಮಿಯಂ ರಾಯಲ್ ವಾಚ್‌ಗಳು ಮತ್ತು ಲಕ್ಸುರಿ ಪ್ರಾಡಕ್ಟ್‌ಗಳ ವಿಶೇಷ ಸಂಗ್ರಹ! ರಾಜಪ್ರಭುತ್ವದ ಶೈಲಿಯ ಸೌಂದರ್ಯ ನಿಮ್ಮದಾಗಿಸಿಕೊಳ್ಳಿ.",
    'supermarket_discount': "ಸೂಪರ್‌ಮಾರ್ಕೆಟ್ ಬೃಹತ್ ಧಾನ್ಯ ಮೇಳ! ದಿನಸಿ ಸಾಮಗ್ರಿಗಳು ಮತ್ತು ಹಣ್ಣು ತರಕಾರಿಗಳ ಮೇಲೆ ಪ್ರತಿಯೊಂದು ಖರೀದಿಗೆ ಉಚಿತ ಗಿಫ್ಟ್ ಪಡೆಯಿರಿ!",
    'travel_resort': "ಸುಂದರ ಪ್ರಕೃತಿಯ ಮಧ್ಯದಲ್ಲಿ ಪರ್ಫೆಕ್ಟ್ ರೆಸಾರ್ಟ್ ವೆಕೇಶನ್! ಈ ವಾರಾಂತ್ಯದಲ್ಲಿ ವಿಶೇಷ ಫ್ಯಾಮಿಲಿ ಪ್ಯಾಕೇಜ್ ಮುಂಗಡ ಬುಕ್ ಮಾಡಿ.",
    'app_launch': "ಹೊಸ ನೂತನ ಮೊಬೈಲ್ ಆಪ್ ಬಿಡುಗಡೆಯಾಗಿದೆ! 1-ಕ್ಲಿಕ್‌ನಲ್ಲಿ ಎಲ್ಲಾ ಸೇವೆಗಳನ್ನು ಪಡೆಯಲು ಈಗಲೇ ಪ್ಲೇಸ್ಟೋರ್‌ನಿಂದ ಉಚಿತವಾಗಿ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ.",
    'food_restaurant': "ರುಚಿಕರವಾದ ಮಲ್ಟಿ-ಕ್ಯುಸಿನ್ ಆಹಾರಗಳ ಸಂಭ್ರಮ! ನಿಮ್ಮ ನೆಚ್ಚಿನ ಖಾದ್ಯಗಳನ್ನು ಆರ್ಡರ್ ಮಾಡಿ ಮತ್ತು ಶೇಕಡಾ 30 ರಷ್ಟು ರಿಯಾಯಿತಿ ಪಡೆಯಿರಿ.",
    'bank_festival': "ಹಬ್ಬದ ಶುಭ ಸಮಾರಂಭಕ್ಕೆ ಉಚಿತ ಗೋಲ್ಡ್ ಲೋನ್ ಮತ್ತು ಗೃಹ ಸಾಲ ಸೌಲಭ್ಯ! ಕಡಿಮೆ ಬಡ್ಡಿದರದಲ್ಲಿ ತಕ್ಷಣವೇ ಸಾಲ ಮಂಜೂರು ಮಾಡಿ.",
    'cinema_sponsor': "ಬಿಗ್ ಸ್ಕ್ರೀನ್ ಚಲನಚಿತ್ರ ರಸಸಂಜೆಯ ಪ್ರಾಯೋಜಕತ್ವ! ಚಿತ್ರಮಂದಿರಗಳಲ್ಲಿ ನಿಮ್ಮ ಬ್ರಾಂಡ್ ಪ್ರಚಾರ ಮಾಡಲು ಸಂಪರ್ಕಿಸಿ.",
    'real_estate': "ಬೆಂಗಳೂರಿನ ಪ್ರಮುಖ ರಸ್ತೆಯಲ್ಲಿ ಸುಂದರವಾದ ಅಪಾರ್ಟ್‌ಮೆಂಟ್ ಮತ್ತು ಸೈಟ್‌ಗಳು ಮಾರಾಟಕ್ಕಿವೆ! ತಕ್ಷಣವೇ ಭೇಟಿ ನೀಡಿ ಕನಸಿನ ಮನೆ ನಿಮ್ಮದಾಗಿಸಿ.",
    'shopping_mall': "ಮೆಗಾ ಶೋಪಿಂಗ್ ಮೇಳಾರಂಭ! ಪ್ರತಿಯೊಂದು 2000 ರೂಪಾಯಿ ಖರೀದಿಗೆ 500 ರೂಪಾಯಿಯ ಕೂಪನ್ ಉಚಿತವಾಗಿ ಪಡೆಯಿರಿ!",
    'shorts_facts': "ನಿಮಗೆ ಗೊತ್ತೇ? ಪ್ರಪಂಚದ ಈ 5 ರಹಸ್ಯ ವಿಚಾರಗಳು ನಿಮ್ಮನ್ನು ಆಶ್ಚರ್ಯಗೊಳಿಸುತ್ತವೆ! ವೀಡಿಯೋ ಕೊನೆವರೆಗೂ ನೋಡಿ ಮತ್ತು ಸಬ್‌ಸ್ಕ್ರೈಬ್ ಮಾಡಿ!",
    'science_trivia': "ವಿಜ್ಞಾನದ ಅದ್ಭುತ ರಹಸ್ಯ: ಬಾಹ್ಯಾಕಾಶದಲ್ಲಿ ಗುರುತ್ವಾಕರ್ಷಣೆ ಇಲ್ಲದೆ ಮನುಷ್ಯನ ದೇಹದಲ್ಲಿ ಏನೆಲ್ಲಾ ಬದಲಾವಣೆ ಆಗುತ್ತದೆ ಗೊತ್ತಾ?",
    'stock_money': "ಷೇರು ಮಾರುಕಟ್ಟೆಯಲ್ಲಿ ಹಣ ಹೂಡಿಕೆ ಮಾಡಲು 3 ಸುವರ್ಣ ನಿಯಮಗಳು: ಕಡಿಮೆ ಅಪಾಯದಲ್ಲಿ ಹೆಚ್ಚು ಲಾಭ ಪಡೆಯುವ ರಹಸ್ಯ ಇಲ್ಲಿದೆ!",
    'food_vlogger': "ಇವತ್ತು ನಾವು ಬೆಂಗಳೂರಿನ ಫೇಮಸ್ ಸ್ಟ್ರೀಟ್ ಫುಡ್ ಟೇಸ್ಟ್ ಮಾಡ್ತಾ ಇದ್ದೀವಿ! ಈ ಬಿಸಿ ಬಿಸಿ ಮಸಾಲೆ ದೋಸೆ ರುಚಿ ನಿಜಕ್ಕೂ ಸೂಪರ್!",
    'travel_vlogger': "ನೋಡಿ ಸ್ನೇಹಿತರೆ! ಹಿಮಾಲಯದ ಈ ಸುಂದರವಾದ ಕಣಿವೆಯ ಸೌಂದರ್ಯ ಎಷ್ಟು ಅದ್ಭುತವಾಗಿದೆ! ಪ್ರಕೃತಿಯ ಮಡಿಲಲ್ಲಿ ಪ್ರವಾಸದ ಮಜಾ ಬೇರೆನೇ!",
    'gaming_esports': "ಏನು ಕ್ಲಚ್ ಗೇಮ್ ಪ್ಲೇ ಗುರು! ಕೊನೆಯ ಸೆಕೆಂಡ್‌ನಲ್ಲಿ ಸೌಂಡ್ ಗೇಮಿಂಗ್ ಹೆಡ್‌ಶಾಟ್ ಹೊಡೆದು ಪಂದ್ಯವನ್ನು ಗೆದ್ದು ತೋರಿಸಿದ್ದಾರೆ!",
    'mystery_crime': "1995 ರಲ್ಲಿ ನಡೆದ ಆ ರಹಸ್ಯ ಘಟನೆ ಇಂದಿಗೂ ಯಾರಿಗೂ ಬಿಡಿಸಲು ಸಾಧ್ಯವಾಗಿಲ್ಲ! ಆ ರಾತ್ರಿ ನಿಜಕ್ಕೂ ಏನಾಯಿತು ಗೊತ್ತಾ?",
    'sports_match': "ಅದ್ಭುತವಾದ ಸಿಕ್ಸರ್! ಪಂದ್ಯದ ಕೊನೆಯ ಎಸೆತದಲ್ಲಿ ಭಾರಿ ಸಿಕ್ಸರ್ ಬಾರಿಸುವ ಮೂಲಕ ತಂಡಕ್ಕೆ ಭವ್ಯ ಜಯ ತಂದುಕೊಟ್ಟಿದ್ದಾರೆ!",
    'motivation_coach': "ನಿಮ್ಮ ಸೋಲು ನಿಮ್ಮ ಅಂತ್ಯವಲ್ಲ, ಅದು ನಿಮ್ಮ ಗೆಲುವಿನ ಮೊದಲ ಹೆಜ್ಜೆ! ಎದ್ದು ನಿಲ್ಲಿ, ಶ್ರಮಿಸಿ, ಸಾಧಿಸಿ ತೋರಿಸಿ!",
    'ott_reviewer': "ಈ ವಾರ ಒಟಿಟಿಯಲ್ಲಿ ಬಿಡುಗಡೆಯಾಗಿರುವ ನೂತನ ಥ್ರಿಲ್ಲರ್ ಚಲನಚಿತ್ರದ ಸಂಪೂರ್ಣ ರಿವ್ಯೂ: ನೋಡಲೇಬೇಕಾದ ಮಾಸ್ ಚಿತ್ರ!",
    'kn-IN-SapnaNeural': "ನಮಸ್ಕಾರ, ಇದು ಇಂದಿನ ಪ್ರಮುಖ ಸುದ್ದಿ ಮುಖ್ಯಾಂಶಗಳು: ರಾಜ್ಯದಾದ್ಯಂತ ಕೃಷಿ ಮತ್ತು ಶೈಕ್ಷಣಿಕ ವಲಯಕ್ಕೆ ಹೊಸ ಅನುದಾನ ಬಿಡುಗಡೆಯಾಗಿದೆ.",
    'kn-IN-GaganNeural': "ಶುಭ ಸಂಜೆ, ಇಂದಿನ ಪ್ರೈಮ್ ಟೈಮ್ ನ್ಯೂಸ್ ಬುಲೆಟಿನ್‌ಗೆ ಸುಸ್ವಾಗತ. ರಾಜಕೀಯ ಮತ್ತು ವಾಣಿಜ್ಯ ಕ್ಷೇತ್ರದ ಇಂದಿನ ಪ್ರಮುಖ ಸುದ್ದಿಗಳು ಇಲ್ಲಿದೆ.",
    'prajwal_news': "ಬ್ರೇಕಿಂಗ್ ನ್ಯೂಸ್ ಲೈವ್! ವಿಧಾನಸೌಧದ ಎದುರು ಪ್ರಮುಖ ಸಂಪುಟ ಸಭೆ ಮುಕ್ತಾಯಗೊಂಡಿದ್ದು, ಹೊಸ ಕೃಷಿ ನೀತಿಗೆ ಅಂಕಿತ ಬಿದ್ದಿದೆ!",
    'political_debate': "ಇಂದಿನ ಪ್ರಮುಖ ರಾಜಕೀಯ ಚರ್ಚೆ: ಹೊಸ ಕಾಯ್ದೆಯಿಂದ ಸಾರ್ವಜನಿಕರಿಗೆ ಏನು ಲಾಭ? ಪಕ್ಷ ಪ್ರತಿನಿಧಿಗಳ ನಡುವೆ ಕಾವೇರಿದ ವಾದ!",
    'business_reporter': "ಷೇರು ಮಾರುಕಟ್ಟೆ ವರದಿ: ಇಂದಿನ ವಹಿವಾಟಿನಲ್ಲಿ ಸೆನ್ಸೆಕ್ಸ್ ಮತ್ತು ನಿಫ್ಟಿ ಸಾರ್ವಕಾಲಿಕ ದಾಖಲೆಯ ಏರಿಕೆ ಕಂಡಿದೆ. ಪ್ರಮುಖ ಕಂಪನಿಗಳು ಲಾಭದಲ್ಲಿವೆ.",
    'weather_reader': "ಇಂದಿನ ಹವಾಮಾನ ವರದಿ: ರಾಜ್ಯದ ಕರಾವಳಿ ಮತ್ತು ಮಲೆನಾಡು ಭಾಗದಲ್ಲಿ ಮುಂದಿನ 3 ದಿನ ಭಾರಿ ಮಳೆಯಾಗುವ ಸಾಧ್ಯತೆ ಇದೆ ಎಂದು ಇಲಾಖೆ ತಿಳಿಸಿದೆ.",
    'crime_bulletin': "ಕ್ರೈಮ್ ಬುಲೆಟಿನ್: ಅಂತರರಾಷ್ಟ್ರೀಯ ಸೈಬರ್ ವಂಚಕರ ಜಾಲವನ್ನು ಪೋಲೀಸರು ಭೇದಿಸಿದ್ದು, ಕೋಟ್ಯಂತರ ರೂಪಾಯಿ ಹಣವನ್ನು ಮುಟ್ಟುಗೋಲು ಹಾಕಿಕೊಳ್ಳಲಾಗಿದೆ.",
    'geo_news': "ಅಂತರರಾಷ್ಟ್ರೀಯ ಜಾಗತಿಕ ಮುಖ್ಯಾಂಶಗಳು: ಜಾಗತಿಕ ಆರ್ಥಿಕ ಶೃಂಗಸಭೆಯಲ್ಲಿ ಭಾರತದ ಹೊಸ ತಾಂತ್ರಿಕ ಪ್ರಸ್ತಾವನೆಗೆ ಶ್ಲಾಘನೆ ವ್ಯಕ್ತವಾಗಿದೆ.",
    'podcast_interviewer': "ಇಂದಿನ ಪಾಡ್‌ಕಾಸ್ಟ್ ಕಂತಿಗೆ ಸುಸ್ವಾಗತ. ನಮ್ಮ ಜೊತೆ ಇವತ್ತು ವಿಶೇಷ ಅತಿಥಿಯಾಗಿ ಯಶಸ್ವಿ ತಂತ್ರಜ್ಞಾನ ಉದ್ಯಮಿ ಭಾಗವಹಿಸಿದ್ದಾರೆ.",
    'editorial_reader': "ಇಂದಿನ ದಿನಪತ್ರಿಕೆಯ ಮುಖ್ಯ ಸಂಪಾದಕೀಯ ಲೇಖನ: ಶೈಕ್ಷಣಿಕ ಕ್ಷೇತ್ರದಲ್ಲಿ ಕೃತಕ ಬುದ್ಧಿಮತ್ತೆಯ ಬಳಕೆ ಮತ್ತು ಅದರ ಸವಾಲುಗಳು.",
    'kavitha_grandma': "ಒಂದಾನೊಂದು ಕಾಲದಲ್ಲಿ ಒಂದು ದಟ್ಟವಾದ ಕಾಡಿನ ಮಧ್ಯದಲ್ಲಿ ಒಂದು ಸುಂದರವಾದ ಕೆರೆ ಇತ್ತು. ಅಲ್ಲಿ ವಾಸಿಸುತ್ತಿದ್ದ ಪ್ರಾಣಿಗಳು ಪ್ರೀತಿಯಿಂದ ಜೀವನ ನಡೆಸುತ್ತಿದ್ದವು.",
    'radhika_audiobook': "ಅವಳ ಕಣ್ಣುಗಳಲ್ಲಿ ಹೊಸ ಭರವಸೆಯ ಬೆಳಕು ಕಾಣಿಸುತ್ತಿತ್ತು. ಸಂಜೆಯ ತಂಪಾದ ಗಾಳಿಯಲ್ಲಿ ಅವಳು ತನ್ನ ಬಾಲ್ಯದ ಸವಿನೆನಪುಗಳನ್ನು ಮೆಲುಕು ಹಾಕುತ್ತಿದ್ದಳು.",
    'dasara_purana': "ಶ್ರೀಮದ್ ಭಾಗವತದ ಪವಿತ್ರ ಪ್ರವಚನ: ಧರ್ಮದ ಹಾದಿಯಲ್ಲಿ ನಡೆಯುವ ಮಾನವನಿಗೆ ಸದಾ ಭಗವಂತನ ಕೃಪೆ ಲಭಿಸುತ್ತದೆ ಎಂಬುದು ಶಾಸ್ತ್ರದ ನುಡಿ.",
    'fantasy_story': "ನಕ್ಷತ್ರಗಳ ಆಚೆಗಿನ ಆ ರಹಸ್ಯ ಲೋಕದಲ್ಲಿ ಒಂದು ದೊಡ್ಡ ಅದ್ಭುತ ಕಾಯುತ್ತಿತ್ತು. ಮ್ಯಾಜಿಕ್ ಕೋಲನ್ನು ಕೈಯಲ್ಲಿ ಹಿಡಿದ ಯೋಧ ಮುಂದಕ್ಕೆ ಹೆಜ್ಜೆ ಇಟ್ಟನು.",
    'kids_animal_story': "ಒಂದು ಚತುರ ನರಿಯು ಹಸಿದು ಕಾಡಿನಲ್ಲಿ ಅಲೆಯುತ್ತಿತ್ತು. ಹಠಾತ್ತನೆ ದ್ರಾಕ್ಷಿ ತೋಟ ಕಂಡಾಗ ಅದಕ್ಕೆ ತುಂಬಾ ಸಂತೋಷವಾಯಿತು!",
    'horror_ghost': "ಆ ಕತ್ತಲೆಯ ರಸ್ತೆಯಲ್ಲಿ ಗಡಿಯಾರ ಹನ್ನೆರಡು ಬಾರಿಸಿತು. ಹಠಾತ್ತನೆ ತಂಪಾದ ಗಾಳಿ ಬೀಸಿ ಮರದ ನೆರಳು ಮೆಲ್ಲನೆ ಚಲಿಸಲು ಪ್ರಾರಂಭಿಸಿತು...",
    'history_epic': "ವಿಜಯನಗರ ಸಾಮ್ರಾಜ್ಯದ ವೈಭವದ ಇತಿಹಾಸ: ಕೃಷ್ಣದೇವರಾಯನ ಆಡಳಿತದಲ್ಲಿ ಸಾಹಿತ್ಯ ಮತ್ತು ಕಲೆ ಅತ್ಯುನ್ನತ ಶಿಖರವನ್ನು ತಲುಪಿತ್ತು.",
    'coastal_folk': "ನಮ್ಮ ಮಲೆನಾಡಿನ ಹಸಿರಿನ ಸೌಂದರ್ಯ ಮತ್ತು ಕರಾವಳಿಯ ಜಾನಪದ ಸಂಸ್ಕೃತಿ ನಮ್ಮ ಹೆಮ್ಮೆ. ಯಕ್ಷಗಾನದ ಗೆಜ್ಜೆಯ ನಾದ ಕಿವಿಗೆ ಜೇನಿನಂತೆ ಪಸರಿಸುತ್ತದೆ.",
    'spiritual_gita': "ಭಗವದ್ಗೀತೆಯ ಅಮೃತ ವಚನ: ಕರ್ಮಣ್ಯೇವಾಧಿಕಾರಸ್ತೇ ಮಾ ಫಲೇಷು ಕದಾಚನ. ನಿಮ್ಮ ಕರ್ತವ್ಯವನ್ನು ನಿಷ್ಠೆಯಿಂದ ಮಾಡಿ, ಫಲದ ನಿರೀಕ್ಷೆ ಬೇಡ.",
    'kingdom_legend': "ಮೈಸೂರು ಸಂಸ್ಥಾನದ ಶೌರ್ಯದ ಇತಿಹಾಸ: ನಾಡಿನ ಸ್ವಾತಂತ್ರ್ಯಕ್ಕಾಗಿ ಪ್ರಾಣತ್ಯಾಗ ಮಾಡಿದ ವೀರ ಯೋಧರ ಅಮರ ಗೀತೆ.",
    'suhas_teacher': "ಆತ್ಮೀಯ ವಿದ್ಯಾರ್ಥಿಗಳೇ, ಇಂದಿನ ತರಗತಿಯಲ್ಲಿ ನಾವು ಗಣಿತ ಮತ್ತು ವಿಜ್ಞಾನದ ಪ್ರಮುಖ ಸಿದ್ಧಾಂತಗಳನ್ನು ಸರಳವಾಗಿ ಕಲಿಯೋಣ.",
    'corporate_hr': "ವೆಲ್‌ಕಮ್ ಟು ದ ಕಾರ್ಪೊರೇಟ್ ಓರಿಯಂಟೇಶನ್ ಸೆಷನ್. ಕಂಪನಿಯ ಹೊಸ ನೀತಿಗಳು ಮತ್ತು ತಂಡದ ಯಶಸ್ಸಿನ ನಿಯಮಗಳ ವಿವರಣೆ ಇಲ್ಲಿದೆ.",
    'aira_ai': "ಹೆಲೋ! ನಾನು ಐರಾ ಎಐ ಗೈಡ್. ನಿಮ್ಮ ಸಾಫ್ಟ್‌ವೇರ್ ಮತ್ತು ಕೋಡಿಂಗ್ ಸಮಸ್ಯೆಯನ್ನು 1-ಕ್ಲಿಕ್‌ನಲ್ಲಿ ಪರಿಹರಿಸಲು ನಾನು ಸಿದ್ಧವಾಗಿದ್ದೇನೆ.",
    'doctor_health': "ಆರೋಗ್ಯ ಪಾಲನೆಯ ಸರಳ ಸೂತ್ರ: ದಿನಕ್ಕೆ ಕನಿಷ್ಠ 3 ಲೀಟರ್ ನೀರು ಕುಡಿಯಿರಿ ಮತ್ತು ಪ್ರತಿದಿನ 30 ನಿಮಿಷಗಳ ನಡಿಗೆ ನಿಮ್ಮ ಹೃದಯವನ್ನು ಆರೋಗ್ಯವಾಗಿಡುತ್ತದೆ.",
    'legal_policy': "ಸಾರ್ವಜನಿಕ ಕಾನೂನು ಅರಿವು: ಗ್ರಾಹಕರ ಹಕ್ಕುಗಳು ಮತ್ತು ಆಸ್ತಿ ನೋಂದಣಿ ಕಾನೂನಿನ ಪ್ರಮುಖ ಕಾಯ್ದೆಗಳ ಸಂಪೂರ್ಣ ವಿವರಣೆ.",
    'meditation_yoga': "ದೀರ್ಘವಾಗಿ ಉಸಿರನ್ನು ಒಳಗೆ ತೆಗೆದುಕೊಳ್ಳಿ... ಮನಸ್ಸಿನ ಎಲ್ಲಾ ಒತ್ತಡಗಳನ್ನು ಹೊರಹಾಕಿ... ಪ್ರಶಾಂತತೆಯನ್ನು ಅನುಭವಿಸಿ...",
    'code_instructor': "ಇಂದಿನ ಪೈಥಾನ್ ಪ್ರೋಗ್ರಾಮಿಂಗ್ ಟ್ಯುಟೋರಿಯಲ್: ಫಂಕ್ಷನ್‌ಗಳು ಮತ್ತು ಡೇಟಾ ಸ್ಟ್ರಕ್ಚರ್‌ಗಳನ್ನು ಹೇಗೆ ಸರಳವಾಗಿ ಬರೆಯುವುದು ಎಂದು ಕಲಿಯೋಣ.",
    'cyber_security': "ಸೈಬರ್ ಜಾಗೃತಿ ಎಚ್ಚರಿಕೆ: ನಿಮ್ಮ ಬ್ಯಾಂಕ್ ಒಟಿಪಿ ಮತ್ತು ಪಾಸ್‌ವರ್ಡ್ ಅನ್ನು ಯಾರೊಂದಿಗೂ ಹಂಚಿಕೊಳ್ಳಬೇಡಿ. ಅನುಮಾನಾಸ್ಪದ ಲಿಂಕ್‌ಗಳನ್ನು ಕ್ಲಿಕ್ ಮಾಡಬೇಡಿ.",
    'gps_nav': "ಮುಂದಿನ 200 ಮೀಟರ್‌ನಲ್ಲಿ ಬಲಕ್ಕೆ ತಿರುಗಿ. ನಿಮ್ಮ ಗಮ್ಯಸ್ಥಾನವು ರಸ್ತೆಯ ಎಡಭಾಗದಲ್ಲಿದೆ.",
    'museum_guide': "ಈ ಐತಿಹಾಸಿಕ ವಸ್ತುವನ್ನು 16ನೇ ಶತಮಾನದಲ್ಲಿ ಕಲಾತ್ಮಕವಾಗಿ ಕೆತ್ತಲಾಗಿದೆ. ಇದರ ಕಲಾಶೈಲಿ ಆಗಿನ ಶ್ರೀಮಂತ ಸಂಸ್ಕೃತಿಯನ್ನು ಬಿಂಬಿಸುತ್ತದೆ.",
    'vikram_deep': "ನನ್ನ ದಾರಿ ಅಡ್ಡ ಬಂದರೆ ಯಾವ ಶಕ್ತಿಯೂ ಉಳಿಲು ಸಾಧ್ಯವಿಲ್ಲ! ಇದು ಮಾಸ್ ಸಿನಿಮಾ ಪವರ್!",
    'drama_stage': "ರಂಗಭೂಮಿಯ ಪವಿತ್ರ ಬೆಳಕಿನಲ್ಲಿ ಸತ್ಯದ ದರ್ಶನವಾಗುತ್ತದೆ! ನಟನೆಯೇ ನನ್ನ ಉಸಿರು, ಕಲೆಯ ಮೂಲವೇ ನನ್ನ ಜೀವ!",
    'movie_villain': "ಈ ಸಾಮ್ರಾಜ್ಯಕ್ಕೆ ಒಂದೇ ಸಿಂಹ, ಅದು ನಾನು ಮಾತ್ರ! ನನ್ನ ಮಾತನ್ನು ಮೀರಿದರೆ ಪರಿಣಾಮ ಭೀಕರವಾಗಿರುತ್ತದೆ!",
    'retro_hero': "ಏನೋ ತಮ್ಮಾ, ನನ್ನ ಮುಂದೆ ನಿಂತು ಶೋ ತೋರಿಸ್ತಾ ಇದ್ದೀಯಾ? 70ರ ದಶಕದ ಈ ಹೀರೋ ಸ್ಟೈಲ್ ನಿನಗೆ ಗೊತ್ತಿಲ್ಲ!",
    'royal_warrior': "ಸಕಲ ಪ್ರಜೆಗಳಿಗೂ ಮಹಾರಾಜರ ಆಜ್ಞೆ: ನಮ್ಮ ನಾಡಿನ ರಕ್ಷಣೆಗಾಗಿ ಪ್ರತಿಯೊಬ್ಬ ಪ್ರಜೆಯೂ ಧರ್ಮದ ಹಾದಿಯಲ್ಲಿ ನಿಲ್ಲತಕ್ಕದ್ದು!",
    'docu_host': "ದಟ್ಟವಾದ ಮಳೆಕಾಡಿನ ಆಳದಲ್ಲಿ ವಾಸಿಸುವ ಈ ರಹಸ್ಯ ಜೀವಿಗಳ ಜೀವನ ಶೈಲಿ ನಿಜಕ್ಕೂ ಸೃಷ್ಟಿಯ ಒಂದು ಅದ್ಭುತ ಪವಾಡ.",
    'award_host': "ವರ್ಷದ ಅತ್ಯುತ್ತಮ ನಟ ಪ್ರಶಸ್ತಿಯನ್ನು ಮುಡಿಗೇರಿಸಿಕೊಳ್ಳುತ್ತಿರುವ ಆ ಮಹಾನ್ ಕಲಾವಿದ... ಶ್ರೀ ಅಭಿನಯ ಚಕ್ರವರ್ತಿ!",
    'wedding_mc': "ಮದುವೆ ಮಂಟಪಕ್ಕೆ ಆಗಮಿಸುತ್ತಿರುವ ಬಂಧುಮಿತ್ರರಿಗೆಲ್ಲರಿಗೂ ಹೃದಯಪೂರ್ವಕ ಸುಸ್ವಾಗತ! ನವಜೋಡಿಗೆ ಶುಭಾಶೀರ್ವಾದ ನೀಡಿ.",
    'standup_comic': "ಸ್ನೇಹಿತರೆ, ಇವತ್ತು ನಮ್ ಬೆಂಗಳೂರು ಟ್ರಾಫಿಕ್ ಬಗ್ಗೆ ಒಂದು ಮಾತು ಹೇಳ್ಬೇಕು ಅಂದ್ರೆ, ಸಿಗ್ನಲ್‌ನಲ್ಲಿ ಗಾಡಿ ಆಫ್ ಮಾಡಿದ್ರೆ ಮನೆಗೇ ಹೋಗಿ ಬರಬಹುದು!",
    'maharaja_darbar': "ಶ್ರೀಮದ್ ರಾಜಾಧಿರಾಜ ಪರಮೇಶ್ವರ ಮಹಾರಾಜ ಬಹದ್ದೂರ್... ಬೋಲೋ ಮಹಾರಾಜರಿಗೆ ಜೈ!",
    'ananya_kid': "ನಮಸ್ಕಾರ! ನನ್ನ ಹೆಸರು ಅನನ್ಯ. ಇವತ್ತು ನಮ್ಮ ಶಾಲೆಯಲ್ಲಿ ವಿಜ್ಞಾನ ಪ್ರದರ್ಶನ ನಡೆಯುತ್ತಿದೆ, ನಾನು ಸುಂದರವಾದ ಮಾದರಿ ಮಾಡಿದ್ದೇನೆ!",
    'chintu_boy': "ಹೇಯ್ ಚಿಂಟು ಬಂದಾ! ಇವತ್ತು ನಾವೆಲ್ಲರೂ ಸೇರಿ ಮೈದಾನದಲ್ಲಿ ಕ್ರಿಕೆಟ್ ಆಡೋಣ, ನನ್ನ ಬ್ಯಾಟಿಂಗ್ ನೋಡಿದ್ರೆ ನಿಮಗೇ ಆಶ್ಚರ್ಯ ಆಗುತ್ತೆ!",
    'cartoon_kid': "ಕ್ವಾಕ್ ಕ್ವಾಕ್! ನಾನು ಕಾಮಿಡಿ ಕಾರ್ಟೂನ್ ವಾತು! ನನ್ನ ಜೊತೆ ಆಟ ಆಡೋಕೆ ಯಾರಿಗೆಲ್ಲಾ ಇಷ್ಟ ಇದೆ ಬನ್ನಿ ಬನ್ನಿ!",
    'circus_clown': "ಹಹಾ ಕಾಮಿಡಿ ಜೋಕರ್ ಬಂದಾ! ನಿಮ್ಮ ಮುಖದಲ್ಲಿ ನಗು ತರೋಕೆ ನನ್ನ ಹತ್ತಿರ ತರಹೇವಾರಿ ಮ್ಯಾಜಿಕ್ ಟ್ರಿಕ್ಸ್‌ಗಳಿವೆ ನೋಡಿ!",
    'toy_robot': "ಬೀಪ್ ಬೂಪ್! ನಾನು ನಿಮ್ಮ ರೋಬೋಟ್ ಗೆಳೆಯ! ನನಗೆ ಕಮಾಂಡ್ ನೀಡಿ, ನಾನು ನಿಮ್ಮ ಕೆಲಸವನ್ನು ತಕ್ಷಣವೇ ಮಾಡುತ್ತೇನೆ!",
    'wizard_magic': "ಆಬ್ರಕಾಡಾಬ್ರಾ! ನನ್ನ ಮ್ಯಾಜಿಕ್ ಕೋಲಿನ ಶಕ್ತಿಯಿಂದ ಈ ಪೆಟ್ಟಿಗೆಯ ಒಳಗಡೆಯಿಂದ ಸುಂದರ ಪಾರಿವಾಳ ಹೊರಬರಲಿದೆ!",
    'talking_parrot': "ಮಿಠು ಮಿಠು! ನಮಸ್ಕಾರ ಹೇಳಿ! ನಾನು ನಿಮ್ಮ ಮುದ್ದು ಕಥೆ ಹೇಳುವ ಬಣ್ಣ ಬಣ್ಣದ ಗಿಳಿ!",
    'toddler_baby': "ತಾತಾ! ನನಗೆ ಅಮ್ಮ ಮುದ್ದು ಕೊಟ್ರು, ನಾನು ತುಂಬಾ ಚಂದ ಇದ್ದೀನಿ ಅಲ್ವಾ?",
    'teenager_boy': "ಹೇ ಬಡಿ! ಇವತ್ತು ಸಾಯಂಕಾಲ ಕಾಲೇಜು ಫ್ರೆಂಡ್ಸ್ ಜೊತೆ ಲಾಂಗ್ ರೈಡ್ ಹೋಗ್ತಾ ಇದ್ದೀವಿ, ಸೂಪರ್ ಮಜಾ!",
    'puppet_show': "ನೋಡಿ ನೋಡಿ ರಂಗನ ಗೊಂಬೆಯಾಟ! ಕಥೆ ಕೇಳೋಕೆ ಬಂದಿರುವ ಪ್ರೇಕ್ಷಕರಿಗೆಲ್ಲಾ ನಮ್ಮ ನಮಸ್ಕಾರಗಳು!",
    'announcer_public': "ಗಮನಿಸಿ! ಬೆಂಗಳೂರಿನಿಂದ ಮೈಸೂರಿಗೆ ಹೊರಡುವ ಎಕ್ಸ್‌ಪ್ರೆಸ್ ರೈಲು ಪ್ಲಾಟ್‌ಫಾರ್ಮ್ ಸಂಖ್ಯೆ 2 ರಲ್ಲಿ ಆಗಮಿಸುತ್ತಿದೆ.",
    'ksrtc_bus': "ಪ್ರಯಾಣಿಕರ ಗಮನಕ್ಕೆ: ಮೈಸೂರು, ಹಾಸನ ಮಾರ್ಗವಾಗಿ ಮಂಗಳೂರಿಗೆ ತೆರಳುವ ರಾಜಹಂಸ ಬಸ್ಸು ನಿಲ್ದಾಣದ ಕೌಂಟರ್ 5 ರಲ್ಲಿ ಸಿದ್ಧವಾಗಿದೆ.",
    'airport_flight': "ವಿಮಾನ ಪ್ರಯಾಣಿಕರ ಗಮನಕ್ಕೆ: ಬೆಂಗಳೂರಿನಿಂದ ದೆಹಲಿಗೆ ತೆರಳುವ ವಿಮಾನ 402 ರ ಬೋರ್ಡಿಂಗ್ ಗೇಟ್ ಸಂಖ್ಯೆ 3 ರಲ್ಲಿ ಪ್ರಾರಂಭವಾಗಿದೆ.",
    'traffic_safety': "ಸಂಚಾರ ನಿಯಮ ಜಾಗೃತಿ: ದ್ವಿಚಕ್ರ ವಾಹನ ಚಾಲನೆ ಮಾಡುವಾಗ ಹೆಲ್ಮೆಟ್ ಕಡ್ಡಾಯವಾಗಿ ಧರಿಸಿ. ವೇಗಕಿಂತ ಜೀವ ಮೌಲ್ಯಯುತವಾದದ್ದು.",
    'raghu_vintage': "ಇದು ಆಕಾಶವಾಣಿ ಬೆಂಗಳೂರು. ಈಗ ಪ್ರಸಾರವಾಗುತ್ತಿರುವುದು ನೆನಪಿನ ಅಲೆಯ 80ರ ದಶಕದ ಮಧುರ ಗೀತೆಗಳ ಕಾರ್ಯಕ್ರಮ.",
    'mystic_spirit': "ಆಳವಾದ ಇಕೋ ಶಕ್ತಿಯ ಮಧ್ಯದಲ್ಲಿ ಜ್ಞಾನದ ಧ್ವನಿ ಧ್ವನಿಸುತ್ತಿದೆ... ಪ್ರಕೃತಿಯ ಮೌನವೇ ಶ್ರೇಷ್ಠ ಜ್ಞಾನ...",
    'walkie_talkie': "ಕಂಟ್ರೋಲ್ ರೂಮ್ ಟು ಆಲ್ ಯುನಿಟ್ಸ್: ಸೆಕ್ಟರ್ 4 ರಲ್ಲಿ ರಸ್ತೆ ತಡೆ ಕಾರ್ಯಾಚರಣೆ ತಕ್ಷಣವೇ ಪ್ರಾರಂಭಿಸಿ, ಓವರ್!",
    'neumann_mic': "ಇದು $1000 ಪ್ರೊಫೆಷನಲ್ ಮೈಕ್ ಆಡಿಯೋ ಸೌಂಡ್. ಅತ್ಯಂತ ಸ್ಪಷ್ಟ ಮತ್ತು ವಾರ್ಮ್ ಧ್ವನಿಯನ್ನು ಅನುಭವಿಸಿ.",
    'shopping_mela': "ಬೃಹತ್ ಶೋಪಿಂಗ್ ಮೇಳಾರಂಭ! ದೀಪಾವಳಿ ಧಮಾಕಾ ಆಫರ್‌ನಲ್ಲಿ 50% ರಿಯಾಯಿತಿಯಲ್ಲಿ ಎಲ್ಲಾ ಸಾಮಗ್ರಿಗಳನ್ನು ಪಡೆಯಿರಿ!",
    'coffee_chat': "ಒಂದು ಕಪ್ ಬಿಸಿ ಬಿಸಿ ಫಿಲ್ಟರ್ ಕಾಫಿ ಜೊತೆ ಗೆಳೆಯರ ಹರಟೆ ಹೊಡೆಯುವ ಮಜಾವೇ ಬೇರೆ, ಅಲ್ವಾ?"
};

// 🎯 SPEECH INTONATION & FLOW STYLE PRESETS ENGINE
function applyFlowPreset(style, element) {
    document.querySelectorAll('.sample-pills-row .pill').forEach(p => p.classList.remove('active'));
    if (element) element.classList.add('active');

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
    document.getElementById('ttsTextInput').value = "";
    document.getElementById('ttsTextInput').focus();
}

// Category Pill Filter for 100 Models
function filterCategory(cat, element) {
    if (element) {
        document.querySelectorAll('.cat-pill').forEach(p => p.classList.remove('active'));
        element.classList.add('active');
    }

    const cards = document.querySelectorAll('#voiceGrid100 .model-card');
    cards.forEach(card => {
        if (cat === 'all' || card.getAttribute('data-cat') === cat) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

// Instant Voice Search Bar for 100 Models
function searchVoices(query) {
    const q = query.toLowerCase().trim();
    const cards = document.querySelectorAll('#voiceGrid100 .model-card');
    cards.forEach(card => {
        const text = card.innerText.toLowerCase();
        if (text.includes(q)) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

// Voice Selector WITH AUTO DEDICATED SAMPLE DIALOGUE POPULATOR!
function selectVoice(voice, element) {
    selectedVoice = voice;
    document.querySelectorAll('#voiceGrid100 .model-card').forEach(c => c.classList.remove('active'));
    if (element) element.classList.add('active');

    // Auto populate custom dedicated human dialogue for this model!
    if (MODEL_DIALOGUES[voice]) {
        document.getElementById('ttsTextInput').value = MODEL_DIALOGUES[voice];
    }
}

function selectVoiceByName(voiceName) {
    selectedVoice = voiceName;
    const card = document.querySelector(`#voiceGrid100 .model-card[onclick*="${voiceName}"]`);
    if (card) {
        document.querySelectorAll('#voiceGrid100 .model-card').forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        if (MODEL_DIALOGUES[voiceName]) {
            document.getElementById('ttsTextInput').value = MODEL_DIALOGUES[voiceName];
        }
    }
}

// 🎯 Mahiti Chakra Auto-Select Recommendation
function autoSelectMahitiChakra() {
    const topRecommendedVoices = ['mahiti_job', 'mahiti_scheme', 'kn-IN-SapnaNeural', 'amazon_unboxing', 'mahiti_farmer'];
    const randomPick = topRecommendedVoices[Math.floor(Math.random() * topRecommendedVoices.length)];
    selectVoiceByName(randomPick);
    alert("🌟 Mahiti Chakra Pro Model Auto-Selected!");
}

// Customizer Sliders
function updateRateLabel(val) {
    document.getElementById('rateVal').innerText = val + 'x (Fast)';
}

function updateVolLabel(val) {
    document.getElementById('volVal').innerText = `+${val}% (Loud)`;
}

function updatePitchLabel(val) {
    const v = parseInt(val);
    document.getElementById('pitchVal').innerText = v > 0 ? `+${v}Hz` : `${v}Hz`;
}

// Kanglish Accordion & Translator
function toggleKanglish() {
    const body = document.getElementById('kangBody');
    const icon = document.getElementById('kangIcon');
    if (body.style.display === 'none') {
        body.style.display = 'block';
        icon.innerText = '▲';
    } else {
        body.style.display = 'none';
        icon.innerText = '▼';
    }
}

function convertKanglish(text) {
    if (!text) {
        document.getElementById('kangResult').innerText = "Converted Kannada text will appear here...";
        return;
    }
    const words = text.toLowerCase().split(/\s+/);
    const converted = words.map(w => KANGLISH_DICTIONARY[w] || w).join(' ');
    document.getElementById('kangResult').innerText = converted;
}

function applyKanglish() {
    const res = document.getElementById('kangResult').innerText;
    if (res && res !== "Converted Kannada text will appear here...") {
        document.getElementById('ttsTextInput').value = res;
    }
}

// Web Audio API Real-time Vocal EQ Engine (AUDIBLE & DRAMATIC SOUND DIFFERENCE)
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

// Generate Pro Speech with REAL-TIME MILLISECOND TIMER & LIVE PROGRESS BAR
async function generateProTTS() {
    const text = document.getElementById('ttsTextInput').value.trim();
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

    genBtn.classList.add('loading');
    progressContainer.style.display = 'block';
    timerLog.style.display = 'flex';
    progressBarFill.style.width = '10%';
    playerStatus.innerText = '⏳ Processing HD Speech...';

    const startTime = performance.now();
    let timerInterval = setInterval(() => {
        const elapsedSec = ((performance.now() - startTime) / 1000).toFixed(1);
        timerLog.innerText = `⏳ Generating HD Audio... ${elapsedSec}s`;
        if (parseFloat(progressBarFill.style.width) < 85) {
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

        // Apply Real-Time Vocal EQ Processing
        progressBarFill.style.width = '90%';
        const processedWavBlob = await applyVocalEQ(rawArrayBuffer, eq);
        const audioUrl = URL.createObjectURL(processedWavBlob);
        
        const player = document.getElementById('mainAudioPlayer');
        player.src = audioUrl;
        player.play();

        const dlBtn = document.getElementById('downloadBtn');
        dlBtn.href = audioUrl;
        dlBtn.download = `mahiti_chakra_${selectedVoice}_${eq}.wav`;
        dlBtn.classList.remove('disabled');

        clearInterval(timerInterval);
        const totalDurationSec = ((performance.now() - startTime) / 1000).toFixed(2);
        
        progressBarFill.style.width = '100%';
        timerLog.innerText = `⚡ Generated in ${totalDurationSec}s with ${eq.toUpperCase()} EQ!`;
        playerStatus.innerText = `✅ Generated in ${totalDurationSec}s!`;
        genBtn.classList.remove('loading');

        setTimeout(() => {
            progressContainer.style.display = 'none';
        }, 3000);

    } catch (err) {
        clearInterval(timerInterval);
        console.error(err);
        playerStatus.innerText = "❌ Error Generating Speech";
        timerLog.innerText = "❌ Generation Failed";
        genBtn.classList.remove('loading');
        alert("Error generating speech. Please try again.");
    }
}
