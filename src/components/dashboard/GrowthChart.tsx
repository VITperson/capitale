import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';
import type { FinancialDataPoint } from '../../utils/calculations';

interface GrowthChartProps {
    data: FinancialDataPoint[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        const total = payload[0].value + payload[1].value;
        return (
            <div className="bg-background border-2 border-primary p-6 shadow-[8px_8px_0px_0px_rgba(var(--primary),0.1)]">
                <div className="text-2xl font-display font-black italic uppercase tracking-tighter mb-4 text-primary">Год {label}</div>
                <div className="space-y-3">
                    <div className="flex justify-between gap-12 border-b border-border/50 pb-1">
                        <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">Депозиты:</span>
                        <span className="text-sm font-mono font-bold text-white">${payload[0].value.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between gap-12 border-b border-border/50 pb-1">
                        <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">Проценты:</span>
                        <span className="text-sm font-mono font-bold text-white">${payload[1].value.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between gap-12 pt-2">
                        <span className="text-[10px] font-bold tracking-widest text-primary uppercase">Итого:</span>
                        <span className="text-lg font-display font-black text-white">${total.toLocaleString()}</span>
                    </div>
                </div>
            </div>
        );
    }
    return null;
};

export const GrowthChart = ({ data }: GrowthChartProps) => {
    return (
        <div className="border border-border p-10 h-[500px] flex flex-col bg-card/40">
            <div className="flex items-baseline justify-between mb-8">
                <h3 className="text-2xl font-display font-black italic uppercase tracking-tighter">
                    Матрица роста
                </h3>
                <div className="flex gap-6">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-zinc-800 border border-border" />
                        <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase italic">Взносы</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-primary" />
                        <span className="text-[10px] font-bold tracking-widest text-primary uppercase italic">Проценты</span>
                    </div>
                </div>
            </div>

            <div className="flex-1 w-full min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="0" vertical={false} stroke="var(--border)" strokeOpacity={0.5} />
                        <XAxis
                            dataKey="year"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: 'var(--muted-foreground)', fontSize: 10, fontWeight: 700 }}
                            dy={20}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: 'var(--muted-foreground)', fontSize: 10, fontWeight: 700 }}
                            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                        />
                        <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'var(--primary)', strokeWidth: 1 }} />
                        <Area
                            type="stepAfter"
                            dataKey="principal"
                            stackId="1"
                            stroke="#27272a"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="#27272a"
                        />
                        <Area
                            type="stepAfter"
                            dataKey="interest"
                            stackId="1"
                            stroke="var(--primary)"
                            strokeWidth={2}
                            fillOpacity={0.8}
                            fill="var(--primary)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};
