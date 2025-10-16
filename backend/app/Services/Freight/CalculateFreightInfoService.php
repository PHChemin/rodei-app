<?php

namespace App\Services\Freight;

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
}
