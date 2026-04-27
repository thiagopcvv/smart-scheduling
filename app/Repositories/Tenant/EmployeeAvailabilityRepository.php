<?php

namespace App\Repositories\Tenant;

use App\Models\Tenant\EmployeeAvailability;

class EmployeeAvailabilityRepository
{
    public function createMany(array $data)
    {
        return EmployeeAvailability::insert($data);
    }

    public function deleteByEmployee($employeeId)
    {
        EmployeeAvailability::where('employee_id', $employeeId)->delete();
    }

    public function getByEmployee($employeeId)
    {
        return EmployeeAvailability::where('employee_id', $employeeId)->get();
    }
}
