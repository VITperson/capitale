import type { CalculationResult } from '../../utils/calculations';
import { useLanguage } from '../../context/LanguageContext';

interface ResultCardsProps {
    results: CalculationResult;
}

export const ResultCards = ({ results }: ResultCardsProps) => {
    const { t } = useLanguage();

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
            <div className="bg-card border border-border p-6 hover:border-primary transition-colors flex flex-col gap-1">
                <span className="text-[10px] font-bold tracking-[0.2em] text-muted-foreground uppercase">
                    {t.results.final_amount}
                </span>
                <div className="text-4xl font-display font-bold tracking-tight text-white">
                    ${Math.round(results.finalBalance).toLocaleString()}
                </div>
            </div>

            <div className="bg-card border border-border p-6 hover:border-primary transition-colors flex flex-col gap-1">
                <span className="text-[10px] font-bold tracking-[0.2em] text-muted-foreground uppercase">
                    {t.results.total_invested}
                </span>
                <div className="text-4xl font-display font-bold tracking-tight text-primary">
                    ${Math.round(results.totalPrincipal).toLocaleString()}
                </div>
            </div>

            <div className="bg-card border border-border p-6 hover:border-primary transition-colors flex flex-col gap-2">
                <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold tracking-[0.2em] text-muted-foreground uppercase">
                        {t.results.passive_income}
                    </span>
                    <div className="text-4xl font-display font-bold tracking-tight text-white">
                        ${Math.round(results.monthlyPassiveIncome).toLocaleString()}
                    </div>
                </div>
                <p className="text-[9px] font-medium text-white/30 tracking-wider leading-tight">
                    {t.results.passive_income_desc_1}
                </p>
            </div>
        </div>
    );
};

