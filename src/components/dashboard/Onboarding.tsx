import { useState } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface OnboardingProps {
    isVisible: boolean;
    onComplete: (initialDeposit: number, monthlyContribution: number) => void;
}

export const Onboarding = ({ isVisible, onComplete }: OnboardingProps) => {
    const { language, setLanguage } = useLanguage();
    const [step, setStep] = useState(1);
    const [deposit, setDeposit] = useState(10000);
    const [contribution, setContribution] = useState(1000);

    if (!isVisible) return null;

    const handleFinish = () => {
        onComplete(deposit, contribution);
    };

    const strings = {
        en: {
            title: 'Setup_Strategy',
            step1: {
                h: 'Initial <br />Savings',
                p: 'How much money do you have to start with right now?'
            },
            step2: {
                h: 'Monthly <br />Deposit',
                p: 'How much will you add to your savings every month?'
            },
            next: 'CONTINUE',
            back: 'BACK',
            finish: 'START',
            footer: 'system_ready // data_entry'
        },
        ru: {
            title: 'Настройка_Прогноза',
            step1: {
                h: 'Стартовый <br />капитал',
                p: 'С какой суммы (сбережений) вы начинаете инвестировать?'
            },
            step2: {
                h: 'Пополнение <br />счета',
                p: 'Какую сумму вы будете добавлять к капиталу каждый месяц?'
            },
            next: 'ДАЛЕЕ',
            back: 'НАЗАД',
            finish: 'ГОТОBO',
            footer: 'система_готова // ввод_данных'
        }
    };

    const s = strings[language];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm p-6">
            <div className="max-w-xl w-full border-4 border-primary p-12 bg-background shadow-[16px_16px_0px_0px_rgba(var(--primary),0.1)] relative">
                <div className="absolute -top-6 -left-6 bg-primary text-background px-4 py-2 font-display font-black italic uppercase text-xl">
                    {s.title}
                </div>

                {/* Language Switcher */}
                <div className="absolute -top-6 -right-6 flex gap-1">
                    <button
                        onClick={() => setLanguage('ru')}
                        className={`px-3 py-2 font-display font-black text-sm transition-all ${language === 'ru' ? 'bg-primary text-background' : 'bg-background border-2 border-primary text-primary hover:bg-primary hover:text-background'}`}
                    >
                        RU
                    </button>
                    <button
                        onClick={() => setLanguage('en')}
                        className={`px-3 py-2 font-display font-black text-sm transition-all ${language === 'en' ? 'bg-primary text-background' : 'bg-background border-2 border-primary text-primary hover:bg-primary hover:text-background'}`}
                    >
                        EN
                    </button>
                </div>

                {step === 1 ? (
                    <div className="space-y-12">
                        <div className="space-y-4">
                            <h2 className="text-5xl font-display font-black tracking-tighter uppercase italic leading-none"
                                dangerouslySetInnerHTML={{ __html: s.step1.h }}
                            />
                            <p className="text-xs font-bold tracking-[0.2em] text-muted-foreground uppercase">
                                {s.step1.p}
                            </p>
                        </div>

                        <div className="border-b-2 border-primary pb-4">
                            <div className="flex items-center gap-4">
                                <span className="text-4xl font-display font-light text-muted-foreground">$</span>
                                <input
                                    autoFocus
                                    type="number"
                                    value={deposit}
                                    onChange={(e) => setDeposit(Number(e.target.value))}
                                    className="bg-transparent border-none text-6xl font-display font-black outline-none w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                            </div>
                        </div>

                        <button
                            onClick={() => setStep(2)}
                            className="w-full bg-primary text-background py-5 font-display font-black uppercase tracking-[0.3em] text-base flex items-center justify-center gap-4 hover:bg-white transition-all group"
                        >
                            {s.next} <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                        </button>
                    </div>
                ) : (
                    <div className="space-y-12">
                        <div className="space-y-4">
                            <h2 className="text-5xl font-display font-black tracking-tighter uppercase italic leading-none"
                                dangerouslySetInnerHTML={{ __html: s.step2.h }}
                            />
                            <p className="text-xs font-bold tracking-[0.2em] text-muted-foreground uppercase">
                                {s.step2.p}
                            </p>
                        </div>

                        <div className="border-b-2 border-primary pb-4">
                            <div className="flex items-center gap-4">
                                <span className="text-4xl font-display font-light text-muted-foreground">$</span>
                                <input
                                    autoFocus
                                    type="number"
                                    value={contribution}
                                    onChange={(e) => setContribution(Number(e.target.value))}
                                    className="bg-transparent border-none text-6xl font-display font-black outline-none w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <button
                                onClick={() => setStep(1)}
                                className="flex-1 border-2 border-border py-5 font-display font-black uppercase tracking-[0.3em] text-sm hover:bg-white hover:text-background transition-all"
                            >
                                {s.back}
                            </button>
                            <button
                                onClick={handleFinish}
                                className="flex-[2] bg-primary text-background py-5 font-display font-black uppercase tracking-[0.3em] text-base flex items-center justify-center gap-4 hover:bg-white transition-all group"
                            >
                                {s.finish} <Sparkles className="group-hover:scale-125 transition-transform" />
                            </button>
                        </div>
                    </div>
                )}

                <div className="mt-12 text-[10px] font-mono text-muted-foreground uppercase tracking-[0.5em] opacity-30">
                    {s.footer}
                </div>
            </div>
        </div>
    );
};
