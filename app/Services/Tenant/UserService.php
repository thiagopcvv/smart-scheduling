<?php

namespace App\Services\Tenant;

use App\Repositories\Tenant\UserRepository;

class UserService
{
    protected $repository;

    public function __construct()
    {
        $this->repository = resolve(UserRepository::class);
    }

    public function getAll($filters)
    {
        if (data_get($filters, 'pagination')) {
            return $this->repository->getAll()->filterBy($filters)->paginate($filters['pagination']);
        }
        return $this->repository->getAll()->filterBy($filters)->paginate(10);
    }

    public function get($id)
    {
        return $this->repository->getById($id);
    }

    public function store(array $data)
    {
        return $this->repository->store($data);
    }

    public function delete(int $id)
    {
        return $this->repository->delete($id);
    }

    public function update(array $data)
    {
        return $this->repository->update($data);
    }
}
