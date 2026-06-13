<?php

namespace App\Repositories\Tenant;

interface ExamRepositoryInterface
{
    public function paginate(array $filters = []);
    public function findById(int $id);
    public function create(array $data);
    public function update(int $id, array $data);
    public function delete(int $id);
}
