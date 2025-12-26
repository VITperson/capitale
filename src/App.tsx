import { useState, useEffect } from 'react';
import { useFinancialEngine } from './hooks/useFinancialEngine';
import { InputPanel } from './components/dashboard/InputPanel';
import { GrowthChart } from './components/dashboard/GrowthChart';
import { ResultCards } from './components/dashboard/ResultCards';
import { Onboarding } from './components/dashboard/Onboarding';
import { InterfaceTour } from './components/dashboard/InterfaceTour';
import { CapabilityMatrix } from './components/dashboard/CapabilityMatrix';

function App() {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showTour, setShowTour] = useState(false);

  const { inputs, results, updateInput } = useFinancialEngine({
    initialDeposit: 10000,
    monthlyContribution: 1000,
    annualRate: 7,
    years: 20,
  });

  useEffect(() => {
    const hasCompletedOnboarding = localStorage.getItem('capitale_onboarding_v1');
    const hasCompletedTour = localStorage.getItem('capitale_tour_v1');

    if (!hasCompletedOnboarding) {
      setShowOnboarding(true);
    } else if (!hasCompletedTour) {
      setShowTour(true);
    }
  }, []);

  const handleOnboardingComplete = (deposit: number, contribution: number) => {
    updateInput('initialDeposit', deposit);
    updateInput('monthlyContribution', contribution);
    setShowOnboarding(false);
    localStorage.setItem('capitale_onboarding_v1', 'true');
    setShowTour(true);
  };

  const handleTourComplete = () => {
    setShowTour(false);
    localStorage.setItem('capitale_tour_v1', 'true');
  };

  return (
    <div className="min-h-screen bg-background border-8 border-background selection:bg-primary/40 selection:text-white">
      {showOnboarding && <Onboarding onComplete={handleOnboardingComplete} />}
      {showTour && <InterfaceTour onComplete={handleTourComplete} />}

      {/* Brutalist Header */}
      <header className="border-b border-border mb-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between py-12 px-6 lg:px-12">
          <div className="space-y-1 mb-6 md:mb-0">
            <h1 className="text-6xl font-display font-black tracking-tighter uppercase italic leading-[0.8]">
              Capitale
            </h1>
            <p className="text-[10px] font-bold tracking-[0.4em] text-muted-foreground uppercase pl-1">
              Wealth Strategy Protocol / v1.0.4
            </p>
          </div>
          <div className="text-right flex flex-col items-end">
            <div className="text-xs font-mono text-primary mb-1">СТАТУС: ОПТИМИЗАЦИЯ</div>
            <div className="bg-primary text-background px-4 py-1 font-bold text-[10px] tracking-widest uppercase">
              Живая проекция
            </div>
          </div>
        </div>
      </header>

      <main className="px-6 lg:px-12 pb-24 space-y-1">
        {/* Top Section: Inputs + Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-px bg-border">
          {/* Left Block: Controls (Sticky within this row) */}
          <div className="lg:col-span-4 bg-background p-px py-1">
            <div className="lg:sticky lg:top-12">
              <div id="tour-parameters">
                <InputPanel inputs={inputs} onUpdate={updateInput} />
              </div>
            </div>
          </div>

          {/* Right Block: Results & Growth Chart */}
          <div className="lg:col-span-8 bg-background p-px py-1 space-y-1">
            <div id="tour-results">
              <ResultCards results={results} />
            </div>
            <div id="tour-chart">
              <GrowthChart data={results.timeline} />
            </div>
          </div>
        </div>

        {/* Bottom Section: Full Width Capability Matrix */}
        <div className="bg-border">
          <div id="tour-lifestyle" className="bg-background p-12 lg:p-16">
            <CapabilityMatrix results={results} />
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-background pt-12 text-muted-foreground">
          <p className="text-[10px] font-bold tracking-[0.2em] leading-relaxed max-w-lg uppercase">
            Сложный процент — это функция времени и дисциплины. Визуализация выше аппроксимирует потенциальную
            доходность на основе текущих векторов ввода. Не является финансовой рекомендацией.
          </p>
        </div>
      </main>
    </div>
  );
}

export default App;
