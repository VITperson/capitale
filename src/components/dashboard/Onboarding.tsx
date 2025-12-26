import { useState } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

interface OnboardingProps {
    onComplete: (initialDeposit: number, monthlyContribution: number) => void;
}

export const Onboarding = ({ onComplete }: OnboardingProps) => {
    const [step, setStep] = useState(1);
    const [deposit, setDeposit] = useState(10000);
    const [contribution, setContribution] = useState(1000);

    const handleFinish = () => {
        onComplete(deposit, contribution);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm p-6">
            <div className="max-w-xl w-full border-4 border-primary p-12 bg-background shadow-[16px_16px_0px_0px_rgba(var(--primary),0.1)] relative">
                <div className="absolute -top-6 -left-6 bg-primary text-background px-4 py-2 font-display font-black italic uppercase text-xl">
                    Инициализация_Протокола
                </div>

                {step === 1 ? (
                    <div className="space-y-12">
                        <div className="space-y-4">
                            <h2 className="text-5xl font-display font-black tracking-tighter uppercase italic leading-none">
                                Текущая <br />ликвидность
                            </h2>
                            <p className="text-xs font-bold tracking-[0.2em] text-muted-foreground uppercase">
                                С какого капитала вы начинаете сегодня?
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
                            className="w-full bg-primary text-background py-6 font-display font-black uppercase tracking-widest text-xl flex items-center justify-center gap-4 hover:bg-white transition-colors group"
                        >
                            Следующий шаг <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                        </button>
                    </div>
                ) : (
                    <div className="space-y-12">
                        <div className="space-y-4">
                            <h2 className="text-5xl font-display font-black tracking-tighter uppercase italic leading-none">
                                Месячная <br />скорость
                            </h2>
                            <p className="text-xs font-bold tracking-[0.2em] text-muted-foreground uppercase">
                                Сумма, которую вы готовы вносить каждые 30 дней.
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
                                className="flex-1 border-2 border-border py-6 font-display font-bold uppercase tracking-widest hover:bg-zinc-900 transition-colors"
                            >
                                Назад
                            </button>
                            <button
                                onClick={handleFinish}
                                className="flex-[2] bg-primary text-background py-6 font-display font-black uppercase tracking-widest text-xl flex items-center justify-center gap-4 hover:bg-white transition-colors group"
                            >
                                Спрогнозировать <Sparkles className="group-hover:scale-125 transition-transform" />
                            </button>
                        </div>
                    </div>
                )}

                <div className="mt-12 text-[10px] font-mono text-muted-foreground uppercase tracking-[0.5em] opacity-30">
                    доступ_подтвержден // сбор_данных
                </div>
            </div>
        </div>
    );
};
