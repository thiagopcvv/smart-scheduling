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
    public function __construct(protected TenantService $tenantService)
    {}
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

            return response()->json(['message' => 'Tenant criado com sucesso!']);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()]);
        }
    }

    public function edit($id)
    {
        return Inertia::render('Central/Tenant/tenant-register', ['tenant' => new TenantResource(Tenant::where('id', $id)->first())]);
    }

    public function update(Request $request, string $id)
    {
        //
    }
}
