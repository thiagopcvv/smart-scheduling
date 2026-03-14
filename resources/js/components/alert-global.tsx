import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { IoIosInformationCircle, IoIosWarning } from 'react-icons/io';
import { MdCancel } from 'react-icons/md';

type FlashType = 'success' | 'error' | 'warning' | 'info';

type FlashMessages = Record<FlashType, string | null>;

const iconMap = {
    success: <FaCheckCircle />,
    error: <MdCancel />,
    warning: <IoIosWarning />,
    info: <IoIosInformationCircle />,
};

const titleMap = {
    success: 'Sucesso',
    error: 'Erro',
    warning: 'Aviso',
    info: 'Informação',
};
export function AlertGlobal() {
    const { flash, errors } = usePage().props as any;

    const [visible, setVisible] = useState(false);
    const [exiting, setExiting] = useState(false);
    const [type, setType] = useState<FlashType | null>(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const flashEntry = Object.entries(flash).find(([_, msg]) => msg !== null);

        if (flashEntry) {
            const [flashType, flashMessage] = flashEntry as [FlashType, string];
            setType(flashType);
            setMessage(flashMessage);
        } else if (errors && Object.keys(errors).length > 0) {
            const firstError = Object.values(errors)[0] as string;

            setType('error');
            setMessage(firstError);
        } else {
            return;
        }

        setVisible(true);
        setExiting(false);

        const timer = setTimeout(() => {
            setExiting(true);
            setTimeout(() => setVisible(false), 300);
        }, 3000);

        return () => clearTimeout(timer);
    }, [flash, errors]);

    if ((exiting && !visible) || !type) return null;

    return (
        <div className="fixed top-4 right-4 z-50 w-[300px]">
            <Alert exiting={exiting} variant={type === 'error' ? 'destructive' : type}>
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
