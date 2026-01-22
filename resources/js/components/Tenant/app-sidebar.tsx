import { NavFooter } from '@/components/Tenant/nav-footer';
import { NavMain } from '@/components/Tenant/nav-main';
import { NavUser } from '@/components/Tenant/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem, SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid, ShieldIcon, UserCog } from 'lucide-react';
import AppLogo from '../app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/client',
        icon: LayoutGrid,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repositories',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits',
        icon: BookOpen,
    },
];

const navItemPermissions: NavItem[] = [
    {
        title: 'Usuários',
        icon: UserCog,
        permission: ['usuarios'],
        href: '/client/users',
    },
    {
        title: 'Permissões',
        icon: ShieldIcon,
        permission: ['permissions'],
        href: '/client/permissions',
    },
];

export function AppSidebar() {
    const { props } = usePage<SharedData>();
    const permissions: string[] = props?.auth?.user?.permissions ?? [];

    const newItems = navItemPermissions.filter((item) => item.permission?.some((p) => permissions?.includes(p)));
    const navItems: NavItem[] = [...mainNavItems, ...newItems]

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="">
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={navItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
