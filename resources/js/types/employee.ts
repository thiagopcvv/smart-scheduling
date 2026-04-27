export interface Availability {
    id?: number;
    day_of_week: number;
    start_time: string;
    end_time: string;
}

export interface Employee {
    id: number;
    name: string;
    email: string | null;
    phone: string | null;
    is_active: boolean;
    notes: string | null;
    user_id?: number | null;
    created_at: string;
    updated_at: string;
}
