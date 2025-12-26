import { Check, Lock, Zap } from 'lucide-react';
import type { CalculationResult } from '../../utils/calculations';
import { cn } from '../ui';

interface CapabilityMatrixProps {
    results: CalculationResult;
}


const TIERS = [
    {
        name: "Базовый уровень",
        items: [
            { id: 'netflix', label: 'Цифровые сервисы', cost: 15 },
            { id: 'gym', label: 'Фитнес & Спорт', cost: 50 },
            { id: 'internet', label: 'Связь & Интернет', cost: 100 },
            { id: 'groceries', label: 'Продуктовая корзина', cost: 300 },
        ]
    },
    {
        name: "Комфорт",
        items: [
            { id: 'utilities', label: 'Коммунальные услуги', cost: 200 },
            { id: 'car', label: 'Транспорт / Авто', cost: 500 },
            { id: 'rent_room', label: 'Аренда жилья', cost: 1000 },
        ]
    },
    {
        name: "Свобода",
        items: [
            { id: 'rent_apt', label: 'Премиум апартаменты', cost: 2000 },
            { id: 'travel', label: 'Путешествия', cost: 3000 },
            { id: 'luxury', label: 'Luxury Life', cost: 5000 },
        ]
    }
];

export const CapabilityMatrix = ({ results }: CapabilityMatrixProps) => {
    const passiveIncome = results.monthlyPassiveIncome;

    return (
        <div className="space-y-12">
            <div className="flex items-baseline justify-between border-b border-border pb-4">
                <h3 className="text-3xl font-display font-black italic uppercase tracking-tighter">
                    Матрица возможностей
                </h3>
                <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold tracking-[0.2em] text-muted-foreground uppercase opacity-50">
                        STATUS:
                    </span>
                    <span className="text-[10px] font-bold tracking-[0.2em] text-primary uppercase animate-pulse">
                        LIVE_TRACKING
                    </span>
                </div>
            </div>

            <div className="space-y-16">
                {TIERS.map((tier, tierIndex) => (
                    <div key={tierIndex} className="space-y-6">
                        <h4 className="text-[10px] font-bold tracking-[0.4em] text-muted-foreground uppercase flex items-center gap-4">
                            <span className="w-2 h-2 bg-primary/50 rotate-45" />
                            {tier.name}
                        </h4>

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                            {tier.items.map((item) => {
                                const isUnlocked = passiveIncome >= item.cost;
                                const progress = Math.min(100, (passiveIncome / item.cost) * 100);
                                const multiplier = Math.floor(passiveIncome / item.cost);

                                return (
                                    <div
                                        key={item.id}
                                        className={cn(
                                            "relative p-6 border transition-all duration-500 overflow-hidden group",
                                            isUnlocked
                                                ? "bg-primary/5 border-primary shadow-[4px_4px_0px_0px_rgba(var(--primary),0.2)]"
                                                : "bg-zinc-900/20 border-border/30 opacity-60 hover:opacity-100"
                                        )}
                                    >
                                        {/* Progress Bar Background for Locked Items */}
                                        {!isUnlocked && (
                                            <div
                                                className="absolute bottom-0 left-0 h-1 bg-primary/30 transition-all duration-700 ease-out"
                                                style={{ width: `${progress}%` }}
                                            />
                                        )}

                                        <div className="flex justify-between items-center relative z-10">
                                            <div className="flex flex-col gap-1">
                                                <span className={cn(
                                                    "text-lg font-display font-bold uppercase tracking-wide transition-colors",
                                                    isUnlocked ? "text-white" : "text-muted-foreground"
                                                )}>
                                                    {item.label}
                                                </span>
                                                <span className="text-xs font-mono text-muted-foreground">
                                                    ${item.cost}/мес
                                                </span>
                                            </div>

                                            <div className="flex items-center gap-3">
                                                {isUnlocked ? (
                                                    multiplier >= 2 ? (
                                                        <div className="flex items-center gap-2">
                                                            <div className="bg-primary text-background px-2 py-1 text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
                                                                <Zap className="w-3 h-3 fill-current" />
                                                                x{multiplier}
                                                            </div>
                                                            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                                                                <Check className="w-5 h-5 text-background stroke-[4]" />
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-[10px] font-bold tracking-widest text-primary uppercase">Покрыто</span>
                                                            <div className="w-8 h-8 border-2 border-primary rounded-full flex items-center justify-center">
                                                                <Check className="w-4 h-4 text-primary stroke-[3]" />
                                                            </div>
                                                        </div>
                                                    )
                                                ) : (
                                                    <div className="flex items-center gap-2 text-muted-foreground/50">
                                                        <span className="text-[10px] font-bold tracking-widest uppercase hidden group-hover:block transition-all">
                                                            {Math.round(progress)}%
                                                        </span>
                                                        <Lock className="w-5 h-5" />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
