<?php

namespace Database\Seeders;

use Database\Seeders\Tenant\UserSeeder;
use Illuminate\Database\Seeder;

class DatabaseTenantSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        if (config('app.env') === 'local') {
            $this->call([
                UserSeeder::class,
            ]);
        } else if (config('app.env') === 'production') {
            $this->call([

            ]);
        }
    }
}
