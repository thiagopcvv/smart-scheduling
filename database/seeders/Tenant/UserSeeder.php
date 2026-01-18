<?php

namespace Database\Seeders\Tenant;

use App\Models\Tenant\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::firstOrCreate(
            [
                "login" => "03549637160",
                "email" => "thiagopiresdovalle@gmail.com"
            ],
            [
                "name" => "Thiago Pires de Castro do Valle",
                "password" => Hash::make("123456"),
                "cpf" => "03549637160",
                'ativo' => true,
            ]);
    }
}
