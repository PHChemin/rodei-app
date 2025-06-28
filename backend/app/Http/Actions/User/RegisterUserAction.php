<?php

namespace App\Http\Actions\User;

use App\Exceptions\HttpJsonResponseException;
use App\Models\Driver;
use App\Models\Manager;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpFoundation\Response;

class RegisterUserAction
{
    private readonly string $name;
    private readonly string $cpf;
    private readonly string $email;
    private readonly string $password;
    private readonly bool $is_manager;

    public function __construct(string $name, string $cpf, string $email, string $password, bool $is_manager)
    {
        $this->name = $name;
        $this->cpf = $cpf;
        $this->email = $email;
        $this->password = $password;
        $this->is_manager = $is_manager;
    }

    public function execute(): User
    {
        try {
            return DB::transaction(function () {
                $user = User::create([
                    'name' => $this->name,
                    'cpf' => $this->cpf,
                    'email' => $this->email,
                    'password' => Hash::make($this->password)
                ]);

                $this->is_manager
                    ? Manager::create(['user_id' => $user->id])
                    : Driver::create(['user_id' => $user->id]);

                return $user;
            });
        } catch (Exception $e) {
            throw new HttpJsonResponseException(
                trans('actions.user.unable.register'),
                Response::HTTP_INTERNAL_SERVER_ERROR
            );
        }
    }
}
