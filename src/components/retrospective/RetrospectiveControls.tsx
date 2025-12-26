import { SliderInput } from '../ui';
import { MARKET_DATA } from '../../utils/marketData';
import type { RetrospectiveInputs } from '../../hooks/useRetrospectiveEngine';
import { useLanguage } from '../../context/LanguageContext';

interface RetrospectiveControlsProps {
    inputs: RetrospectiveInputs;
    onUpdate: (key: keyof RetrospectiveInputs, value: any) => void;
}

export const RetrospectiveControls = ({ inputs, onUpdate }: RetrospectiveControlsProps) => {
    const { t, language } = useLanguage();

    const categories = ['Indices', 'Tech', 'Crypto', 'Commodities', 'Finance', 'Consumer'];

    return (
        <div className="neo-card space-y-10">
            <div className="flex items-center gap-3 mb-8">
                <h2 className="text-3xl font-display font-black tracking-tighter uppercase italic">
                    {t.retro.controls_title}
                </h2>
            </div>

            <div className="space-y-10">
                <div className="space-y-4">
                    <label className="text-[10px] font-black tracking-[0.3em] text-muted-foreground uppercase italic px-1">
                        {t.retro.asset_select}
                    </label>
                    <div className="relative group">
                        <select
                            value={inputs.asset}
                            onChange={(e) => onUpdate('asset', e.target.value)}
                            className="w-full bg-background border-2 border-border p-5 font-display font-black uppercase tracking-widest text-lg appearance-none cursor-pointer hover:border-primary transition-all focus:outline-none focus:border-primary text-white"
                        >
                            {categories.map((category) => (
                                <optgroup
                                    key={category}
                                    label={(t.categories as any)[category] || category}
                                    className="bg-background font-bold text-primary"
                                >
                                    {Object.values(MARKET_DATA)
                                        .filter((asset: any) => asset.category === category)
                                        .map((asset: any) => (
                                            <option key={asset.symbol} value={asset.symbol} className="bg-background text-white font-normal">
                                                {asset.symbol} — {asset.name}
                                            </option>
                                        ))
                                    }
                                </optgroup>
                            ))}
                        </select>
                        <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none z-20">
                            <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </div>

                <SliderInput
                    label={t.retro.years_back}
                    value={inputs.years}
                    min={1}
                    max={30}
                    suffix={` ${t.inputs.years}`}
                    onChange={(val) => onUpdate('years', Math.min(val, 30))}
                />

                <SliderInput
                    label={t.retro.initial}
                    value={inputs.initialDeposit}
                    min={0}
                    max={100000}
                    step={1000}
                    prefix="$"
                    onChange={(val) => onUpdate('initialDeposit', val)}
                />

                <SliderInput
                    label={t.retro.monthly}
                    value={inputs.monthlyContribution}
                    min={0}
                    max={10000}
                    step={100}
                    prefix="$"
                    onChange={(val) => onUpdate('monthlyContribution', val)}
                />
            </div>

            <div className="mt-12 pt-8 border-t border-border/50">
                <p className="text-[10px] text-muted-foreground uppercase leading-relaxed font-bold tracking-widest">
                    {language === 'ru'
                        ? 'Анализ реальных рыночных данных за указанный период. Включает волатильность и реальную доходность актива.'
                        : 'Real market data analysis for the specified period. Includes volatility and actual asset returns.'}
                </p>
            </div>
        </div>
    );
};
