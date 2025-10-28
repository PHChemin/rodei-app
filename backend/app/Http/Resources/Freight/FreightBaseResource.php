<?php

namespace App\Http\Resources\Freight;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FreightBaseResource extends JsonResource
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
            'start_address' => $this->start_address,
            'end_address' => $this->end_address,
            'contractor_name' => $this->contractor_name,
            'date' => $this->date,
            'cargo_weight' => $this->cargo_weight,
            'ton_price' => $this->ton_price,
            'advance' => $this->advance,
            'advance_percentage' => $this->advance_percentage,
            'driver_commission' => $this->driver_commission,
            'total_amount' => $this->total_amount,
            'description' => $this->description,
            'document_path' => $this->document_path,
            'fleet_id' => $this->fleet_id,
            'truck_id' => $this->truck_id,
            'driver_id' => $this->driver_id,
        ];
    }
}
