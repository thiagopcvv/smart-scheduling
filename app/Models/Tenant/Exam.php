<?php

namespace App\Models\Tenant;

use App\Enums\ExamResult;
use App\Enums\ExamType;
use App\Utilities\FilterBuilder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Exam extends Model
{
    use SoftDeletes;

    protected $table = 'exames';

    protected $fillable = [
        'animal_id',
        'tipo',
        'data_exame',
        'data_validade',
        'resultado',
        'veterinario',
        'laboratorio',
        'laudo',
        'observacoes',
    ];

    protected $casts = [
        'tipo' => ExamType::class,
        'resultado' => ExamResult::class,
        'data_exame' => 'date',
        'data_validade' => 'date',
    ];

    public function animal()
    {
        return $this->belongsTo(Animal::class, 'animal_id');
    }

    public function scopeFilterBy($query, $filters)
    {
        $namespace = 'App\Utilities\ExamFilters';
        $filter = new FilterBuilder($query, $filters, $namespace);

        return $filter->apply();
    }
}
