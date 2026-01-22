<?php

namespace App\Utilities;

class FilterBuilder
{
    protected $query, $filters, $namespace;

    public function __construct($query, $filters, $namespace)
    {
        $this->query = $query;
        $this->filters = $filters;
        $this->namespace = $namespace;
    }

    public function apply()
    {
        foreach ($this->filters as $name => $value) {
            $normalizedName = ucfirst($name);
            $class = $this->namespace . "\\{$normalizedName}";

            if (!class_exists($class)) {
                continue;
            }

            if (gettype($value) === "string" && strlen($value)) {
                (new $class($this->query))->handle($value);
            } elseif (gettype($value) === "array" && count($value)) {
                (new $class($this->query))->handle($value);
            }
        }

        return $this->query;
    }
}
