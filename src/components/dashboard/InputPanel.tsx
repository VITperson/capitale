import type { FinancialInputs } from '../../hooks/useFinancialEngine';
import { SliderInput } from '../ui';

interface InputPanelProps {
    inputs: FinancialInputs;
    onUpdate: (key: keyof FinancialInputs, value: number) => void;
}

export const InputPanel = ({ inputs, onUpdate }: InputPanelProps) => {
    return (
        <div className="neo-card space-y-10">
            <div className="flex items-center gap-3 mb-8">
                <h2 className="text-3xl font-display font-black tracking-tighter uppercase italic">
                    Параметры
                </h2>
            </div>

            <div className="space-y-10">
                <SliderInput
                    label="Стартовый капитал"
                    value={inputs.initialDeposit}
                    min={0}
                    max={1000000}
                    step={1000}
                    prefix="$"
                    onChange={(val) => onUpdate('initialDeposit', val)}
                />

                <SliderInput
                    label="Взнос / Месяц"
                    value={inputs.monthlyContribution}
                    min={0}
                    max={50000}
                    step={100}
                    prefix="$"
                    onChange={(val) => onUpdate('monthlyContribution', val)}
                />

                <SliderInput
                    label="Доходность (Годовая)"
                    value={inputs.annualRate}
                    min={0}
                    max={30}
                    step={0.1}
                    suffix="%"
                    onChange={(val) => onUpdate('annualRate', val)}
                />

                <SliderInput
                    label="Горизонт планирования"
                    value={inputs.years}
                    min={1}
                    max={50}
                    suffix=" лет"
                    onChange={(val) => onUpdate('years', val)}
                />
            </div>
        </div>
    );
};
