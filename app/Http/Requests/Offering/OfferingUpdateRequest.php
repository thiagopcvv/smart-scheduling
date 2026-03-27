<?php

namespace App\Http\Requests\Offering;

use Illuminate\Foundation\Http\FormRequest;

class OfferingUpdateRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'descricao' => ['required', 'string', 'max:255'],
            'duracao' => ['nullable', 'integer'],
            'preco' => ['required', 'numeric', 'min:0'],
            'ativo' => ['nullable', 'boolean'],
        ];
    }
}
