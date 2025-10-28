<?php

namespace App\Http\Requests\Freights;

use App\Models\Freight;
use Illuminate\Foundation\Http\FormRequest;

class UploadFreightRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $fleetId = $this->route('fleet')->id;
        $truckId = $this->route('truck')->id;

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
            'document' => ['required', 'file', 'mimes:pdf,jpg,png', 'max:10240'],
        ];
    }
}
