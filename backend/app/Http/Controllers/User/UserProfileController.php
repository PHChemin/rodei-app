<?php

namespace App\Http\Controllers\User;

use App\Http\Actions\User\UpdateUserNameAction;
use App\Http\Actions\User\UpdateUserPasswordAction;
use App\Http\Controllers\Controller;
use App\Http\Messages\FlashMessage;
use App\Http\Requests\User\UpdateUserNameRequest;
use App\Http\Requests\User\UpdateUserPasswordRequest;
use App\Http\Resources\User\UserLoginResource;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class UserProfileController extends Controller
{
    public function profile(): JsonResponse
    {
        return response()->json(
            new UserLoginResource(request()->user()),
            Response::HTTP_OK
        );
    }

    public function updateName(UpdateUserNameRequest $request): JsonResponse
    {
        (new UpdateUserNameAction(
            request()->user(),
            $request->name,
        ))->execute();

        return response()->json(
            FlashMessage::success(trans_choice('flash_messages.success.updated.m', 1, [
                'model' => trans_choice('model.user', 1),
            ])),
            Response::HTTP_OK
        );
    }

    public function updatePassword(UpdateUserPasswordRequest $request): JsonResponse
    {
        (new UpdateUserPasswordAction(
            request()->user(),
            $request->password,
            $request->new_password
        ))->execute();

        return response()->json(
            FlashMessage::success(trans_choice('flash_messages.success.updated.m', 1, [
                'model' => trans_choice('model.user', 1),
            ])),
            Response::HTTP_OK
        );
    }
}
