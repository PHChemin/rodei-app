<?php

namespace App\Http\Resources\Manager;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ManagerFinancialStatementResource extends JsonResource
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
            'expenses_count'    => $this['expenses_count'],
            'total_revenue'     => $this['total_revenue'],
            'total_expenses'       => $this['total_expenses'],
            'total_profit'      => $this['total_profit'],
            'last_month_profit' => $this['last_month_profit'],
        ];
    }
}
