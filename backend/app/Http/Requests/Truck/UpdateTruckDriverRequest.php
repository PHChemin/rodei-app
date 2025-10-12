<?php

namespace App\Http\Requests\Truck;

use App\Rules\Cpf;
use App\Rules\DriverNotAttachedToTruck;
use Illuminate\Foundation\Http\FormRequest;

class UpdateTruckDriverRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $fleet = $this->route('fleet');

        return $fleet && $this->user()->can('truck', $fleet);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'driver_cpf' => ['required', 'string', new Cpf(), new DriverNotAttachedToTruck()],
        ];
    }
}
