<?php

namespace App\Utilities\ExamFilters;

use App\Utilities\FilterContract;
use App\Utilities\QueryFilter;

class AnimalId extends QueryFilter implements FilterContract
{
    public function handle($value): void
    {
        $this->query->where('animal_id', $value);
    }
}
