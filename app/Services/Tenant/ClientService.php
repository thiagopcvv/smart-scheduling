<?php

namespace App\Services\Tenant;

use App\Repositories\Tenant\ClientRepository;

class ClientService
{
    public function __construct(private ClientRepository $repository) {}

    public function create($data)
    {
        $this->repository->create($data); 
    }

    public function update($clientId, $data)
    {
        $this->repository->update($clientId, $data); 
    }

    public function delete($clientId)
    {
        $this->repository->delete($clientId); 
    }

    public function find($clientId)
    {
        $this->repository->find($clientId); 
    }

    public function all()
    {
        $this->repository->all(); 
    }
}