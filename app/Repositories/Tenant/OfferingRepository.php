<?php

namespace App\Repositories\Tenant;

use App\Models\Tenant\Offering;

class OfferingRepository
{
    public function create(array $data): Offering
    {
        return Offering::create($data);
    }

    public function update($id, array $data)
    {
        Offering::find($id)->update($data);
    }

    public function delete($id)
    {
        Offering::find($id)->delete();
    }

    public function find($id)
    {
        return Offering::find($id);
    }

    public function getAll()
    {
        return Offering::orderBy('created_at', 'desc');
    }
}
