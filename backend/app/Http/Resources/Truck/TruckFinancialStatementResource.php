<?php

namespace App\Http\Resources\Truck;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TruckFinancialStatementResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'freights_count' => $this['freights_count'],
            'expenses_count' => $this['expenses_count'],
            'total_revenue' => $this['total_revenue'],
            'total_costs' => $this['total_costs'],
            'total_profit' => $this['total_profit'],
            'last_month_profit' => $this['last_month_profit'],
        ];
    }
}
