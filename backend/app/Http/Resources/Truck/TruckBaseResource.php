<?php

namespace App\Http\Resources\Truck;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TruckBaseResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'brand_name' => $this->brand_name,
            'model' => $this->model,
            'license_plate' => $this->license_plate,
            'color' => $this->color,
            'commission_percentage' => $this->commission_percentage,
        ];
    }
}
