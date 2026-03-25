<?php

namespace App\Repositories\Tenant;

use App\Models\Tenant\Client;

class ClientRepository
{
    public function create(array $data): Client
    {
        return Client::create($data);
    }

    public function update($id, array $data)
    {
        Client::find($id)->update($data);
    }

    public function delete($id)
    {
        Client::find($id)->delete();
    }

    public function find($id)
    {
        return Client::find($id);
    }

    public function getAll()
    {
        return Client::orderBy('created_at', 'desc');
    }
}
