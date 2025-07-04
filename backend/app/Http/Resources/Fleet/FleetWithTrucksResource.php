<?php

namespace App\Http\Resources\Fleet;

use App\Http\Resources\Truck\TruckBaseResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FleetWithTrucksResource extends FleetBaseResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return array_merge(parent::toArray($request), [
            'trucks' => TruckBaseResource::collection($this->whenLoaded('trucks')),
        ]);
    }
}
