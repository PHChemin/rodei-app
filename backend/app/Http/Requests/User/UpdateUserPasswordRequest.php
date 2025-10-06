<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Illuminate\Validation\Validator;

class UpdateUserPasswordRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'password' => [
                'required',
            ],
            'new_password' => [
                'required',
                Password::defaults(),
            ],
            'new_password_confirmation' => [
                'required',
                'same:new_password',
            ],
        ];
    }

    /**
     * Get the "after" validation callables for the request.
     */
    public function after(): array
    {
        return [
            function (Validator $validator) {
                if (! $validator->failed('password')) {
                    $this->checkPassword($validator);
                }
            },
        ];
    }

    /**
     * Checks that the password entered corresponds to the current user's password.
     */
    private function checkPassword(Validator $validator): void
    {
        if (! Hash::check($this->password, $this->user()->password)) {
            $validator->errors()->add(
                'password',
                trans('validation.custom.auth.wrong-password')
            );
        }
    }
}
