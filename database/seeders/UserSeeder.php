<?php

namespace Database\Seeders;

use App\Models\Central\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
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
                'email' => 'thiagopiresdovalle@gmail.com'
            ],
            [
                'name' => 'Thiago Pires de Castro do Valle',
                'password' => Hash::make('123456'),
            ]);
    }
}
