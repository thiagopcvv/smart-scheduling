<?php

namespace App\Services\Tenant;

use App\Repositories\Tenant\EmployeeAvailabilityRepository;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class EmployeeAvailabilityService
{
    public function __construct(private EmployeeAvailabilityRepository $repository) {}

    public function getByEmployee($employeeId)
    {
        return $this->repository->getByEmployee($employeeId);
    }

    public function syncAvailabilities($employeeId, array $availabilities)
    {
        DB::beginTransaction();

        try {
            // Delete old ones
            $this->repository->deleteByEmployee($employeeId);

            // Insert new ones
            $insertData = [];
            $now = Carbon::now();
            foreach ($availabilities as $availability) {
                $insertData[] = [
                    'employee_id' => $employeeId,
                    'day_of_week' => $availability['day_of_week'],
                    'start_time' => $availability['start_time'],
                    'end_time' => $availability['end_time'],
                    'created_at' => $now,
                    'updated_at' => $now,
                ];
            }

            if (!empty($insertData)) {
                $this->repository->createMany($insertData);
            }

            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }
}
