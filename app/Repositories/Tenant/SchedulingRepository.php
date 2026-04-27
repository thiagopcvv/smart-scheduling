<?php

namespace App\Repositories\Tenant;

use App\Models\Tenant\Scheduling;

class SchedulingRepository
{
    public function getAll()
    {
        return Scheduling::all();
    }

    public function find($id)
    {
        return Scheduling::find($id);
    }

    public function create($data)
    {
        return Scheduling::create($data);
    }

    public function update($id, $data)
    {
        Scheduling::find($id)->update($data);
    }

    public function delete($id)
    {
        Scheduling::find($id)->delete();
    }
}
