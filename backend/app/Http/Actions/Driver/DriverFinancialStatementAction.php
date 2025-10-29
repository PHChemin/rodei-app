<?php

namespace App\Http\Actions\Driver;

use App\Models\Driver;
use App\Models\Freight;
use Carbon\Carbon;
use Illuminate\Support\Collection;

class DriverFinancialStatementAction
{
    private readonly Driver $driver;

    public function __construct(Driver $driver)
    {
        $this->driver = $driver;
    }

    public function execute(): array
    {
        $freights = Freight::query()
            ->where('driver_id', $this->driver->id)
            ->with('expenses')
            ->get();

        return [
            'freights_count' => $freights->count(),
            'commission_percentage' => $this->driver->truck->commission_percentage ?? 0,
            'total_profit' => $freights->sum('driver_commission'),
            'last_month_profit' => $this->calculateLastMonthProfit($freights),
        ];
    }

    private function calculateLastMonthProfit(Collection $freights): float
    {
        $lastMonth = now()->subMonth()->month;
        $lastYear  = now()->subMonth()->year;

        $filtered = $freights->filter(fn ($freight) =>
            Carbon::parse($freight->date)->month === $lastMonth &&
            Carbon::parse($freight->date)->year  === $lastYear
        );

        return $filtered->sum('driver_commission');
    }
}
