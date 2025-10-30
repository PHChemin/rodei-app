<?php

namespace App\Http\Resources\Driver;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DriverFinancialStatementResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'freights_count'    => $this['freights_count'],
            'commission_percentage'    => $this['commission_percentage'],
            'total_profit'      => $this['total_profit'],
            'last_month_profit' => $this['last_month_profit'],
        ];
    }
}
