<?php

namespace App\Http\Controllers\Central;

use App\Http\Controllers\Controller;
use App\Http\Resources\Central\TenantResource;
use App\Services\Central\TenantService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Central\Tenant;

class TenantController extends Controller
{
    protected $tenantService;

    public function __construct()
    {
        $this->tenantService = resolve(TenantService::class);
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Central/Tenant/tenant-register', []);
    }

    public function store(Request $request)
    {
        try {
           $data = $request->all();

           $this->tenantService->store($data);

            return redirect()->route('dashboard')->with('success', 'Cliente criado com sucesso.');
        } catch (\Exception $e) {
            return redirect()->route('tenant.register')->with('error', 'Erro ao criar cliente');
        }
    }

    public function edit($id)
    {
        return Inertia::render('Central/Tenant/tenant-register', ['tenant' => new TenantResource($this->tenantService->get($id))]);
    }

    public function update(Request $request)
    {
        try {
            $data = $request->all();
 
            $this->tenantService->update($data);
 
             return redirect()->route('dashboard')->with('success', 'Cliente atualizado com sucesso.');
         } catch (\Exception $e) {
             return redirect()->route('tenant.update')->with('error', 'Erro ao editar cliente');
         }
    }
}
