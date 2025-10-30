<?php

namespace App\Http\Actions\Truck;

use App\Models\Truck;
use Carbon\Carbon;
use Illuminate\Support\Collection;

class TruckFinancialStatementAction
{
    private readonly Truck $truck;

    public function __construct(Truck $truck)
    {
        $this->truck = $truck;
    }

    public function execute(): array
    {
        $freights = $this->truck->freights()->with('expenses')->get();

        return [
            'freights_count' => $freights->count(),
            'expenses_count' => $this->calculateExpensesCount($freights),
            'total_revenue' => $freights->sum('total_amount'),
            'total_costs' => $this->aggregateCosts($freights),
            'total_profit' => $this->aggregateProfit($freights),
            'last_month_profit' => $this->lastMonthProfit($freights),
        ];
    }

    private function calculateExpensesCount(Collection $freights): int
    {
        return $freights->reduce(
            fn ($carry, $freight) => $carry + $freight->expenses->count(),
            0
        );
    }

    private function aggregateCosts(Collection $freights): float
    {
        return $freights->reduce(function ($carry, $freight) {
            return $carry
                + $freight->driver_commission
                + $freight->expenses->sum('amount');
        }, 0);
    }

    private function aggregateProfit(Collection $freights): float
    {
        return $freights->reduce(function ($carry, $freight) {
            return $carry
                + ($freight->total_amount
                - $freight->driver_commission
                - $freight->expenses->sum('amount'));
        }, 0);
    }

    private function lastMonthProfit(Collection $freights): float
    {
        $lastMonth = now()->subMonth()->month;
        $lastYear  = now()->subMonth()->year;

        $filtered = $freights->filter(fn ($freight) =>
            Carbon::parse($freight->date)->month === $lastMonth &&
            Carbon::parse($freight->date)->year  === $lastYear
        );

        return $this->aggregateProfit($filtered);
    }
}
