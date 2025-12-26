import type { FinancialInputs } from '../../hooks/useFinancialEngine';
import { SliderInput } from '../ui';
import { useLanguage } from '../../context/LanguageContext';

interface InputPanelProps {
    inputs: FinancialInputs;
    onUpdate: (key: keyof FinancialInputs, value: number) => void;
}

export const InputPanel = ({ inputs, onUpdate }: InputPanelProps) => {
    const { t } = useLanguage();

    return (
        <div className="neo-card space-y-6">
            <div className="flex items-center gap-3 mb-4">
                <h2 className="text-2xl font-display font-bold tracking-tight uppercase">
                    {t.inputs.parameters}
                </h2>
            </div>

            <div className="space-y-6">
                <SliderInput
                    label={t.inputs.initial_deposit}
                    value={inputs.initialDeposit}
                    min={0}
                    max={1000000}
                    step={1000}
                    prefix="$"
                    onChange={(val) => onUpdate('initialDeposit', val)}
                />

                <SliderInput
                    label={t.inputs.monthly_contribution}
                    value={inputs.monthlyContribution}
                    min={0}
                    max={50000}
                    step={100}
                    prefix="$"
                    onChange={(val) => onUpdate('monthlyContribution', val)}
                />

                <SliderInput
                    label={t.inputs.annual_rate}
                    value={inputs.annualRate}
                    min={0}
                    max={30}
                    step={0.1}
                    suffix="%"
                    onChange={(val) => onUpdate('annualRate', val)}
                />

                <SliderInput
                    label={t.inputs.duration}
                    value={inputs.years}
                    min={1}
                    max={50}
                    suffix={` ${t.inputs.years}`}
                    onChange={(val) => onUpdate('years', val)}
                />
            </div>
        </div>
    );
};
