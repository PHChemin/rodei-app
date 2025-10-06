<?php

namespace App\Http\Actions\User;

use App\Exceptions\HttpJsonResponseException;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Response;

class UpdateUserPasswordAction
{
    public function __construct(
        private User $user,
        private string $password,
        private string $newPassword
    ) {}

    public function execute(): User
    {
        $this->validatePassword();

        try {
            return DB::transaction(function () {
                $this->changePassword();

                return $this->user;
            });
        } catch (Exception $e) {
            $this->handleExceptions($e);
        }
    }

    private function validatePassword(): void
    {
        throw_if(!Hash::check($this->password, $this->user->password), new HttpJsonResponseException(
            trans('actions.user.unable.verify_password'),
            Response::HTTP_UNPROCESSABLE_ENTITY
        ));
    }

    private function changePassword(): void
    {
        $this->user->forceFill([
            'password' => Hash::make($this->newPassword),
            'remember_token' => Str::random(60),
        ])->save();
    }

    /**
    * @throws HttpJsonResponseException
    */
    private function handleExceptions(Exception $e): never
    {
        throw new HttpJsonResponseException(
            trans('actions.user.unable.update_password'),
            Response::HTTP_INTERNAL_SERVER_ERROR
        );
    }
}
