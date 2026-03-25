<?php

namespace App\Models\Tenant;

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
    ];
}
