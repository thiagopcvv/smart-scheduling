import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { route } from 'ziggy-js';

interface ICustomCardLinkProps {
    title: string;
    Icon: LucideIcon;
    description: string;
    link: string;
}

export default function CardLink({ title, Icon, description, link }: ICustomCardLinkProps) {
    return (
        <Link href={route(link)}>
            <Card className="cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Icon size={48} />
                        <h1 style={{ fontSize: 30 }}>{title}</h1>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <h3>{description}</h3>
                </CardContent>
            </Card>
        </Link>
    );
}
