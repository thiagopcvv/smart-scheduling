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

    public function update($clientId, $data)
    {
        $client = $this->repository->find($clientId);
        return $this->repository->update($client, $data); 
    }

    public function delete($clientId)
    {
        $client = $this->repository->find($clientId);
        $this->repository->delete($client); 
    }

    public function find($clientId)
    {
        return $this->repository->find($clientId); 
    }

    public function getAll($filters)
    {
        if (data_get($filters, 'pagination')) {
            return $this->repository->getAll()->filterBy($filters)->paginate($filters['pagination']);
        }
        return $this->repository->getAll()->filterBy($filters)->paginate(10);
    }
}