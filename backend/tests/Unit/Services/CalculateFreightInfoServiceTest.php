<?php

namespace Tests\Unit\Services;

use App\Models\Expense;
use App\Models\Freight;
use App\Services\Freight\CalculateFreightInfoService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CalculateFreightInfoServiceTest extends TestCase
{
    use RefreshDatabase;

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

    public function test_should_calculate_expenses_correctly(): void
    {
        $freight = Freight::factory()->create();
        Expense::factory()->count(5)->create([
            'freight_id' => $freight->id,
            'amount' => 100
        ]);

        $this->assertEquals(500, CalculateFreightInfoService::calculateExpenses($freight->id));
    }

    public function test_should_calculate_profit_correctly(): void
    {
        $expectedProfit = round(3750 - 500 - 750, 2);

        $this->assertEquals($expectedProfit, CalculateFreightInfoService::calculateProfit(3750, 500, 750));
    }
}
