import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface CardProps {
    children: React.ReactNode;
    className?: string;
}

export const Card = ({ children, className }: CardProps) => (
    <div className={cn("bg-card text-card-foreground border border-border shadow-[4px_4px_0px_0px_rgba(var(--primary),0.1)]", className)}>
        {children}
    </div>
);

interface SliderProps {
    label: string;
    value: number;
    min: number;
    max: number;
    step?: number;
    prefix?: string;
    suffix?: string;
    onChange: (value: number) => void;
    className?: string;
}

export const SliderInput = ({ label, value, min, max, step = 1, prefix, suffix, onChange, className }: SliderProps) => {
    return (
        <div className={cn("group space-y-4", className)}>
            <div className="flex justify-between items-end border-b border-border/50 pb-2 group-focus-within:border-primary transition-colors">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground group-focus-within:text-primary transition-colors">
                    {label}
                </label>
                <div className="flex items-center gap-1 font-display font-medium text-white">
                    <span className="text-muted-foreground text-sm">{prefix}</span>
                    <input
                        type="number"
                        value={value}
                        onChange={(e) => onChange(Number(e.target.value))}
                        className="bg-transparent border-none text-right text-2xl outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none w-24 focus:text-primary transition-colors"
                    />
                    <span className="text-muted-foreground text-sm">{suffix}</span>
                </div>
            </div>
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                className="w-full h-1 bg-zinc-800 appearance-none cursor-crosshair accent-primary"
            />
        </div>
    );
};
