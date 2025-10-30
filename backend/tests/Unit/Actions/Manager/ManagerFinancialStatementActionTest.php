<?php

namespace Tests\Unit\Actions\Manager;

use App\Http\Actions\Manager\ManagerFinancialStatementAction;
use App\Models\Expense;
use App\Models\Fleet;
use App\Models\Freight;
use App\Models\Manager;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ManagerFinancialStatementActionTest extends TestCase
{
    use RefreshDatabase;

    public function test_should_return_manager_financial_statement()
    {
        $manager = Manager::factory()->create();
        $fleet = Fleet::factory()->for($manager)->create();
        $freight = Freight::factory()->create([
            'driver_commission' => 100,
            'total_amount' => 1000,
            'date' => now()->subMonth()->format('Y-m-d'),
            'fleet_id' => $fleet->id,
        ]);
        Freight::factory()->count(3)->create([
            'driver_commission' => 100,
            'total_amount' => 1000,
            'fleet_id' => $fleet->id,
        ]);
        Expense::factory()->count(2)->create([
            'amount' => 100,
            'freight_id' => $freight->id,
        ]);

        $statement = (new ManagerFinancialStatementAction($manager->id))->execute();

        $this->assertEquals(4, $statement['freights_count']);
        $this->assertEquals(2, $statement['expenses_count']);
        $this->assertEquals(4000, $statement['total_revenue']);
        $this->assertEquals(600, $statement['total_expenses']);
        $this->assertEquals(3400, $statement['total_profit']);
        $this->assertEquals(700, $statement['last_month_profit']);
    }
}
