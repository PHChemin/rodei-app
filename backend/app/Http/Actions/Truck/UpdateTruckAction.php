<?php

namespace App\Http\Actions\Truck;

use App\Exceptions\HttpJsonResponseException;
use App\Models\Fleet;
use App\Models\Truck;
use Exception;
use Symfony\Component\HttpFoundation\Response;

class UpdateTruckAction
{
    private readonly Truck $truck;
    private readonly string $brand_name;
    private readonly string $model;
    private readonly string $license_plate;
    private readonly string $color;
    private readonly float $commission_percentage;
    
    public function __construct(Truck $truck, string $brand_name, string $model, string $license_plate, string $color, float $commission_percentage)
    {
        $this->truck = $truck;
        $this->brand_name = $brand_name;
        $this->model = $model;
        $this->license_plate = $license_plate;
        $this->color = $color;
        $this->commission_percentage = $commission_percentage;
    }

    public function execute(): Truck
    {
        try {
            $this->truck->update([
                'brand_name' => $this->brand_name,
                'model' => $this->model,
                'license_plate' => $this->license_plate,
                'color' => $this->color,
                'commission_percentage' => $this->commission_percentage,
            ]);

            return $this->truck;
        } catch (Exception $e) {
            throw new HttpJsonResponseException(
                trans('actions.truck.unable.update'),
                Response::HTTP_INTERNAL_SERVER_ERROR
            );
        }
    }
}
