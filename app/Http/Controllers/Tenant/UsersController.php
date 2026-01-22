<?php

namespace App\Http\Controllers\Tenant;

use App\Http\Controllers\Controller;
use App\Models\Tenant\User;
use App\Services\Tenant\UserService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UsersController extends Controller
{
    private $service;

    public function __construct()
    {
        $this->service = resolve(UserService::class);
    }

    public function index(Request $request)
    {
        $users = $this->service->getAll($request->all());

        return Inertia::render('Tenant/Users/index', ['users' => $users]);
    }

    public function edit(User $user)
    {
        return Inertia::render('Tenant/Users/create', ['user' => $user]);
    }

    public function delete($id,)
    {
        try {
            $this->service->delete($id);
            response()->json(['status' => 'success'], 200);
        } catch (\Exception $e) {
            response()->json(['error' => $e->getMessage()]);
        }
    }
}
