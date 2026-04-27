<?php

namespace App\Http\Controllers\Tenant;

use App\Http\Controllers\Controller;
use App\Http\Requests\Tenant\StoreEmployeeRequest;
use App\Http\Requests\Tenant\UpdateEmployeeRequest;
use App\Models\Tenant\Employee;
use App\Services\Tenant\EmployeeService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EmployeeController extends Controller
{
    public function __construct(private EmployeeService $service) {}

    public function index(Request $request)
    {
        $filters = $request->all();
        $employees = $this->service->getAll($filters);

        return Inertia::render('Tenant/Employees/index', ['employees' => $employees]); 
    }

    public function create()
    {
        $users = \App\Models\Tenant\User::all();
        return Inertia::render('Tenant/Employees/form', ['users' => $users]); 
    }

    public function store(StoreEmployeeRequest $request)
    {
        $this->service->create($request->validated());
        return redirect()->route('tenant-employees')->with('success', 'Funcionário cadastrado com sucesso!');
    }

    public function edit(Employee $employee)
    {
        $users = \App\Models\Tenant\User::all();
        return Inertia::render('Tenant/Employees/form', [
            'employee' => $employee,
            'users' => $users
        ]);
    }

    public function update(UpdateEmployeeRequest $request, Employee $employee)
    {
        $this->service->update($employee->id, $request->validated());
        return redirect()->route('tenant-employees')->with('success', 'Funcionário atualizado com sucesso!');
    }

    public function delete($id)
    {
        $this->service->delete($id);
        return redirect()->route('tenant-employees')->with('success', 'Funcionário removido com sucesso!');
    }
}
