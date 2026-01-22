import { AlertGlobal } from '@/components/alert-global';
import { Toaster } from '@/components/ui/sonner';
import AppLayoutTemplate from '@/layouts/Tenants/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { type ReactNode } from 'react';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
    permissions?: string[];
}

export default ({ children, breadcrumbs, permissions, ...props }: AppLayoutProps) => (
    <AppLayoutTemplate breadcrumbs={breadcrumbs} permissions={permissions} {...props}>
        <AlertGlobal />
        <Toaster />
        {children}
    </AppLayoutTemplate>
);
