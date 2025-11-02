<?php

namespace App\Repositories\Tenant;

use Illuminate\Support\Facades\DB;
use App\Models\Tenant\User;

class UserRepository
{
    public function getAll()
    {
        return User::orderBy('created_at', 'desc')->get();
    }

    public function getById($id,)
    {
        return User::where('id', $id)->first();
    }

    public function store(array $data,): User
    {
        return User::create($data);
    }

    public function delete(int $id)
    {
        return User::find($id)->delete();
    }
}
