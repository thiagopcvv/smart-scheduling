<?php

namespace App\Http\Resources\Central;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TenantResource extends JsonResource
{
    public static $wrap = null;
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'domain' => $this->domains->first()->domain,
            'active' => $this->active,
            'name' => $this->name,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
