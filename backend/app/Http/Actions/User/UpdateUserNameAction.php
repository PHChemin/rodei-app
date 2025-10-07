<?php

namespace App\Http\Actions\User;

use App\Exceptions\HttpJsonResponseException;
use App\Models\User;
use Exception;
use Symfony\Component\HttpFoundation\Response;

class UpdateUserNameAction
{
    public function __construct(
        public User $user,
        public string $name,
    ) {}

    public function execute(): User
    {
        try {
            $this->user->update(['name' => $this->name]);

            return $this->user;
        } catch (Exception $e) {
            throw new HttpJsonResponseException(
                trans('actions.user.unable.update'),
                Response::HTTP_INTERNAL_SERVER_ERROR
            );
        }
    }
}