<?php

namespace App\Http\Resources\Freight;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Driver\DriverBaseResource;
use App\Http\Resources\Expense\ExpenseBaseResource;
use App\Http\Resources\Truck\TruckBaseResource;
use App\Http\Resources\Fleet\FleetBaseResource;
use App\Services\Freight\CalculateFreightInfoService;

class FreightDetailsResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $expensesAmount = CalculateFreightInfoService::calculateExpenses($this->id);
        $profit = CalculateFreightInfoService::calculateProfit($this->total_amount, $expensesAmount, $this->driver_commission);

        return array_merge(parent::toArray($request), [
            'driver' => DriverBaseResource::make($this->whenLoaded('driver')),
            'truck' => TruckBaseResource::make($this->whenLoaded('truck')),
            'fleet' => FleetBaseResource::make($this->whenLoaded('fleet')),
            'expenses_amount' => $expensesAmount,
            'profit' => $profit,
        ]);
    }
}
