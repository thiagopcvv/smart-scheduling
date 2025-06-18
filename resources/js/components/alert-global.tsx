import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { MdCancel } from 'react-icons/md';

type FlashType = 'success' | 'error' | 'warning' | 'info';

type FlashMessages = Record<FlashType, string | null>;

const iconMap = {
    success: <FaCheckCircle />,
    error: <MdCancel />,
    warning: null,
    info: null,
};

const titleMap = {
    success: 'Sucesso',
    error: 'Erro',
    warning: 'Aviso',
    info: 'Informação',
};

export function AlertGlobal() {
    const { flash } = usePage().props;

    const [visible, setVisible] = useState(false);
    const [type, setType] = useState<FlashType | null>(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Pega o primeiro flash que não é null
        const entry = Object.entries(flash).find(([_, msg]) => msg !== null);

        console.log(entry);

        if (entry) {
            const [flashType, flashMessage] = entry as [FlashType, string];
            setType(flashType);
            setMessage(flashMessage);
            setVisible(true);

            const timer = setTimeout(() => setVisible(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [flash]);

    if (!visible || !type) return null;

    return (
        <div className="fixed top-4 right-4 z-50 w-[300px]">
            <Alert variant={type === 'error' ? 'destructive' : 'default'}>
                {iconMap[type]}
                <div className="flex items-start gap-2">
                    <div>
                        <AlertTitle>{titleMap[type]}</AlertTitle>
                        <AlertDescription>{message}</AlertDescription>
                    </div>
                </div>
            </Alert>
        </div>
    );
}
