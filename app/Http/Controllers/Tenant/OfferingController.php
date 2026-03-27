<?php

namespace App\Http\Controllers\Tenant;

use App\Http\Controllers\Controller;
use App\Http\Requests\Offering\OfferingStoreRequest;
use App\Http\Requests\Offering\OfferingUpdateRequest;
use App\Models\Tenant\Offering;
use App\Services\Tenant\OfferingService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OfferingController extends Controller
{
    public function __construct(private OfferingService $service) {}

    public function index(Request $request)
    {
        $filters = $request->all();
        $offerings = $this->service->getAll($filters);

        return Inertia::render('Tenant/Offering/index', ['offerings' => $offerings]); 
    }

    public function create()
    {
        return Inertia::render('Tenant/Offering/create'); 
    }

    public function store(OfferingStoreRequest $request)
    {
        $this->service->create($request->validated());
        return redirect()->route('tenant-offerings')->with('success', 'Serviço cadastrado com sucesso!');
    }

    public function edit(Offering $offering)
    {
        return Inertia::render('Tenant/Offering/edit', ['offering' => $offering]);
    }

    public function update(OfferingUpdateRequest $request, Offering $offering)
    {
        $this->service->update($offering->id, $request->validated());
        return redirect()->route('tenant-offerings')->with('success', 'Serviço atualizado com sucesso!');
    }

    public function delete($id)
    {
        $this->service->delete($id);
        return redirect()->route('tenant-offerings')->with('success', 'Serviço removido com sucesso!');
    }
}
