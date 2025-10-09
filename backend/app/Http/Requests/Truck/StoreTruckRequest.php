<?php

namespace App\Http\Requests\Truck;

use App\Enums\TruckBrand;
use App\Enums\TruckColor;
use App\Models\Driver;
use App\Models\User;
use App\Rules\Cpf;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreTruckRequest extends FormRequest
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
            'brand_name' => ['required', 'string', Rule::in(TruckBrand::values())],
            'model' => ['required', 'string'],
            'license_plate' => ['required', 'string', 'size:7', 'unique:trucks,license_plate'],
            'color' => ['required', 'string', Rule::in(TruckColor::values())],
            'commission_percentage' => ['required', 'numeric', 'between:0,100'],
            'driver_cpf' => ['required', 'string', new Cpf()],
        ];
    }

    public function messages()
    {
        return [
            'brand_name.in' => 'A marca do caminhão deve ser uma opção válida.',
            'color.in' => 'A cor do caminhão deve ser uma opção válida.',
        ];
    }

    public function after(): array
    {
        return [
            function (Validator $validator) {
                if(! $validator->failed('driver_cpf')) {
                    $this->checkCpf($validator);
                }
            }
        ];
    }

    private function checkCpf(Validator $validator): void
    {
        $cpf = $this->input('driver_cpf');

        $user = User::where('cpf', $cpf)->first();

        if (! $user || ! $user->driver) {
            $validator->errors()->add('driver_cpf', trans('validation.custom.user.driver-not-found'));
            return;
        }

        if ($user->driver->truck) {
            $validator->errors()->add('driver_cpf', trans('validation.custom.user.driver-already-attached'));
        }
    }
}
