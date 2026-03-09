import { LucideIcon, ShieldIcon, UserCog } from 'lucide-react';

export interface NavItem {
    title: string;
    Icon: LucideIcon;
    description: string;
    permission: Array<string>;
    href: string;
}

const navItemPermissions: NavItem[] = [
    {
        title: 'Usuários',
        Icon: UserCog,
        description: 'Configuração de usuários do sistema',
        permission: ['usuarios'],
        href: 'tenant-users',
    },
    {
        title: 'Permissões',
        Icon: ShieldIcon,
        description: 'Configuração de permissões dos usuários do sistema.',
        permission: ['permissions'],
        href: '/client/permissions',
    },
];

export default navItemPermissions;
