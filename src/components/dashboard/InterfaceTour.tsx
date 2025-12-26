import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { Terminal, ChevronRight, Check } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface TourStep {
    targetId: string;
    title: string;
    content: string;
    preferredPosition?: 'top' | 'bottom' | 'left' | 'right';
}

export const InterfaceTour = ({ onComplete }: { onComplete: () => void }) => {
    const { t, language } = useLanguage();
    const [currentStep, setCurrentStep] = useState(0);
    const [coords, setCoords] = useState({ top: 0, left: 0, width: 0, height: 0 });
    const [tooltipPos, setTooltipPos] = useState({ top: 0, left: 0 });
    const tooltipRef = useRef<HTMLDivElement>(null);

    const STEPS: TourStep[] = useMemo(() => [
        {
            targetId: 'tour-parameters',
            title: t.tour.steps[0].title,
            content: t.tour.steps[0].content,
        },
        {
            targetId: 'tour-results',
            title: t.tour.steps[1].title,
            content: t.tour.steps[1].content,
        },
        {
            targetId: 'tour-chart',
            title: t.tour.steps[2].title,
            content: t.tour.steps[2].content,
            preferredPosition: 'left'
        },
        {
            targetId: 'tour-lifestyle',
            title: t.tour.steps[3].title,
            content: t.tour.steps[3].content,
            preferredPosition: 'top'
        }
    ], [t, language]);

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

        // Simple Position Logic
        const tooltipWidth = 320;
        const tooltipHeight = tooltipRef.current?.offsetHeight || 320;
        const gap = 24;

        let left = newCoords.left + (newCoords.width / 2) - (tooltipWidth / 2);
        let top: number;

        // Step-specific forcing
        const isStep4 = STEPS[currentStep].targetId === 'tour-lifestyle';
        const isStep3 = STEPS[currentStep].targetId === 'tour-chart';

        if (isStep4) {
            // Force ABOVE for step 4 as requested
            top = newCoords.top - tooltipHeight - gap;
        } else if (isStep3) {
            // Force LEFT for step 3 as requested before
            left = newCoords.left - tooltipWidth - gap;
            top = newCoords.top;
        } else {
            // Default: Below
            top = newCoords.top + newCoords.height + gap;
        }

        // Safety: Keep horizontal in bounds
        if (left < 20) left = 20;
        if (left + tooltipWidth > window.innerWidth - 20) left = window.innerWidth - tooltipWidth - 20;

        setTooltipPos({ top, left });

        // Simple Scroll Logic
        if (isStep4) {
            // Scroll so target is well below the top to make room for tooltip
            const elementTop = target.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({
                top: elementTop - tooltipHeight - 100,
                behavior: 'smooth'
            });
        } else {
            target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, [currentStep, STEPS, tooltipRef]);

    useEffect(() => {
        // Small delay to ensure the DOM is updated and tooltip height is available
        const timer = setTimeout(() => {
            updatePosition();
        }, 100);

        window.addEventListener('resize', updatePosition);
        return () => {
            clearTimeout(timer);
            window.removeEventListener('resize', updatePosition);
        };
    }, [currentStep, updatePosition]);

    const handleNext = () => {
        if (currentStep < STEPS.length - 1) {
            setCurrentStep(s => s + 1);
        } else {
            onComplete();
        }
    };

    return (
        <div className="fixed inset-0 z-[100] overflow-hidden pointer-events-none">
            <div
                className="absolute border-4 border-primary transition-all duration-500 ease-in-out shadow-[0_0_0_9999px_rgba(10,10,11,0.85)] z-[101]"
                style={{
                    top: coords.top,
                    left: coords.left,
                    width: coords.width,
                    height: coords.height,
                }}
            />

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
                                {language === 'ru' ? 'Шаг' : 'Step'}_{currentStep + 1}
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
                                <>{t.tour.finish} <Check className="w-4 h-4" /></>
                            ) : (
                                <>{t.tour.next} <ChevronRight className="w-4 h-4" /></>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
