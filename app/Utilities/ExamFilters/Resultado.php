<?php

namespace App\Utilities\ExamFilters;

use App\Utilities\FilterContract;
use App\Utilities\QueryFilter;

class Resultado extends QueryFilter implements FilterContract
{
    public function handle($value): void
    {
        $this->query->where('resultado', $value);
    }
}
