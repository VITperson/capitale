import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';
import type { RetrospectivePoint } from '../../hooks/useRetrospectiveEngine';
import { useLanguage } from '../../context/LanguageContext';

interface RetrospectiveChartProps {
    data: RetrospectivePoint[];
    isLoading?: boolean;
    error?: string | null;
}

const CustomTooltip = ({ active, payload, label }: any) => {
    const { t } = useLanguage();

    if (active && payload && payload.length >= 2) {
        const invested = payload[0].value;
        const value = payload[1].value;
        const profit = value - invested;

        return (
            <div className="bg-background border-2 border-primary p-6 shadow-[8px_8px_0px_0px_rgba(var(--primary),0.1)]">
                <div className="text-2xl font-display font-black italic uppercase tracking-tighter mb-4 text-primary">{label}</div>
                <div className="space-y-3">
                    <div className="flex justify-between gap-12 border-b border-border/50 pb-1">
                        <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                            {t.retro.chart.invested}:
                        </span>
                        <span className="text-sm font-mono font-bold text-white">${invested.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between gap-12 border-b border-border/50 pb-1">
                        <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                            {t.retro.chart.value}:
                        </span>
                        <span className="text-sm font-mono font-bold text-white">${value.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between gap-12 pt-2">
                        <span className="text-[10px] font-bold tracking-widest text-primary uppercase">
                            {t.retro.chart.profit}:
                        </span>
                        <span className={`text-lg font-display font-black ${profit >= 0 ? 'text-primary' : 'text-red-500'}`}>
                            ${profit.toLocaleString()}
                        </span>
                    </div>
                </div>
            </div>
        );
    }
    return null;
};

export const RetrospectiveChart = ({ data, isLoading, error }: RetrospectiveChartProps) => {
    const { t, language } = useLanguage();

    return (
        <div className="border border-border p-10 h-[500px] flex flex-col bg-card/40 relative">
            <div className="flex items-baseline justify-between mb-8">
                <h3 className="text-2xl font-display font-black italic uppercase tracking-tighter">
                    {t.retro.analysis_title}
                </h3>
                <div className="flex gap-6">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-zinc-800 border border-border" />
                        <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase italic">{t.retro.invested_label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-primary" />
                        <span className="text-[10px] font-bold tracking-widest text-primary uppercase italic">{t.retro.portfolio_label}</span>
                    </div>
                </div>
            </div>

            <div className="flex-1 w-full min-h-0 relative">
                {isLoading && (
                    <div className="absolute inset-0 z-10 bg-background/60 backdrop-blur-sm flex items-center justify-center">
                        <div className="text-center">
                            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                            <p className="text-[10px] font-black tracking-[0.3em] uppercase italic text-primary">
                                {language === 'ru' ? 'Синхронизация с биржей...' : 'Syncing with market...'}
                            </p>
                        </div>
                    </div>
                )}

                {error && (
                    <div className="absolute inset-0 z-10 bg-background/80 flex items-center justify-center p-12 text-center">
                        <div>
                            <div className="text-red-500 text-4xl mb-4">✕</div>
                            <p className="text-lg font-display font-black uppercase italic text-red-500 mb-2">{error}</p>
                            <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-muted-foreground">
                                {language === 'ru' ? 'Проверьте подключение или лимит API-ключа' : 'Check connection or API key limits'}
                            </p>
                        </div>
                    </div>
                )}

                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#10b981" stopOpacity={0.5} />
                                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                        <XAxis
                            dataKey="date"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10, fontWeight: 700 }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10, fontWeight: 700 }}
                            tickFormatter={(value) => `$${value >= 1000 ? (value / 1000).toFixed(0) + 'k' : value}`}
                            width={50}
                        />
                        <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#10b981', strokeWidth: 1 }} />

                        <Area
                            type="stepAfter"
                            dataKey="invested"
                            stroke="rgba(255,255,255,0.4)"
                            fill="rgba(255,255,255,0.05)"
                            strokeWidth={2}
                            isAnimationActive={false}
                        />
                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke="#10b981"
                            fillOpacity={1}
                            fill="url(#colorValue)"
                            strokeWidth={6}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};
