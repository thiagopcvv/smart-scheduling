<?php

namespace App\Repositories\Tenant;

use App\Models\Tenant\Client;

class ClientRepository
{
    public function create(array $data): Client
    {
        return Client::create($data);
    }

    public function update(Client $client, array $data): Client
    {
        $client->update($data);
        return $client;
    }

    public function delete(Client $client): void
    {
        $client->delete();
    }

    public function find(int $id): ?Client
    {
        return Client::find($id);
    }

    public function all()
    {
        return Client::all();
    }
}
