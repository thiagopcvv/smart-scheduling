<?php

namespace App\Models\Tenant;

use App\Utilities\FilterBuilder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Offering extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'descricao',
        'duracao',
        'preco',
        'ativo',
    ];

    public function scopeFilterBy($query, $filters)
    {
        $namespace = 'App\Utilities\OfferingFilters';
        $filter = new FilterBuilder($query, $filters, $namespace);

        return $filter->apply();
    }
}
