<?php

namespace App\Repositories\Central;
use App\Models\Central\Tenant;

class TenantRepository{

    public function getAll(){
        return Tenant::all();
    }

    public function getById($id){
        return Tenant::where('id', $id)->first();
    }
    public function store(array $data): Tenant
    {
        return Tenant::create($data);
    }

    public function update(array $data)
    {
        DB::transaction(function () use ($data) {

            return Tenant::where('id', $data['id'])->update(['data' => $data]);
        });
    }
}
