<?php

namespace App\Rules;

use App\Models\Driver;
use App\Models\User;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class DriverNotAttachedToTruck implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string, ?string=): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $user = User::where('cpf', $value)->first();

        if(! $user || $user->isManager()){
            $fail(trans('validation.custom.user.driver-not-found'));
            return;
        }

        if ($user->driver->truck) {
            $fail(trans('validation.custom.user.driver-already-attached'));
        }
    }
}
