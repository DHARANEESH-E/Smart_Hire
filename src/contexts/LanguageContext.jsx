import React, { createContext, useState, useContext, useEffect } from 'react';

const LanguageContext = createContext();

export const translations = {
    en: {
        nav: {
            home: 'Home',
            jobs: 'Find Jobs',
            internships: 'Internships',
            events: 'College Events',
            recommendations: 'Recommended',
            profile: 'Profile',
            login: 'Login',
            signup: 'Sign Up'
        },
        hero: {
            title: 'Your Future Starts Here',
            subtitle: 'Premium job portal for Tamil Nadu students with AI matching and ATS verification.',
            searchPlaceholder: 'Search for jobs, internships, or events...',
            searchBtn: 'Search'
        },
        common: {
            applyNow: 'Apply Now',
            applied: 'Applied',
            viewDetails: 'View Details',
            submit: 'Submit Application',
            loading: 'Loading...'
        },
        ats: {
            checker: 'ATS Resume Checker',
            score: 'ATS Score',
            analysis: 'Resume Analysis',
            builder: 'ATS Resume Builder'
        }
    },
    ta: {
        nav: {
            home: 'முகப்பு',
            jobs: 'வேலைகள்',
            internships: 'பயிற்சி',
            events: 'கல்லூரி நிகழ்வுகள்',
            recommendations: 'பரிந்துரைக்கப்பட்டவை',
            profile: 'சுயவிவரம்',
            login: 'உள்நுழைக',
            signup: 'பதிவு செய்க'
        },
        hero: {
            title: 'உங்கள் எதிர்காலம் இங்கே தொடங்குகிறது',
            subtitle: 'AI பொருத்தப்பாடு மற்றும் ATS சரிபார்ப்புடன் தமிழ்நாடு மாணவர்களுக்கான பிரீமியம் வேலை போர்ட்டல்.',
            searchPlaceholder: 'வேலைகள் அல்லது நிகழ்வுகளைத் தேடுங்கள்...',
            searchBtn: 'தேடுக'
        },
        common: {
            applyNow: 'இப்போதே விண்ணப்பிக்கவும்',
            applied: 'விண்ணப்பிக்கப்பட்டது',
            viewDetails: 'விவரங்களைக் காண்க',
            submit: 'விண்ணப்பத்தைச் சமர்ப்பிக்கவும்',
            loading: 'ஏற்றப்படுகிறது...'
        },
        ats: {
            checker: 'ATS ரெஸ்யூம் செக்கர்',
            score: 'ATS மதிப்பெண்',
            analysis: 'ரெஸ்யூம் பகுப்பாய்வு',
            builder: 'ATS ரெஸ்யூம் பில்டர்'
        }
    },
    hi: {
        nav: {
            home: 'होम',
            jobs: 'नौकरियाँ खोजें',
            internships: 'इंटर्नशिप',
            events: 'कॉलेज कार्यक्रम',
            recommendations: 'अनुशंसित',
            profile: 'प्रोफ़ाइल',
            login: 'लॉगिन',
            signup: 'साइन अप'
        },
        hero: {
            title: 'आपका भविष्य यहीं से शुरू होता है',
            subtitle: 'एआई मिलान और एटीएस सत्यापन के साथ तमिलनाडु के छात्रों के लिए प्रीमियम जॉब पोर्टल।',
            searchPlaceholder: 'नौकरियाँ या कार्यक्रम खोजें...',
            searchBtn: 'खोजें'
        },
        common: {
            applyNow: 'अभी आवेदन करें',
            applied: 'आवेदन किया गया',
            viewDetails: 'विवरण देखें',
            submit: 'आवेदन जमा करें',
            loading: 'लोड हो रहा है...'
        },
        ats: {
            checker: 'एटीएस रिज्यूमे चेकर',
            score: 'एटीएस स्कोर',
            analysis: 'रिज्यूमे विश्लेषण',
            builder: 'एटीएस रिज्यूमे बिल्डर'
        }
    },
    te: {
        nav: {
            home: 'హోమ్',
            jobs: 'ఉద్యోగాలు',
            internships: 'ఇంటర్న్‌షిప్‌లు',
            events: 'కాలేజీ ఈవెంట్స్',
            recommendations: 'సిఫార్సు చేయబడినవి',
            profile: 'ప్రొఫైల్',
            login: 'లాగిన్',
            signup: 'సైన్ అప్'
        },
        hero: {
            title: 'మీ భవిష్యత్తు ఇక్కడే ప్రారంభమవుతుంది',
            subtitle: 'AI మ్యాచింగ్ మరియు ATS వెరిఫికేషన్‌తో తమిళనాడు విద్యార్థుల కోసం ప్రీమియం జాబ్ పోర్టల్.',
            searchPlaceholder: 'ఉద్యోగాలు లేదా ఈవెంట్‌ల కోసం వెతకండి...',
            searchBtn: 'వెతకండి'
        },
        common: {
            applyNow: 'ఇప్పుడే దరఖాస్తు చేయండి',
            applied: 'దరఖాస్తు చేశారు',
            viewDetails: 'వివరాలు చూడండి',
            submit: 'దరఖాస్తు సమర్పించండి',
            loading: 'లోడ్ అవుతోంది...'
        },
        ats: {
            checker: 'ATS రెజ్యూమ్ చెకర్',
            score: 'ATS స్కోర్',
            analysis: 'రెజ్యూమ్ విశ్లేషణ',
            builder: 'ATS రెజ్యూమ్ బిల్డర్'
        }
    },
    kn: {
        nav: {
            home: 'ಮುಖಪುಟ',
            jobs: 'ಉದ್ಯೋಗಗಳು',
            internships: 'ಇಂಟರ್ನ್‌ಶಿಪ್‌ಗಳು',
            events: 'ಕಾಲೇಜು ಕಾರ್ಯಕ್ರಮಗಳು',
            recommendations: 'ಶಿಫಾರಸು ಮಾಡಿದವು',
            profile: 'ಪ್ರೊಫೈಲ್',
            login: 'ಲಾಗಿನ್',
            signup: 'ಸೈನ್ ಅಪ್'
        },
        hero: {
            title: 'ನಿಮ್ಮ ಭವಿಷ್ಯ ಇಲ್ಲಿ ಪ್ರಾರಂಭವಾಗುತ್ತದೆ',
            subtitle: 'AI ಹೊಂದಾಣಿಕೆ ಮತ್ತು ATS ಪರಿಶೀಲನೆಯೊಂದಿಗೆ ತಮಿಳುನಾಡು ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಪ್ರೀಮಿಯಂ ಉದ್ಯೋಗ ಪೋರ್ಟಲ್.',
            searchPlaceholder: 'ಉದ್ಯೋಗಗಳು ಅಥವಾ ಕಾರ್ಯಕ್ರಮಗಳನ್ನು ಹುಡುಕಿ...',
            searchBtn: 'ಹುಡುಕಿ'
        },
        common: {
            applyNow: 'ಈಗಲೇ ಅರ್ಜಿ ಹಾಕಿ',
            applied: 'ಅರ್ಜಿ ಸಲ್ಲಿಸಲಾಗಿದೆ',
            viewDetails: 'ವಿವರಗಳನ್ನು ನೋಡಿ',
            submit: 'ಅರ್ಜಿ ಸಲ್ಲಿಸಿ',
            loading: 'ಲೋಡ್ ಆಗುತ್ತಿದೆ...'
        },
        ats: {
            checker: 'ATS ರೆಸ್ಯೂಮ್ ಚೆಕರ್',
            score: 'ATS ಸ್ಕೋರ್',
            analysis: 'ರೆಸ್ಯೂಮ್ ವಿಶ್ಲೇಷಣೆ',
            builder: 'ATS ರೆಸ್ಯೂಮ್ ಬಿಲ್ಡರ್'
        }
    },
    ml: {
        nav: {
            home: 'ഹോം',
            jobs: 'ജോലികൾ',
            internships: 'ഇന്റേൺഷിപ്പുകൾ',
            events: 'കോളേജ് ഇവന്റുകൾ',
            recommendations: 'ശുപാർശകൾ',
            profile: 'പ്രൊഫൈൽ',
            login: 'ലോഗിൻ',
            signup: 'സൈൻ അപ്പ്'
        },
        hero: {
            title: 'നിങ്ങളുടെ ഭാവി ഇവിടെ തുടങ്ങുന്നു',
            subtitle: 'AI പൊരുത്തപ്പെടുത്തലും ATS പരിശോധനയുമുള്ള തമിഴ്നാട് വിദ്യാർത്ഥികൾക്കായുള്ള പ്രീമിയം ജോബ് പോർട്ടൽ.',
            searchPlaceholder: 'ജോലികളോ ഇവന്റുകളോ തിരയുക...',
            searchBtn: 'തിരയുക'
        },
        common: {
            applyNow: 'ഇപ്പോൾ അപേക്ഷിക്കുക',
            applied: 'അപേക്ഷിച്ചു',
            viewDetails: 'വിശദാംശങ്ങൾ കാണുക',
            submit: 'അപേക്ഷ സമർപ്പിക്കുക',
            loading: 'ലോഡ് ചെയ്യുന്നു...'
        },
        ats: {
            checker: 'ATS റെസ്യൂമെ ചെക്കർ',
            score: 'ATS സ്കോർ',
            analysis: 'റെസ്യൂമെ വിശകലനം',
            builder: 'ATS റെസ്യൂമെ ബിൽഡർ'
        }
    }
};

export const LanguageProvider = ({ children }) => {
    const [lang, setLang] = useState(localStorage.getItem('lang') || 'en');

    const t = (key) => {
        const keys = key.split('.');
        let result = translations[lang];
        for (const k of keys) {
            result = result ? result[k] : null;
        }
        return result || key;
    };

    useEffect(() => {
        localStorage.setItem('lang', lang);
    }, [lang]);

    return (
        <LanguageContext.Provider value={{ lang, setLang, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
