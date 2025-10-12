<?php

namespace App\Http\Actions\Truck;

use App\Exceptions\HttpJsonResponseException;
use App\Models\Driver;
use App\Models\Truck;
use App\Models\User;
use Exception;
use Symfony\Component\HttpFoundation\Response;

class AttachDriverToTruckAction
{
    private readonly Truck $truck;
    private readonly string $driverCpf;

    public function __construct(Truck $truck, string $driverCpf)
    {
        $this->truck = $truck;
        $this->driverCpf = $driverCpf;
    }

    public function execute()
    {
        try{
            $user = User::where('cpf', $this->driverCpf)->first();
            $this->truck->driver()->associate($user->driver)->save();
        } catch (Exception $e) {
            throw new HttpJsonResponseException(
                trans('actions.truck.unable.update'),
                Response::HTTP_INTERNAL_SERVER_ERROR
            );
        }
    }
}