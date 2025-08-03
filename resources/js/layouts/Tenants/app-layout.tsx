import AppLayoutTemplate from '@/layouts/Tenants/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { type ReactNode } from 'react';
import { AlertGlobal } from '@/components/alert-global';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default ({ children, breadcrumbs, ...props }: AppLayoutProps) => (
    <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
        <AlertGlobal />
        {children}
    </AppLayoutTemplate>
);
