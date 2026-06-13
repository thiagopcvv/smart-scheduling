<?php

namespace App\Models\Tenant;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Animal extends Model
{
    use SoftDeletes;

    protected $table = 'animais';

    public function exams()
    {
        return $this->hasMany(Exam::class, 'animal_id');
    }
}
