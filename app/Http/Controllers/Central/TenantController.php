<?php

namespace App\Http\Controllers\Central;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use App\Models\Central\Tenant;
use Illuminate\Support\Facades\Artisan;

class TenantController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Central/Tenant/tenant-register', []);
    }

    public function store(Request $request)
    {
        $dados = $request->all();

        $tenant = Tenant::make([
            'id' => $dados['tenant_id'],
            'data' => [
                'db_name' => "smart_" . $dados['tenant_id'],
                'active' => true,
                'name' => $dados['name'],
                'domain' => $dados['domain'],
            ],
        ]);

        $tenant->save();

        $tenant->domains()->create([
            'domain' => $dados['domain'],
        ]);

        return response()->json(['message' => 'Tenant criado com sucesso!']);
    }

    public function update(Request $request, string $id)
    {
        //
    }
}
