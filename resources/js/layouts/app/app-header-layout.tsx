import { AppContent } from '@/components/Central/app-content';
import { AppHeader } from '@/components/Central/app-header';
import { AppShell } from '@/components/Central/app-shell';
import { type BreadcrumbItem } from '@/types';
import type { PropsWithChildren } from 'react';

export default function AppHeaderLayout({ children, breadcrumbs }: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[] }>) {
    return (
        <AppShell>
            <AppHeader breadcrumbs={breadcrumbs} />
            <AppContent>{children}</AppContent>
        </AppShell>
    );
}
