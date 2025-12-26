import { useState, useMemo } from 'react';
import { MARKET_DATA } from '../utils/marketData';

export interface RetrospectivePoint {
    date: string;
    value: number;
    invested: number;
}

export interface RetrospectiveResult {
    timeline: RetrospectivePoint[];
    finalValue: number;
    totalInvested: number;
    multiplier: number;
    profit: number;
}

export interface RetrospectiveInputs {
    asset: string;
    years: number;
    initialDeposit: number;
    monthlyContribution: number;
}

export const useRetrospectiveEngine = (initialInputs: RetrospectiveInputs) => {
    const [inputs, setInputs] = useState(initialInputs);

    const results = useMemo((): RetrospectiveResult => {
        const assetMeta = MARKET_DATA[inputs.asset];
        const historicalPrices = assetMeta?.prices || [];

        if (historicalPrices.length === 0) {
            return { timeline: [], finalValue: 0, totalInvested: 0, multiplier: 0, profit: 0 };
        }

        const monthsNeeded = inputs.years * 12;
        // Get the last N months that we have
        const prices = historicalPrices.slice(-monthsNeeded);

        if (prices.length === 0) {
            return { timeline: [], finalValue: 0, totalInvested: 0, multiplier: 0, profit: 0 };
        }

        const timeline: RetrospectivePoint[] = [];
        let sharesOwned = 0;
        let totalInvested = 0;

        // Start with initial deposit at the first month's price
        totalInvested = inputs.initialDeposit;
        const initialPrice = prices[0].price;
        sharesOwned = totalInvested / initialPrice;

        timeline.push({
            date: prices[0].date,
            value: Math.round(totalInvested),
            invested: totalInvested
        });

        for (let i = 1; i < prices.length; i++) {
            const currentMonthPrice = prices[i].price;

            // Buy more shares with monthly contribution
            totalInvested += inputs.monthlyContribution;
            sharesOwned += inputs.monthlyContribution / currentMonthPrice;

            timeline.push({
                date: prices[i].date,
                value: Math.round(sharesOwned * currentMonthPrice),
                invested: totalInvested
            });
        }

        const lastPrice = prices[prices.length - 1].price;
        const finalValue = Math.round(sharesOwned * lastPrice);
        const profit = finalValue - totalInvested;
        const multiplier = totalInvested > 0 ? finalValue / totalInvested : 0;

        return {
            timeline,
            finalValue,
            totalInvested,
            multiplier,
            profit
        };
    }, [inputs]);

    const updateInput = (key: keyof RetrospectiveInputs, value: any) => {
        setInputs(prev => ({ ...prev, [key]: value }));
    };

    // isLoading and error are now always false/null since data is local
    return { inputs, results, updateInput, isLoading: false, error: null };
};
