<?php

namespace App\Http\Controllers\Central;

use App\Http\Controllers\Controller;
use App\Services\Central\TenantService;
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
