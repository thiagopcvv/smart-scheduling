<?php

namespace App\Http\Requests\Users\Tenant;

use App\Models\Central\User;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UserUpdateRequest extends FormRequest
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
            'cpf' => ['required', 'string', 'size:11'],
            'password' => ['nullable', 'min:8'],
        ];
    }
}
