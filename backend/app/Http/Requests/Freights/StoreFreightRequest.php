<?php

namespace App\Http\Requests\Freights;

use App\Models\Freight;
use Illuminate\Foundation\Http\FormRequest;

class StoreFreightRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $fleetId = $this->input('fleet_id');
        $truckId = $this->input('truck_id');

        return $this->user()->can('create', [Freight::class, $fleetId, $truckId]);
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
            'cargo_weight' => ['required', 'numeric', 'gt:0'],
            'ton_price' => ['required', 'numeric', 'gt:0'],
            'advance_percentage' => ['required', 'numeric', 'between:1,100'],
            'total_amount' => ['required', 'numeric', 'min:0'],
            'description' => ['nullable', 'string', 'max:255'],
            'fleet_id' => ['required', 'exists:fleets,id'],
            'truck_id' => ['required', 'exists:trucks,id'],
            'document' => ['nullable', 'file', 'mimes:pdf,jpg,png', 'max:10240'],
        ];
    }
}
