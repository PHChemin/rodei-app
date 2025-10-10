<?php

namespace App\Http\Resources\Freight;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Driver\DriverBaseResource;
use App\Http\Resources\Truck\TruckBaseResource;
use App\Http\Resources\Fleet\FleetBaseResource;

class FreightDetailsResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return array_merge(parent::toArray($request), [
            'driver' => DriverBaseResource::make($this->whenLoaded('driver')),
            'truck' => TruckBaseResource::make($this->whenLoaded('truck')),
            'fleet' => FleetBaseResource::make($this->whenLoaded('fleet')),
            'driver_commission' => $this->calculateDriverCommission(),
            'expenses_amount' => null,
            'profit' => null
        ]);
    }

    private function calculateDriverCommission(): ?float
    {
        return $this->resource->total_amount * ($this->resource->truck->driver_commission / 100);
    }

}
