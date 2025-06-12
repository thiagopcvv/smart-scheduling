<?php

namespace App\Repositories\Central;
use App\Models\Central\Tenant;
use Illuminate\Support\Facades\DB;

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
        DB::beginTransaction();
        try {
            Tenant::where('id', $data['id'])->update(['data' => $data]);

            DB::table('domains')
                ->where('tenant_id', $data['id'])
                ->update(['domain' => $data['domain']]);

            DB::commit();
            return true;
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }
}
