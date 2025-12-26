import type { RetrospectiveResult } from '../../hooks/useRetrospectiveEngine';
import { useLanguage } from '../../context/LanguageContext';

interface RetrospectiveResultsProps {
    results: RetrospectiveResult;
}

export const RetrospectiveResults = ({ results }: RetrospectiveResultsProps) => {
    const { t } = useLanguage();

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
            <div className="bg-card border border-border p-8 hover:border-primary transition-colors flex flex-col gap-1">
                <span className="text-[10px] font-black tracking-[0.3em] text-muted-foreground uppercase italic">
                    {t.retro.results.current_value}
                </span>
                <div className="text-4xl font-display font-black tracking-tight text-white">
                    ${results.finalValue.toLocaleString()}
                </div>
            </div>

            <div className="bg-card border border-border p-8 hover:border-primary transition-colors flex flex-col gap-1">
                <span className="text-[10px] font-black tracking-[0.3em] text-muted-foreground uppercase italic">
                    {t.retro.results.multiplier}
                </span>
                <div className="text-4xl font-display font-black tracking-tight text-primary">
                    {results.multiplier.toFixed(2)}x
                </div>
            </div>

            <div className="bg-card border border-border p-8 hover:border-primary transition-colors flex flex-col gap-1">
                <span className="text-[10px] font-black tracking-[0.3em] text-muted-foreground uppercase italic">
                    {t.retro.results.profit}
                </span>
                <div className="text-4xl font-display font-black tracking-tight text-white">
                    ${results.profit.toLocaleString()}
                </div>
            </div>
        </div>
    );
};
