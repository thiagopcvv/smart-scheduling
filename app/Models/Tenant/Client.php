<?php

namespace App\Models\Tenant;

use App\Utilities\FilterBuilder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Client extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'nome',
        'cpf',
        'email',
        'telefone',
        'rua',
        'bairro',
        'cidade',
        'uf',
        'numero',
    ];

    public function scopeFilterBy($query, $filters)
    {
        $namespace = 'App\Utilities\ClientFilters';
        $filter = new FilterBuilder($query, $filters, $namespace);

        return $filter->apply();
    }
}
