<?php

namespace Tests\Unit\Actions\Truck;

use App\Http\Actions\Truck\TruckFinancialStatementAction;
use App\Models\Expense;
use App\Models\Fleet;
use App\Models\Freight;
use App\Models\Manager;
use App\Models\Truck;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TruckFinancialStatementActionTest extends TestCase
{
    use RefreshDatabase;

    public function test_should_return_truck_financial_statement()
    {
        $manager = Manager::factory()->create();
        $fleet = Fleet::factory()->for($manager)->create();
        $truck = Truck::factory()->for($fleet)->create();
        $freight = Freight::factory()->create([
            'driver_commission' => 100,
            'total_amount' => 1000,
            'date' => now()->subMonth()->format('Y-m-d'),
            'fleet_id' => $fleet->id,
            'truck_id' => $truck->id,
        ]);

        Expense::factory()->count(2)->create([
            'amount' => 100,
            'freight_id' => $freight->id,
        ]);

        // Other Truck
        Freight::factory()->count(3)->create([
            'driver_commission' => 100,
            'total_amount' => 1000,
            'fleet_id' => $fleet->id,
        ]);

        $statement = (new TruckFinancialStatementAction($truck))->execute();

        $this->assertEquals(1, $statement['freights_count']);
        $this->assertEquals(2, $statement['expenses_count']);
        $this->assertEquals(1000, $statement['total_revenue']);
        $this->assertEquals(300, $statement['total_costs']);
        $this->assertEquals(700, $statement['total_profit']);
        $this->assertEquals(700, $statement['last_month_profit']);
    }
}
