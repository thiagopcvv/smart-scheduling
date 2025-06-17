// components/GlobalErrorAlert.tsx
import { usePage } from '@inertiajs/react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { useEffect, useState } from 'react'

export function AlertGlobal(status: string = 'error', msg: string = '') {
    const { errors } = usePage().props;
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        if (Object.keys(errors).length > 0) {
            setVisible(true)

            const timer = setTimeout(() => setVisible(false), 5000)
            return () => clearTimeout(timer)
        }
    }, [errors])

    if(!visible) return null;

    return (
        <div className="fixed top-4 right-4 z-50 w-[300px]">
            <Alert variant="destructive">
                <AlertTitle>Erro</AlertTitle>
                <AlertDescription>
                    {Object.values(errors).map((error, index) => (
                        <div key={index}>{error as string}</div>
                    ))}
                </AlertDescription>
            </Alert>
        </div>
    )
}
