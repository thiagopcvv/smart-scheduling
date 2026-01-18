import { Appearance, useAppearance } from '@/hooks/use-appearance';
import { cn } from '@/lib/utils';
import { Monitor, Moon, Sun } from 'lucide-react';
import { HTMLAttributes } from 'react';

export default function AppearanceNavFooter({ className = '', ...props }: HTMLAttributes<HTMLButtonElement>) {
    const { appearance, updateAppearance } = useAppearance();

    const order: Appearance[] = ['light', 'dark', 'system'];
    const nextAppearance = order[(order.indexOf(appearance) + 1) % order.length];

    const iconMap = {
        light: Sun,
        dark: Moon,
        system: Monitor,
    } as const;

    const labelMap = {
        light: 'Claro',
        dark: 'Escuro',
        system: 'Sistema',
    } as const;

    const Icon = iconMap[appearance];
    const label = labelMap[appearance];

    return (
        <button
            onClick={() => updateAppearance(nextAppearance)}
            className={cn(
                'flex items-center gap-2 rounded-md px-3 py-1.5 text-sm transition-colors cursor-pointer',
                'bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700',
                'text-neutral-700 dark:text-neutral-200',
                className,
            )}
            {...props}
        >
            <Icon className="h-4 w-4" />
            <span>{label}</span>
        </button>
    );
}
