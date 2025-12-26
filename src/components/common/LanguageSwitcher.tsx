import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

export const LanguageSwitcher: React.FC = () => {
    const { language, setLanguage } = useLanguage();

    return (
        <div className="flex gap-2 bg-card border border-border p-1">
            <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 font-display text-sm font-bold transition-all ${language === 'en'
                        ? 'bg-primary text-background'
                        : 'text-white/60 hover:text-white'
                    }`}
            >
                EN
            </button>
            <button
                onClick={() => setLanguage('ru')}
                className={`px-3 py-1 font-display text-sm font-bold transition-all ${language === 'ru'
                        ? 'bg-primary text-background'
                        : 'text-white/60 hover:text-white'
                    }`}
            >
                RU
            </button>
        </div>
    );
};
