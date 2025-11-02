import { LucideIcon, ShieldIcon, UserCog } from 'lucide-react';

export interface CardItems {
    title: string;
    Icon: LucideIcon;
    description: string;
    permission: Array<string>;
    link: string;
}

const cards: CardItems[] = [
    {
        title: 'Usuários',
        Icon: UserCog,
        description: 'Configuração de usuários do sistema',
        permission: ['usuarios'],
        link: 'tenant-users',
    },
    {
        title: 'Permissões',
        Icon: ShieldIcon,
        description: 'Configuração de permissões dos usuários do sistema.',
        permission: ['permissions'],
        link: '/client/permissions',
    },
];

export default cards;
