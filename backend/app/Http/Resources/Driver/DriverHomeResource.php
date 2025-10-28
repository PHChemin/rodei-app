<?php

namespace App\Http\Resources\Driver;

use App\Http\Resources\Freight\FreightBaseResource;
use App\Http\Resources\Truck\TruckBaseResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DriverHomeResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'driver' => DriverBaseResource::make($this->driver),
            'truck' => $this->truck ? TruckBaseResource::make($this->truck) : null,
            'last_freight' => $this->last_freight ? FreightBaseResource::make($this->last_freight) : null,
        ];
    }
}
