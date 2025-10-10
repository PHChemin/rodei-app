<?php

namespace App\Services\Freight;

class CalculateAdvanceService
{
    public static function calculate(float|int $totalAmount, float|int $percentage): float|int
    {
        return $totalAmount * ($percentage / 100);
    }
}
