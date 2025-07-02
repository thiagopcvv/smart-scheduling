import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ReactNode } from 'react';

interface iCustomCardProps {
    title: string;
    children: ReactNode;
    onClick: () => void;
    isActive: boolean;
}

export default function CardActivity({ title, children, onClick, isActive }: iCustomCardProps) {
    return (
        <Card onClick={onClick} className="bg-card w-full transform cursor-pointer transition-transform duration-300 hover:scale-[1.02]">
            <CardHeader>
                <CardTitle className="flex items-center justify-between gap-2">
                    {title}
                    {isActive ? (
                        <span className="relative flex size-3">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                            <span className="relative inline-flex size-3 rounded-full bg-green-500" />
                        </span>
                    ) : (
                        <span className="relative flex size-3">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                            <span className="relative inline-flex size-3 rounded-full bg-red-500" />
                        </span>
                    )}
                </CardTitle>
            </CardHeader>
            <CardContent>{children}</CardContent>
        </Card>
    );
}
