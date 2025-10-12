<?php

namespace App\Http\Resources\Truck;

use App\Http\Resources\Truck\TruckBaseResource;
use App\Http\Resources\Driver\DriverBaseResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TruckWithDriverResource extends TruckBaseResource
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
        ]);
    }
}
