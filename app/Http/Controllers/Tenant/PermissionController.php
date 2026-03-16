<?php

namespace App\Http\Controllers\Tenant;

use App\Http\Controllers\Controller;
use App\Services\Tenant\PermissionService;
use Inertia\Inertia;
use Illuminate\Http\Request;

class PermissionController extends Controller
{
    private $service;

    public function __construct()
    {
        $this->service = resolve(PermissionService::class);
    }

    public function index(Request $request)
    {
        $roles = $this->service->getAllRoles($request->all());
        return Inertia::render('Tenant/Permissions/index', ['roles' => $roles]);
    }
}
