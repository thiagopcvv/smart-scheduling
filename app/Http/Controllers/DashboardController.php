<?php

namespace App\Http\Controllers;

use App\Services\Central\TenantService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    protected TenantService $tenantService;

    public function __construct()
    {
        $this->tenantService = resolve(TenantService::class);
    }

    public function index(){
        return Inertia::render('Central/dashboard', ['tenants' => $this->tenantService->getAll()]);
    }
}
