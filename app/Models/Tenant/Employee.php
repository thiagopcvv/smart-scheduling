<?php

namespace App\Models\Tenant;

use App\Utilities\FilterBuilder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Employee extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'name',
        'email',
        'phone',
        'is_active',
        'notes',
        'user_id',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function availabilities()
    {
        return $this->hasMany(EmployeeAvailability::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function scopeFilterBy($query, $filters)
    {
        $namespace = 'App\Utilities\EmployeeFilters';
        $filter = new FilterBuilder($query, $filters, $namespace);

        return $filter->apply();
    }
}
