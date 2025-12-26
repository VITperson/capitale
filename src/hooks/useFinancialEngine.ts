import { useState, useMemo } from 'react';
import { calculateGrowth } from '../utils/calculations';
import type { CalculationResult } from '../utils/calculations';

export interface FinancialInputs {
    initialDeposit: number;
    monthlyContribution: number;
    annualRate: number;
    years: number;
}

export const useFinancialEngine = (initialInputs: FinancialInputs) => {
    const [inputs, setInputs] = useState<FinancialInputs>(initialInputs);

    const results: CalculationResult = useMemo(() => {
        return calculateGrowth(
            inputs.initialDeposit,
            inputs.monthlyContribution,
            inputs.annualRate,
            inputs.years
        );
    }, [inputs]);

    const updateInput = (key: keyof FinancialInputs, value: number) => {
        setInputs((prev) => ({ ...prev, [key]: value }));
    };

    return {
        inputs,
        results,
        updateInput,
    };
};
