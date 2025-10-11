<?php

namespace App\Http\Actions\Truck;

use App\Exceptions\HttpJsonResponseException;
use App\Models\Truck;
use Exception;
use Symfony\Component\HttpFoundation\Response;

class DetachDriverFromTruckAction
{
    private readonly Truck $truck;

    public function __construct(Truck $truck)
    {
        $this->truck = $truck;
    }

    public function execute(): void
    {
        try {
            $this->truck->update([
                'driver_id' => null
            ]);
        } catch (Exception $e) {
            throw new HttpJsonResponseException(
                trans('actions.truck.unable.delete'),
                Response::HTTP_INTERNAL_SERVER_ERROR
            );
        }
    }
}
