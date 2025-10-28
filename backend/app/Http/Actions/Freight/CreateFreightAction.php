<?php

namespace App\Http\Actions\Freight;

use App\Exceptions\HttpJsonResponseException;
use App\Models\Freight;
use App\Models\Truck;
use App\Services\Freight\CalculateFreightInfoService;
use Exception;
use Symfony\Component\HttpFoundation\Response;

class CreateFreightAction
{
    private readonly string $start_address;
    private readonly string $end_address;
    private readonly string $contractor_name;
    private readonly string $date;
    private readonly int|float $cargo_weight;
    private readonly int|float $ton_price;
    private readonly int|float $advance_percentage;
    private readonly int|float $total_amount;
    private readonly ?string $description;
    private readonly int $fleet_id;
    private readonly Truck $truck;
    private readonly int $driver_id;
    
    public function __construct(
        string $start_address,
        string $end_address,
        string $contractor_name,
        string $date,
        float $cargo_weight,
        float $ton_price,
        float $advance_percentage,
        float $total_amount,
        ?string $description,
        int $fleet_id,
        Truck $truck,
        int $driver_id,
        )
    {
        $this->start_address = $start_address;
        $this->end_address = $end_address;
        $this->contractor_name = $contractor_name;
        $this->date = $date;
        $this->cargo_weight = $cargo_weight;
        $this->ton_price = $ton_price;
        $this->advance_percentage = $advance_percentage;
        $this->total_amount = $total_amount;
        $this->description = $description;
        $this->fleet_id = $fleet_id;
        $this->truck = $truck;
        $this->driver_id = $driver_id;
    }

    public function execute(): Freight
    {
        try {
            return Freight::create([
                'start_address' => $this->start_address,
                'end_address' => $this->end_address,
                'contractor_name' => $this->contractor_name,
                'date' => $this->date,
                'cargo_weight' => $this->cargo_weight,
                'ton_price' => $this->ton_price,
                'advance_percentage' => $this->advance_percentage,
                'advance' => CalculateFreightInfoService::calculateAdvance($this->total_amount, $this->advance_percentage),
                'driver_commission' => CalculateFreightInfoService::calculateDriverCommission($this->total_amount, $this->truck->commission_percentage),
                'total_amount' => $this->total_amount,
                'description' => $this->description,
                'fleet_id' => $this->fleet_id,
                'truck_id' => $this->truck->id,
                'driver_id' => $this->driver_id
            ]);
        } catch (Exception $e) {
            throw new HttpJsonResponseException(
                trans('actions.freight.unable.create'),
                Response::HTTP_INTERNAL_SERVER_ERROR
            );
        }
    }
}
