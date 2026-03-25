<?php

namespace App\Services\Tenant;

use App\Repositories\Tenant\ClientRepository;

class ClientService
{
    public function __construct(private ClientRepository $repository) {}

    public function create($data)
    {
        return $this->repository->create($data); 
    }

    public function update($id, $data)
    {
        $this->repository->update($id, $data); 
    }

    public function delete($id)
    {
        $this->repository->delete($id); 
    }

    public function find($id)
    {
        return $this->repository->find($id); 
    }

    public function getAll($filters)
    {
        if (data_get($filters, 'pagination')) {
            return $this->repository->getAll()->filterBy($filters)->paginate($filters['pagination']);
        }
        return $this->repository->getAll()->filterBy($filters)->paginate(10);
    }
}