<?php

namespace App\Http\Controllers\Tenant;

use App\Http\Controllers\Controller;
use App\Http\Requests\Tenant\SyncAvailabilityRequest;
use App\Models\Tenant\Employee;
use App\Services\Tenant\EmployeeAvailabilityService;
use Inertia\Inertia;

class EmployeeAvailabilityController extends Controller
{
    public function __construct(private EmployeeAvailabilityService $service) {}

    public function index(Employee $employee)
    {
        $availabilities = $this->service->getByEmployee($employee->id);

        return Inertia::render('Tenant/Employees/availability', [
            'employee' => $employee,
            'availabilities' => $availabilities
        ]);
    }

    public function store(SyncAvailabilityRequest $request, Employee $employee)
    {
        $this->service->syncAvailabilities($employee->id, $request->validated('availabilities', []));
        
        return redirect()->route('tenant-employees')->with('success', 'Horários atualizados com sucesso!');
    }
}
