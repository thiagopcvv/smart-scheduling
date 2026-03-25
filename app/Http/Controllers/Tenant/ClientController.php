<?php

namespace App\Http\Controllers\Tenant;

use App\Http\Controllers\Controller;
use App\Http\Requests\Tenant\ClientRequest;
use App\Models\Tenant\Client;
use App\Services\Tenant\ClientService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClientController extends Controller
{
    public function __construct(private ClientService $service) {}

    public function index(Request $request)
    {
        $filters = $request->all();
        $clients = $this->service->getAll($filters);

        return Inertia::render('Tenant/Client/index', ['clients' => $clients]); 
    }

    public function create()
    {
        return Inertia::render('Tenant/Client/create'); 
    }

    public function store(ClientRequest $request)
    {
        $this->service->create($request->validated());
        return redirect()->route('tenant-clients')->with('success', 'Cliente cadastrado com sucesso!');
    }

    public function edit(Client $client)
    {
        return Inertia::render('Tenant/Client/edit', ['client' => $client]);
    }

    public function update(ClientRequest $request, Client $client)
    {
        $this->service->update($client->id, $request->validated());
        return redirect()->route('tenant-clients')->with('success', 'Cliente atualizado com sucesso!');
    }

    public function delete($id)
    {
        $this->service->delete($id);
        return redirect()->route('tenant-clients')->with('success', 'Cliente removido com sucesso!');
    }
}
