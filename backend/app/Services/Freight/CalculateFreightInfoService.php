<?php

namespace App\Services\Freight;

use App\Models\Expense;

class CalculateFreightInfoService
{
    public static function calculateAdvance(float|int $totalAmount, float|int $percentage): float|int
    {
        return $totalAmount * ($percentage / 100);
    }

    public static function calculateDriverCommission(float|int $totalAmount, float|int $commissionPercentage): float|int
    {
        return round($totalAmount * ($commissionPercentage / 100), 2);
    }

    public static function calculateExpenses(int $freightId): float
    {
        return Expense::where('freight_id', $freightId)->sum('amount');
    }

    public static function calculateProfit(float|int $freightAmount, float|int $expensesAmount, float|int $driverCommission): float
    {
        return round($freightAmount - $expensesAmount - $driverCommission, 2);
    }
}
