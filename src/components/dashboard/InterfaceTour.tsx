import { useState, useEffect, useCallback, useRef } from 'react';
import { Terminal, ChevronRight, Check } from 'lucide-react';

interface TourStep {
    targetId: string;
    title: string;
    content: string;
}

const STEPS: TourStep[] = [
    {
        targetId: 'tour-parameters',
        title: 'Векторы Ввода',
        content: 'Здесь вы настраиваете свои финансовые параметры. Используйте слайдеры для быстрой настройки или вводите значения напрямую для прецизионной калибровки.',
    },
    {
        targetId: 'tour-results',
        title: 'Метрики Вывода',
        content: 'Мгновенный анализ вашей траектории. Множитель показывает, во сколько раз ваши усилия (депозиты) были усилены протоколом.',
    },
    {
        targetId: 'tour-chart',
        title: 'Матрица Роста',
        content: 'Визуализация временного эффекта сложного процента. Темные зоны — это ваши вложения; Изумрудные зоны — автономный рост капитала.',
    },
    {
        targetId: 'tour-lifestyle',
        title: 'Матрица возможностей',
        content: 'Ваш уровень финансовой свободы. По мере роста пассивного дохода категории будут разблокироваться автоматически. Следите за прогресс-барами!',
    }
];

export const InterfaceTour = ({ onComplete }: { onComplete: () => void }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [coords, setCoords] = useState({ top: 0, left: 0, width: 0, height: 0 });
    const [tooltipPos, setTooltipPos] = useState({ top: 0, left: 0 });
    const tooltipRef = useRef<HTMLDivElement>(null);

    const updatePosition = useCallback(() => {
        const target = document.getElementById(STEPS[currentStep].targetId);
        if (!target) return;

        const rect = target.getBoundingClientRect();
        const padding = 12;

        const newCoords = {
            top: rect.top - padding,
            left: rect.left - padding,
            width: rect.width + padding * 2,
            height: rect.height + padding * 2,
        };

        setCoords(newCoords);

        // Calculate Tooltip Position
        const tooltipWidth = 320;
        const tooltipHeight = 280; // Estimated max height
        const gap = 32;

        let left: number;
        let top: number;

        // 1. Try Right Placement (if element is on the left half)
        if (newCoords.left + newCoords.width + tooltipWidth + gap < window.innerWidth - 20) {
            left = newCoords.left + newCoords.width + gap;
            top = newCoords.top - 120;
        }
        // 2. Try Left Placement (if element is on the right half, like the chart)
        else if (newCoords.left - tooltipWidth - gap > 20) {
            left = newCoords.left - tooltipWidth - gap;
            top = newCoords.top + 40;
        }
        // 3. Fallback: Top/Bottom Placement
        else {
            left = newCoords.left + (newCoords.width / 2) - (tooltipWidth / 2);
            top = newCoords.top + newCoords.height + gap;

            // Vertical flip if bottom overflow
            if (top + tooltipHeight > window.innerHeight + window.scrollY - 20) {
                top = newCoords.top - tooltipHeight - gap;
            }
        }

        // Final boundary safety (Global)
        if (left < 20) left = 20;
        if (left + tooltipWidth > window.innerWidth - 20) left = window.innerWidth - tooltipWidth - 20;
        if (top < window.scrollY + 20) top = window.scrollY + 20;
        if (top + tooltipHeight > document.documentElement.scrollHeight - 20) {
            top = document.documentElement.scrollHeight - tooltipHeight - 20;
        }

        setTooltipPos({ top, left });

        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, [currentStep]);

    useEffect(() => {
        updatePosition();
        window.addEventListener('resize', updatePosition);
        window.addEventListener('scroll', updatePosition);

        return () => {
            window.removeEventListener('resize', updatePosition);
            window.removeEventListener('scroll', updatePosition);
        };
    }, [updatePosition]);

    const handleNext = () => {
        if (currentStep < STEPS.length - 1) {
            setCurrentStep(s => s + 1);
        } else {
            onComplete();
        }
    };

    return (
        <div className="fixed inset-0 z-[100] overflow-hidden pointer-events-none">
            {/* Dimmed Background Overlay using Box Shadow Punch-out */}
            <div
                className="absolute border-4 border-primary transition-all duration-500 ease-in-out shadow-[0_0_0_9999px_rgba(10,10,11,0.85)] z-[101]"
                style={{
                    top: coords.top,
                    left: coords.left,
                    width: coords.width,
                    height: coords.height,
                }}
            />

            {/* Tooltip */}
            <div
                ref={tooltipRef}
                className="absolute pointer-events-auto transition-all duration-500 ease-in-out w-80 z-[102]"
                style={{
                    top: tooltipPos.top,
                    left: tooltipPos.left,
                }}
            >
                <div className="bg-background border-2 border-primary p-8 shadow-[12px_12px_0px_0px_rgba(var(--primary),0.3)]">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2">
                            <Terminal className="w-4 h-4 text-primary" strokeWidth={3} />
                            <span className="text-[10px] font-black tracking-[0.4em] text-primary uppercase">
                                Шаг_{currentStep + 1}
                            </span>
                        </div>
                        <span className="text-[10px] font-mono text-muted-foreground">[{currentStep + 1}/{STEPS.length}]</span>
                    </div>

                    <h3 className="text-2xl font-display font-black italic uppercase tracking-tighter mb-4 text-white">
                        {STEPS[currentStep].title}
                    </h3>
                    <p className="text-xs leading-relaxed text-muted-foreground font-medium mb-8">
                        {STEPS[currentStep].content}
                    </p>

                    <div className="flex justify-between items-center pt-6 border-t border-border/50">
                        <div className="flex gap-2">
                            {STEPS.map((_, i) => (
                                <div
                                    key={i}
                                    className={`h-1.5 transition-all duration-500 ${i === currentStep ? 'w-6 bg-primary' : 'w-2 bg-zinc-800'}`}
                                />
                            ))}
                        </div>
                        <button
                            onClick={handleNext}
                            className="bg-primary text-background px-6 py-2 font-display font-black uppercase text-xs tracking-widest flex items-center gap-2 hover:bg-white transition-all transform active:scale-95 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]"
                        >
                            {currentStep === STEPS.length - 1 ? (
                                <>Начать <Check className="w-4 h-4" /></>
                            ) : (
                                <>Далее <ChevronRight className="w-4 h-4" /></>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
