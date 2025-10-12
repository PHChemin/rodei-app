<?php

namespace App\Http\Requests\Freights;

use App\Models\Freight;
use Illuminate\Foundation\Http\FormRequest;

class UpdateFreightRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $freight = $this->route('freight');

        return $this->user()->can('update', [Freight::class, $freight]);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'start_address' => ['required', 'string', 'max:255'],
            'end_address' => ['required', 'string', 'max:255'],
            'contractor_name' => ['required', 'string', 'max:255'],
            'date' => ['required', 'date'],
            'cargo_weight' => ['required', 'numeric', 'min:0'],
            'ton_price' => ['required', 'numeric', 'min:0'],
            'advance_percentage' => ['required', 'numeric', 'between:0,100'],
            'total_amount' => ['required', 'numeric', 'min:0'],
            'description' => ['nullable', 'string', 'max:255'],
        ];
    }
}
