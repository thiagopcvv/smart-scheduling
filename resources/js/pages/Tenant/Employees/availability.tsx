import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/Tenants/app-layout';
import { type Employee, type Availability } from '@/types/employee';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { Plus, Trash2, Clock } from 'lucide-react';
import { toast } from 'sonner';

type AvailabilityProps = {
    employee: Employee;
    availabilities: Availability[];
};

const DAYS_OF_WEEK = [
    'Domingo',
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sábado'
];

export default function EmployeeAvailability({ employee, availabilities }: AvailabilityProps) {
    const [intervals, setIntervals] = useState<Availability[]>(availabilities || []);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/' },
        { title: 'Funcionários', href: '/client/employees' },
        { title: `Horários: ${employee.name}`, href: '#' },
    ];

    const addInterval = (day: number) => {
        setIntervals([...intervals, { day_of_week: day, start_time: '08:00', end_time: '18:00' }]);
    };

    const removeInterval = (index: number) => {
        setIntervals(intervals.filter((_, i) => i !== index));
    };

    const updateInterval = (index: number, field: 'start_time' | 'end_time', value: string) => {
        const newIntervals = [...intervals];
        newIntervals[index][field] = value;
        setIntervals(newIntervals);
    };

    const handleSave = () => {
        for (const interval of intervals) {
            if (interval.start_time >= interval.end_time) {
                toast.error(`Horário inválido no dia ${DAYS_OF_WEEK[interval.day_of_week]}. O horário de fim deve ser maior que o de início.`);
                return;
            }
        }

        setIsSubmitting(true);
        router.post(route('tenant-employees.availabilities.store', employee.id), {
            availabilities: intervals
        }, {
            onFinish: () => setIsSubmitting(false),
            onError: (errors) => {
                toast.error('Erro ao salvar horários. Verifique se os dados estão corretos.');
                console.error(errors);
            }
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Horários: ${employee.name}`} />
            
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 max-w-4xl mx-auto w-full">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h1 className="text-2xl font-bold">Disponibilidade de Horários</h1>
                        <p className="text-muted-foreground text-sm">Gerencie os horários de trabalho de {employee.name}</p>
                    </div>
                    <Button onClick={handleSave} disabled={isSubmitting}>
                        {isSubmitting ? 'Salvando...' : 'Salvar Horários'}
                    </Button>
                </div>

                <div className="space-y-6">
                    {DAYS_OF_WEEK.map((dayName, dayIndex) => {
                        const dayIntervals = intervals.map((inv, idx) => ({ ...inv, originalIndex: idx })).filter(inv => inv.day_of_week === dayIndex);
                        
                        return (
                            <Card key={dayIndex}>
                                <CardHeader className="pb-3 flex flex-row items-center justify-between">
                                    <CardTitle className="text-lg font-semibold flex items-center gap-2">
                                        <Clock className="w-5 h-5 text-muted-foreground" />
                                        {dayName}
                                    </CardTitle>
                                    <Button variant="outline" size="sm" onClick={() => addInterval(dayIndex)}>
                                        <Plus className="w-4 h-4 mr-2" />
                                        Adicionar Intervalo
                                    </Button>
                                </CardHeader>
                                <CardContent>
                                    {dayIntervals.length === 0 ? (
                                        <p className="text-sm text-muted-foreground italic">Nenhum horário definido (Folga).</p>
                                    ) : (
                                        <div className="space-y-3">
                                            {dayIntervals.map((interval) => (
                                                <div key={interval.originalIndex} className="flex items-end gap-4 p-3 bg-slate-50 dark:bg-slate-900 rounded-md border border-slate-100 dark:border-slate-800">
                                                    <div className="grid w-full max-w-sm items-center gap-1.5">
                                                        <Label htmlFor={`start-${interval.originalIndex}`}>Início</Label>
                                                        <Input 
                                                            type="time" 
                                                            id={`start-${interval.originalIndex}`} 
                                                            value={interval.start_time.substring(0, 5)} 
                                                            onChange={(e) => updateInterval(interval.originalIndex, 'start_time', e.target.value)} 
                                                        />
                                                    </div>
                                                    <div className="grid w-full max-w-sm items-center gap-1.5">
                                                        <Label htmlFor={`end-${interval.originalIndex}`}>Fim</Label>
                                                        <Input 
                                                            type="time" 
                                                            id={`end-${interval.originalIndex}`} 
                                                            value={interval.end_time.substring(0, 5)} 
                                                            onChange={(e) => updateInterval(interval.originalIndex, 'end_time', e.target.value)} 
                                                        />
                                                    </div>
                                                    <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10" onClick={() => removeInterval(interval.originalIndex)}>
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </AppLayout>
    );
}
