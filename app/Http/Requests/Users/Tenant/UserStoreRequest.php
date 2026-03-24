<?php

namespace App\Http\Requests\Users\Tenant;

use App\Models\Central\User;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class UserStoreRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'string',
                'lowercase',
                'email',
                'max:255'
            ],
            'cpf' => ['required', 'string', 'size:11', 'unique:users,cpf'],
            'password' => ['required', 'string', 'min:8'],
        ];
    }

    protected function prepareForValidation(): void
    {
        $this->merge(['password' => Hash::make($this->password)]);
    }

    public function messages(): array
    {
        return [
            'cpf.unique' => 'Já existe um usuário com este CPF.',
            'login.unique' => 'Este login já está sendo utilizado.',
        ];
    }
}
