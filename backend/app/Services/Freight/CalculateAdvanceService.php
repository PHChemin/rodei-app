<?php

namespace App\Services\Freight;

class CalculateAdvanceService
{
    public static function calculate(float $totalAmount, float $percentage): float
    {
        return ($totalAmount * $percentage) / 100;
    }
}
