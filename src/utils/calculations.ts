export interface FinancialDataPoint {
  month: number;
  year: number;
  principal: number;
  interest: number;
  total: number;
}

export interface CalculationResult {
  timeline: FinancialDataPoint[];
  finalBalance: number;
  totalPrincipal: number;
  totalInterest: number;
  multiplier: number;
  monthlyPassiveIncome: number;
}

export const calculateGrowth = (
  initialDeposit: number,
  monthlyContribution: number,
  annualRate: number,
  years: number
): CalculationResult => {
  const months = years * 12;
  const monthlyRate = annualRate / 100 / 12;
  const timeline: FinancialDataPoint[] = [];

  let currentBalance = initialDeposit;
  let currentPrincipal = initialDeposit;

  // Month 0
  timeline.push({
    month: 0,
    year: 0,
    principal: currentPrincipal,
    interest: 0,
    total: currentBalance,
  });

  for (let m = 1; m <= months; m++) {
    currentBalance = (currentBalance + monthlyContribution) * (1 + monthlyRate);
    currentPrincipal += monthlyContribution;

    // We only store yearly data points or quarterly to keep chart performance high, 
    // but for 30-40 years monthly is fine too (480 points).
    if (m % 12 === 0 || m === months) {
      timeline.push({
        month: m,
        year: Math.ceil(m / 12),
        principal: Math.round(currentPrincipal),
        interest: Math.round(currentBalance - currentPrincipal),
        total: Math.round(currentBalance),
      });
    }
  }

  const finalBalance = currentBalance;
  const totalInterest = finalBalance - currentPrincipal;
  const multiplier = finalBalance / currentPrincipal;
  const monthlyPassiveIncome = finalBalance * monthlyRate;

  return {
    timeline,
    finalBalance,
    totalPrincipal: currentPrincipal,
    totalInterest,
    multiplier,
    monthlyPassiveIncome,
  };
};
