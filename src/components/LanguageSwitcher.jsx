import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageSwitcher = () => {
    const { lang, setLang } = useLanguage();

    return (
        <div className="language-switcher" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <select
                value={lang}
                onChange={(e) => setLang(e.target.value)}
                style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    color: 'var(--text)',
                    border: '1px solid var(--border)',
                    borderRadius: '0.5rem',
                    padding: '0.25rem 0.5rem',
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    outline: 'none',
                    backdropFilter: 'blur(10px)'
                }}
            >
                <option value="en">English</option>
                <option value="ta">தமிழ்</option>
                <option value="hi">हिंदी</option>
                <option value="te">తెలుగు</option>
                <option value="kn">ಕನ್ನಡ</option>
                <option value="ml">മലയാളം</option>
            </select>
        </div>
    );
};

export default LanguageSwitcher;
