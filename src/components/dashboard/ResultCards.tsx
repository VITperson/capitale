import type { CalculationResult } from '../../utils/calculations';

interface ResultCardsProps {
    results: CalculationResult;
}

export const ResultCards = ({ results }: ResultCardsProps) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
            <div className="bg-card border border-border p-8 hover:border-primary transition-colors flex flex-col gap-1">
                <span className="text-[10px] font-black tracking-[0.3em] text-muted-foreground uppercase italic">Итоговый баланс</span>
                <div className="text-4xl font-display font-black tracking-tight text-white">${Math.round(results.finalBalance).toLocaleString()}</div>
            </div>

            <div className="bg-card border border-border p-8 hover:border-primary transition-colors flex flex-col gap-1">
                <span className="text-[10px] font-black tracking-[0.3em] text-muted-foreground uppercase italic">Множитель</span>
                <div className="text-4xl font-display font-black tracking-tight text-primary">{results.multiplier.toFixed(1)}x</div>
            </div>

            <div className="bg-card border border-border p-8 hover:border-primary transition-colors flex flex-col gap-1">
                <span className="text-[10px] font-black tracking-[0.3em] text-muted-foreground uppercase italic">Пассивный доход / мес</span>
                <div className="text-4xl font-display font-black tracking-tight text-white">${Math.round(results.monthlyPassiveIncome).toLocaleString()}</div>
            </div>
        </div>
    );
};

