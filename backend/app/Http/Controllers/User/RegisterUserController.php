<?php

namespace App\Http\Controllers\User;

use App\Http\Actions\User\RegisterUserAction;
use App\Http\Controllers\Controller;
use App\Http\Messages\FlashMessage;
use App\Http\Requests\User\RegisterUserRequest;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class RegisterUserController extends Controller
{
    public function register(RegisterUserRequest $request): JsonResponse
    {
        $data = $request->validated();

        (new RegisterUserAction(
            $data['name'],
            $data['cpf'],
            $data['email'],
            $data['password'],
            $data['is_manager']
        ))->execute();

        return response()->json(
            FlashMessage::success(trans_choice('flash_messages.success.registered.m', 1, [
                'model' => trans_choice('model.user', 1),
            ])),
            Response::HTTP_OK
        );
    }
}
