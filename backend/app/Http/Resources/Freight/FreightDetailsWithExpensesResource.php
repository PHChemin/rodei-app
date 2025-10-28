<?php

namespace App\Http\Resources\Freight;

use App\Http\Resources\Expense\ExpenseBaseResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FreightDetailsWithExpensesResource extends FreightDetailsResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return array_merge(parent::toArray($request), [
            'expenses' => ExpenseBaseResource::collection($this->whenLoaded('expenses')),
        ]);
    }
}
