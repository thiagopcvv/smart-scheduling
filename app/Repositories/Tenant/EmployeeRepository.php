<?php

namespace App\Repositories\Tenant;

use App\Models\Tenant\Employee;

class EmployeeRepository
{
    public function create(array $data): Employee
    {
        return Employee::create($data);
    }

    public function update($id, array $data)
    {
        Employee::find($id)->update($data);
    }

    public function delete($id)
    {
        Employee::find($id)->delete();
    }

    public function find($id)
    {
        return Employee::find($id);
    }

    public function getAll()
    {
        return Employee::orderBy('created_at', 'desc');
    }
}
