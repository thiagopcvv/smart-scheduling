<?php

namespace App\Utilities\UserFilters;

use App\Utilities\FilterContract;
use App\Utilities\QueryFilter;

class Search extends QueryFilter implements FilterContract
{

    public function handle($value): void
    {
        $this->query->whereRaw("unaccent(name) ilike unaccent('" . $value . "%')");
    }
}
