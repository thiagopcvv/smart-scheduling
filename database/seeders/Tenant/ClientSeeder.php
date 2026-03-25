<?php

namespace Database\Seeders\Tenant;

use App\Models\Tenant\Client;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ClientSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Client::firstOrCreate([
            'nome' => 'Cliente Teste',
            'cpf' => '12345678901',
            'email' => 'emailteste@gmail.com',
            'telefone' => '1234567890',
            'rua' => 'Rua Teste',
            'bairro' => 'Bairro Teste',
            'cidade' => 'Cidade Teste',
            'uf' => 'UF',
        ]);
    }
}
