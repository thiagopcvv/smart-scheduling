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

    public function getAll()
    {
        return $this->repository->getAll()->map(function ($user) {
            return [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'ativo' => $user->ativo,
                'login' => $user->login,
            ];
        });
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
