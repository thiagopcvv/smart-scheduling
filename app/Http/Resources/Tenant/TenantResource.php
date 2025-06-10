<?php

namespace App\Http\Resources\Tenant;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TenantResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'data' => $this->data,
            'db_name' => $this->tenancy_db_name,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'domain' => $this->domain()->toArray(),
        ];
    }
}
