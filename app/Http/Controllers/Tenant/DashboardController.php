<?php

namespace App\Http\Controllers\Tenant;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {

        $permissions = auth()->user()->getAllPermissions()->pluck('name');
        return Inertia::render('Tenant/Dashboard/index', ['permissions' => $permissions ?? []]);
    }
}
