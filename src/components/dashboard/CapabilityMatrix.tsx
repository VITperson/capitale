import { useState } from 'react';
import {
    Check,
    Lock,
    Zap,
    Tv,
    Dumbbell,
    Droplets,
    ShoppingCart,
    Car,
    Utensils,
    Home,
    Smartphone,
    Palmtree,
    Building2,
    Plane,
    Sparkles,
    Waves,
    Rocket,
    Crown,
    Trophy,
    ArrowRight,
    X,
    TrendingUp,
    Lightbulb,
    Calculator
} from 'lucide-react';
import type { CalculationResult, FinancialDataPoint } from '../../utils/calculations';
import { cn } from '../ui';
import { useLanguage } from '../../context/LanguageContext';

interface CapabilityMatrixProps {
    results: CalculationResult;
    timeline: FinancialDataPoint[];
}

export const CapabilityMatrix = ({ results, timeline }: CapabilityMatrixProps) => {
    const { t, language } = useLanguage();
    const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
    const passiveIncome = results.monthlyPassiveIncome;

    const TIERS = [
        {
            name: t.matrix.tiers.survivability,
            items: [
                { id: 'subscriptions', label: language === 'ru' ? 'Подписки & Сервисы' : 'Digital Subs', cost: 30, icon: Tv },
                { id: 'hobbies', label: language === 'ru' ? 'Хобби & Спорт' : 'Hobbies & Sport', cost: 100, icon: Dumbbell },
                { id: 'utilities', label: language === 'ru' ? 'ЖКХ & Связь' : 'Utilities & Web', cost: 250, icon: Droplets },
                { id: 'groceries', label: language === 'ru' ? 'Качественная еда' : 'Quality Food', cost: 500, icon: ShoppingCart },
            ]
        },
        {
            name: t.matrix.tiers.comfort,
            items: [
                { id: 'car', label: language === 'ru' ? 'Обслуживание авто' : 'Car Maintenance', cost: 600, icon: Car },
                { id: 'dining', label: language === 'ru' ? 'Рестораны & Выходы' : 'Dining out', cost: 800, icon: Utensils },
                { id: 'rent', label: language === 'ru' ? 'Комфортное жилье' : 'Comfort Living', cost: 1500, icon: Home },
                { id: 'gadgets', label: language === 'ru' ? 'Техника & Гаджеты' : 'Tech Updates', cost: 2000, icon: Smartphone },
            ]
        },
        {
            name: t.matrix.tiers.freedom,
            items: [
                { id: 'vacation', label: language === 'ru' ? 'Отдых каждый месяц' : 'Monthly Vacation', cost: 3000, icon: Palmtree },
                { id: 'apartment', label: language === 'ru' ? 'Апартаменты мечты' : 'Dream Apartment', cost: 4500, icon: Building2 },
                { id: 'travel_luxury', label: language === 'ru' ? 'Путешествия 1 класс' : 'First Class Travel', cost: 6000, icon: Plane },
                { id: 'luxury_care', label: language === 'ru' ? 'Здоровье & Self-care' : 'Private Health', cost: 8000, icon: Sparkles },
            ]
        },
        {
            name: t.matrix.tiers.excellence,
            items: [
                { id: 'villa', label: language === 'ru' ? 'Вилла на океане' : 'Oceanfront Villa', cost: 12000, icon: Waves },
                { id: 'jet', label: language === 'ru' ? 'Бизнес авиация' : 'Private Aviation', cost: 25000, icon: Rocket },
                { id: 'legacy', label: language === 'ru' ? 'Семейный фонд' : 'Family Trust', cost: 50000, icon: Crown },
            ]
        }
    ];

    const allItems = TIERS.flatMap(t => t.items);
    const unlockedItems = allItems.filter(item => passiveIncome >= item.cost);
    const progressPercent = Math.round((unlockedItems.length / allItems.length) * 100);

    // Constant for passive income calculation (4% safe withdrawal rate as in calculations.ts)
    // calculations.ts uses results.finalBalance * monthlyRate
    // We can simulate monthlyRate by results.monthlyPassiveIncome / results.finalBalance
    const monthlyRate = results.monthlyPassiveIncome / results.finalBalance;

    const findYearReached = (cost: number) => {
        const point = timeline.find(p => {
            const monthlyPassive = p.total * monthlyRate;
            return monthlyPassive >= cost;
        });
        return point ? point.year : null;
    };

    const selectedItem = allItems.find(i => i.id === selectedItemId);
    const selectedGuide = selectedItemId ? (t.matrix.guides as any)[selectedItemId] : null;

    // Find highest tier fully unlocked
    const currentTierName = [...TIERS].reverse().find(tier =>
        tier.items.every(item => passiveIncome >= item.cost)
    )?.name || TIERS[0].name;

    return (
        <div className="space-y-12">
            {/* Header with Global Progress */}
            <div className="space-y-8 border-b border-border pb-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <h3 className="text-3xl font-display font-black tracking-tight italic uppercase">
                                {t.matrix.title}
                            </h3>
                            <div className="bg-primary/10 border border-primary/20 px-3 py-1 flex items-center gap-2">
                                <Trophy className="w-3 h-3 text-primary" />
                                <span className="text-[10px] font-black text-primary uppercase tracking-widest leading-none">
                                    {currentTierName}
                                </span>
                            </div>
                        </div>
                        <p className="max-w-2xl text-sm font-medium text-white/50 leading-relaxed tracking-tight">
                            {t.matrix.description}
                        </p>
                    </div>

                    <div className="w-full md:w-80 space-y-3">
                        <div className="flex justify-between items-end">
                            <span className="text-[10px] font-black tracking-[0.2em] text-muted-foreground uppercase">
                                {language === 'ru' ? 'ОБЩИЙ ПРОГРЕСС ЖИЗНИ' : 'TOTAL LIFESTYLE PROGRESS'}
                            </span>
                            <span className="text-2xl font-display font-black text-primary">
                                {progressPercent}%
                            </span>
                        </div>
                        <div className="h-2 bg-zinc-900 border border-border overflow-hidden">
                            <div
                                className="h-full bg-primary transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(var(--primary),0.5)]"
                                style={{ width: `${progressPercent}%` }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 items-start relative">
                {/* Master: Card Grid */}
                <div className={cn(
                    "flex-1 space-y-12 transition-all duration-500",
                    selectedItemId ? "lg:w-2/3" : "w-full"
                )}>
                    {TIERS.map((tier, tierIndex) => (
                        <div key={tierIndex} className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
                                <h4 className="text-[10px] font-black tracking-[0.4em] text-muted-foreground uppercase flex items-center gap-3 whitespace-nowrap px-4">
                                    <span className="w-2 h-2 bg-primary/40 rotate-45" />
                                    {tier.name}
                                </h4>
                                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
                            </div>

                            <div className={cn(
                                "grid gap-4 transition-all duration-500",
                                selectedItemId
                                    ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
                                    : "grid-cols-1 md:grid-cols-2 xl:grid-cols-4"
                            )}>
                                {tier.items.map((item, itemIndex) => {
                                    const isUnlocked = passiveIncome >= item.cost;
                                    const progress = Math.min(100, (passiveIncome / item.cost) * 100);
                                    const multiplier = Math.floor(passiveIncome / item.cost);
                                    const yearReached = findYearReached(item.cost);
                                    const Icon = item.icon;
                                    const isSelected = selectedItemId === item.id;

                                    return (
                                        <button
                                            key={item.id}
                                            onClick={() => setSelectedItemId(isSelected ? null : item.id)}
                                            className={cn(
                                                "relative p-6 border transition-all duration-500 overflow-hidden group animate-in fade-in slide-in-from-bottom-4 text-left block w-full",
                                                isUnlocked
                                                    ? isSelected
                                                        ? "bg-primary border-primary shadow-[12px_12px_0px_0px_rgba(var(--primary),0.3)] -translate-y-1"
                                                        : "bg-primary/5 border-primary/30 shadow-[4px_4px_0px_0px_rgba(var(--primary),0.1)] hover:shadow-[12px_12px_0px_0px_rgba(var(--primary),0.2)] hover:-translate-y-1 cursor-pointer"
                                                    : isSelected
                                                        ? "bg-zinc-800 border-white/40 opacity-100"
                                                        : "bg-zinc-900/40 border-border/50 opacity-40 hover:opacity-100 hover:border-border cursor-pointer"
                                            )}
                                            style={{ animationDelay: `${(tierIndex * 4 + itemIndex) * 50}ms` }}
                                        >
                                            {!isUnlocked && (
                                                <div
                                                    className="absolute bottom-0 left-0 h-1 bg-primary/20 transition-all duration-700 ease-out"
                                                    style={{ width: `${progress}%` }}
                                                />
                                            )}

                                            <div className="flex flex-col gap-6 relative z-10">
                                                <div className="flex justify-between items-start">
                                                    <div className={cn(
                                                        "p-3 transition-all duration-500",
                                                        isSelected
                                                            ? isUnlocked ? "bg-background text-primary" : "bg-primary text-background"
                                                            : isUnlocked ? "bg-primary text-background" : "bg-zinc-800 text-muted-foreground"
                                                    )}>
                                                        <Icon className="w-5 h-5" strokeWidth={2.5} />
                                                    </div>

                                                    <div className="flex flex-col items-end gap-1">
                                                        {isUnlocked ? (
                                                            multiplier >= 2 ? (
                                                                <div className={cn(
                                                                    "px-2 py-0.5 text-[10px] font-black uppercase tracking-wider flex items-center gap-1 scale-110",
                                                                    isSelected ? "bg-background text-primary" : "bg-primary text-background"
                                                                )}>
                                                                    <Zap className="w-3 h-3 fill-current" />
                                                                    x{multiplier}
                                                                </div>
                                                            ) : (
                                                                <div className={cn(
                                                                    "w-6 h-6 rounded-full flex items-center justify-center",
                                                                    isSelected ? "bg-background" : "bg-primary"
                                                                )}>
                                                                    <Check className={cn(
                                                                        "w-4 h-4 stroke-[4]",
                                                                        isSelected ? "text-primary" : "text-background"
                                                                    )} />
                                                                </div>
                                                            )
                                                        ) : (
                                                            <Lock className={cn(
                                                                "w-4 h-4",
                                                                isSelected ? "text-white" : "text-muted-foreground/30"
                                                            )} />
                                                        )}

                                                        {yearReached !== null && (
                                                            <span className={cn(
                                                                "text-[8px] font-black uppercase tracking-tighter mt-1",
                                                                isSelected ? "text-background/80" : "text-primary"
                                                            )}>
                                                                {yearReached === 0 ? 'START' : `${t.matrix.milestone}: ${yearReached}`}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="space-y-1">
                                                    <h5 className={cn(
                                                        "text-lg font-display font-black italic uppercase tracking-tight transition-colors",
                                                        isSelected
                                                            ? isUnlocked ? "text-background" : "text-white"
                                                            : isUnlocked ? "text-white" : "text-muted-foreground"
                                                    )}>
                                                        {item.label}
                                                    </h5>
                                                    <div className="flex items-center gap-2">
                                                        <span className={cn(
                                                            "text-xs font-mono font-bold",
                                                            isSelected ? isUnlocked ? "text-background" : "text-primary" : "text-primary"
                                                        )}>
                                                            ${item.cost.toLocaleString()}
                                                        </span>
                                                        <span className={cn(
                                                            "text-[10px] font-black uppercase tracking-widest",
                                                            isSelected ? "text-background/40" : "text-muted-foreground/40"
                                                        )}>
                                                            / {t.inputs.months}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Decorative elements */}
                                            {isUnlocked && (
                                                <div className="absolute top-0 right-0 p-1 opacity-10 group-hover:opacity-20 transition-opacity">
                                                    <Icon className="w-12 h-12 -mr-4 -mt-4 rotate-12" />
                                                </div>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Detail: Goal Sidecar */}
                <div className={cn(
                    "w-full lg:w-[450px] transition-all duration-500 overflow-hidden lg:sticky lg:top-8",
                    selectedItemId ? "opacity-100 max-h-[2000px] visible" : "opacity-0 max-h-0 invisible lg:absolute lg:right-0"
                )}>
                    {selectedItem && selectedGuide && (
                        <div className="bg-zinc-950 border border-primary/30 p-8 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] space-y-12 animate-in slide-in-from-right duration-500">
                            <div className="flex justify-between items-start">
                                <div className="space-y-6">
                                    <div className="p-5 bg-primary text-background inline-block">
                                        <selectedItem.icon className="w-8 h-8" strokeWidth={2.5} />
                                    </div>
                                    <div className="space-y-1">
                                        <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">
                                            {t.matrix.guide_labels.title}
                                        </span>
                                        <h2 className="text-3xl sm:text-4xl font-display font-black italic uppercase tracking-tighter leading-none">
                                            {selectedGuide.title}
                                        </h2>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setSelectedItemId(null)}
                                    className="p-2 hover:bg-white/5 transition-colors border border-border"
                                >
                                    <X className="w-5 h-5 text-white" />
                                </button>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="bg-zinc-900/50 border border-border p-5 space-y-1">
                                    <span className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                                        <Calculator className="w-3 h-3" /> {t.matrix.guide_labels.cost}
                                    </span>
                                    <p className="text-xl font-display font-black text-primary italic leading-none">
                                        ${selectedItem.cost.toLocaleString()}
                                    </p>
                                </div>
                                <div className="bg-zinc-900/50 border border-border p-5 space-y-1">
                                    <span className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                                        <TrendingUp className="w-3 h-3" /> {t.matrix.guide_labels.target}
                                    </span>
                                    <p className="text-xl font-display font-black text-white italic leading-none text-right">
                                        {findYearReached(selectedItem.cost) !== null ? `${t.matrix.guide_labels.year} ${findYearReached(selectedItem.cost)}` : '??'}
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-8">
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-6 h-px bg-primary/30" />
                                        <span className="text-[9px] font-black text-white uppercase tracking-[0.2em]">{t.matrix.guide_labels.math}</span>
                                    </div>
                                    <p className="text-xs sm:text-sm text-white/70 font-medium leading-relaxed italic border-l-2 border-primary/20 pl-4">
                                        {selectedGuide.math}
                                    </p>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-6 h-px bg-primary/30" />
                                        <span className="text-[9px] font-black text-white uppercase tracking-[0.2em]">{t.matrix.guide_labels.strategy}</span>
                                    </div>
                                    <p className="text-xs sm:text-sm text-white/80 font-medium leading-relaxed">
                                        {selectedGuide.strategy}
                                    </p>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-6 h-px bg-primary/30" />
                                        <span className="text-[9px] font-black text-white uppercase tracking-[0.2em]">{t.matrix.guide_labels.inspiration}</span>
                                    </div>
                                    <div className="relative p-6 bg-zinc-900 border border-border overflow-hidden group">
                                        <Lightbulb className="absolute top-1 right-1 w-12 h-12 text-primary/5 -rotate-12 group-hover:text-primary/10 transition-colors" />
                                        <p className="text-sm sm:text-base font-display font-bold text-white relative z-10 leading-tight">
                                            "{selectedGuide.inspiration}"
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => setSelectedItemId(null)}
                                className="w-full py-4 bg-white text-black font-display font-black italic uppercase tracking-widest hover:bg-primary transition-colors flex items-center justify-center gap-3 group text-xs sm:text-sm"
                            >
                                {t.matrix.guide_labels.back}
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
