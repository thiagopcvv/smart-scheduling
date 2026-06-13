<?php

namespace App\Repositories\Tenant;

use App\Models\Tenant\Exam;

class ExamRepository implements ExamRepositoryInterface
{
    public function paginate(array $filters = [])
    {
        $query = Exam::query();
        
        if (!empty($filters)) {
            $query->filterBy($filters);
        }

        return $query->orderBy('data_exame', 'desc')->paginate(data_get($filters, 'per_page', 10));
    }

    public function findById(int $id)
    {
        return Exam::findOrFail($id);
    }

    public function create(array $data)
    {
        return Exam::create($data);
    }

    public function update(int $id, array $data)
    {
        $exam = $this->findById($id);
        $exam->update($data);
        return $exam;
    }

    public function delete(int $id)
    {
        $exam = $this->findById($id);
        $exam->delete();
        return true;
    }
}
