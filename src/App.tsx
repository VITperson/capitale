import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { useFinancialEngine } from './hooks/useFinancialEngine';
import { useRetrospectiveEngine } from './hooks/useRetrospectiveEngine';
import { InputPanel } from './components/dashboard/InputPanel';
import { GrowthChart } from './components/dashboard/GrowthChart';
import { ResultCards } from './components/dashboard/ResultCards';
import { Onboarding } from './components/dashboard/Onboarding';
import { CapabilityMatrix } from './components/dashboard/CapabilityMatrix';
import { RetrospectiveControls } from './components/retrospective/RetrospectiveControls';
import { RetrospectiveChart } from './components/retrospective/RetrospectiveChart';
import { RetrospectiveResults } from './components/retrospective/RetrospectiveResults';
import { useLanguage } from './context/LanguageContext';
import { LanguageSwitcher } from './components/common/LanguageSwitcher';

import { ArticlesSection } from './components/articles/ArticlesSection';

function App() {
  const { t } = useLanguage();
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [activeTab, setActiveTab] = useState<'projection' | 'retrospective' | 'articles'>('projection');
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);

  const {
    inputs: projInputs,
    results: projResults,
    updateInput: updateProjInput
  } = useFinancialEngine({
    initialDeposit: 10000,
    monthlyContribution: 1000,
    annualRate: 7,
    years: 20,
  });

  const {
    inputs: retroInputs,
    results: retroResults,
    updateInput: updateRetroInput,
    isLoading: retroLoading,
    error: retroError
  } = useRetrospectiveEngine({
    asset: 'SPY',
    years: 5,
    initialDeposit: 10000,
    monthlyContribution: 1000
  });

  useEffect(() => {
    const hasCompletedOnboarding = localStorage.getItem('capitale_onboarding_v1');

    if (!hasCompletedOnboarding) {
      setShowOnboarding(true);
    }
  }, []);

  const handleOnboardingComplete = (deposit: number, contribution: number) => {
    updateProjInput('initialDeposit', deposit);
    updateProjInput('monthlyContribution', contribution);
    setShowOnboarding(false);
    localStorage.setItem('capitale_onboarding_v1', 'true');
  };

  return (
    <div className="min-h-screen bg-background text-white p-4 sm:p-6 font-sans selection:bg-primary/30">
      {/* Background patterns */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/10 blur-[150px] rounded-full"></div>
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10 flex flex-col gap-6 sm:gap-8">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b-2 border-border pb-6 sm:pb-8">
          <div className="group">
            <h1 className="text-5xl sm:text-7xl font-display font-black tracking-tighter transition-all duration-500 group-hover:tracking-normal group-hover:text-primary leading-[0.8]">
              CAPITALE
            </h1>
            <p className="mt-4 font-display font-bold text-white/50 tracking-[0.3em] text-xs sm:text-sm flex items-center gap-4">
              WEALTH STRATEGY PROTOCOL / V1.0.4
            </p>
          </div>
          <div className="flex flex-col items-end gap-3 text-right">
            <LanguageSwitcher />
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 bg-primary animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.8)]"></span>
              <p className="font-display font-black text-xs sm:text-sm tracking-widest text-primary uppercase">
                {t.header.status}
              </p>
            </div>
            <p className="font-display font-bold text-white/40 text-[10px] sm:text-xs tracking-[0.2em] uppercase">
              {t.header.live_projection}
            </p>
          </div>
        </header>

        {/* Global Navigation Tabs */}
        <div className="flex flex-col gap-4">
          <div id="tour-tabs" className="flex bg-card p-1 border-2 border-border self-start">
            <button
              onClick={() => setActiveTab('projection')}
              className={`px-6 py-3 font-display font-bold uppercase tracking-widest text-base transition-all ${activeTab === 'projection'
                ? 'bg-primary text-background'
                : 'text-white/40 hover:text-white hover:bg-white/5'
                }`}
            >
              {t.tabs.projection}
            </button>
            <button
              onClick={() => setActiveTab('retrospective')}
              className={`px-6 py-3 font-display font-bold uppercase tracking-widest text-base transition-all ${activeTab === 'retrospective'
                ? 'bg-primary text-background'
                : 'text-white/40 hover:text-white hover:bg-white/5'
                }`}
            >
              {t.tabs.retrospective}
            </button>
            <button
              onClick={() => setActiveTab('articles')}
              className={`px-6 py-3 font-display font-bold uppercase tracking-widest text-base transition-all ${activeTab === 'articles'
                ? 'bg-primary text-background'
                : 'text-white/40 hover:text-white hover:bg-white/5'
                }`}
            >
              {t.tabs.articles}
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <p className="flex-1 text-base sm:text-lg font-display font-medium text-white/60 leading-tight tracking-tight">
              {activeTab === 'projection' ? t.tabs.projection_desc : activeTab === 'retrospective' ? t.tabs.retrospective_desc : t.tabs.articles_desc}
            </p>
            {activeTab === 'projection' && (
              <button
                onClick={() => {
                  setActiveTab('articles');
                  setSelectedArticleId('compound-interest');
                }}
                className="group flex items-center gap-2 px-4 py-2 border border-primary/30 hover:border-primary text-primary text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap"
              >
                {t.projection.learn_more}
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </button>
            )}
            {activeTab === 'retrospective' && (
              <button
                onClick={() => {
                  setActiveTab('articles');
                  setSelectedArticleId('market-reality');
                }}
                className="group flex items-center gap-2 px-4 py-2 border border-primary/30 hover:border-primary text-primary text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap"
              >
                {t.retro.learn_more}
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </button>
            )}
          </div>
        </div>

        {activeTab === 'projection' ? (
          <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <main className="grid grid-cols-1 xl:grid-cols-[380px_1fr] gap-6 sm:gap-8">
              {/* Left: Input Matrix */}
              <section className="flex flex-col gap-6">
                <div id="tour-parameters">
                  <InputPanel inputs={projInputs} onUpdate={updateProjInput} />
                </div>
                <div className="bg-card/50 border border-border p-4 font-display text-[9px] text-white/30 uppercase tracking-[0.2em] leading-relaxed">
                  {t.disclaimer.projection}
                </div>
              </section>

              {/* Right: Visualization Matrix */}
              <section className="flex flex-col gap-6 sm:gap-8 min-w-0">
                <div id="tour-results">
                  <ResultCards results={projResults} />
                </div>
                <div id="tour-chart">
                  <GrowthChart data={projResults.timeline} />
                </div>
              </section>
            </main>

            {/* Full Width Section */}
            <section id="tour-lifestyle" className="w-full">
              <CapabilityMatrix results={projResults} timeline={projResults.timeline} />
            </section>
          </div>
        ) : activeTab === 'retrospective' ? (
          <main className="grid grid-cols-1 xl:grid-cols-[380px_1fr] gap-6 sm:gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <section className="flex flex-col gap-6">
              <RetrospectiveControls inputs={retroInputs} onUpdate={updateRetroInput} />
              <div className="bg-card/50 border border-border p-4 font-display text-[9px] text-white/30 uppercase tracking-[0.2em] leading-relaxed">
                {t.disclaimer.retro}
              </div>
            </section>
            <section className="flex flex-col gap-6 sm:gap-8 min-w-0">
              <RetrospectiveResults results={retroResults} />
              <RetrospectiveChart data={retroResults.timeline} isLoading={retroLoading} error={retroError} />

              {/* Educational info about S&P 500 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-card border-2 border-border p-6 sm:p-10 shadow-[24px_24px_0px_0px_rgba(var(--primary),0.05)] animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
                <div className="md:col-span-3 pb-6 border-b border-white/5 mb-2">
                  <h3 className="text-2xl font-display font-black tracking-[0.2em] text-primary uppercase">
                    {t.retro.index_info.title}
                  </h3>
                </div>
                <div className="space-y-4">
                  <div className="w-10 h-10 bg-primary/10 flex items-center justify-center border border-primary/20 text-primary">
                    <span className="font-display font-black text-lg">01</span>
                  </div>
                  <h4 className="font-display font-bold text-[10px] tracking-[0.3em] text-white/40 uppercase">
                    {t.retro.index_info.what_is_it}
                  </h4>
                  <p className="text-[13px] text-white/60 leading-relaxed font-sans font-medium">
                    {t.retro.index_info.what_is_it_desc}
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="w-10 h-10 bg-primary/10 flex items-center justify-center border border-primary/20 text-primary">
                    <span className="font-display font-black text-lg">02</span>
                  </div>
                  <h4 className="font-display font-bold text-[10px] tracking-[0.3em] text-white/40 uppercase">
                    {t.retro.index_info.why_use}
                  </h4>
                  <p className="text-[13px] text-white/60 leading-relaxed font-sans font-medium">
                    {t.retro.index_info.why_use_desc}
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="w-10 h-10 bg-primary/10 flex items-center justify-center border border-primary/20 text-primary">
                    <span className="font-display font-black text-lg">03</span>
                  </div>
                  <h4 className="font-display font-bold text-[10px] tracking-[0.3em] text-white/40 uppercase">
                    {t.retro.index_info.how_it_works}
                  </h4>
                  <p className="text-[13px] text-white/60 leading-relaxed font-sans font-medium">
                    {t.retro.index_info.how_it_works_desc}
                  </p>
                </div>
              </div>
            </section>
          </main>
        ) : (
          <ArticlesSection
            initialArticleId={selectedArticleId}
            onArticleChange={setSelectedArticleId}
          />
        )}
      </div>

      <Onboarding isVisible={showOnboarding} onComplete={handleOnboardingComplete} />
      {/* {showTour && <InterfaceTour onComplete={handleTourComplete} />} */}
    </div>
  );
}

export default App;
