<?php

namespace Tests\Unit\Services;

use App\Services\Freight\CalculateFreightInfoService;
use Tests\TestCase;

class CalculateFreightInfoServiceTest extends TestCase
{
    public function test_should_calculate_advance_correctly(): void
    {
        $expectedAdvance = round(3750 * (40 / 100), 2);

        $this->assertEquals($expectedAdvance, CalculateFreightInfoService::calculateAdvance(3750, 40));
    }

    public function test_should_calculate_driver_commission_correctly(): void
    {
        $expectedCommission = round(3750 * (15 / 100), 2);

        $this->assertEquals($expectedCommission, CalculateFreightInfoService::calculateDriverCommission(3750, 15));
    }
}
