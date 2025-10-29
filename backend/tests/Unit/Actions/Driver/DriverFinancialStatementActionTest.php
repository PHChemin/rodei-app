<?php

namespace Tests\Unit\Actions\Driver;

use App\Http\Actions\Driver\DriverFinancialStatementAction;
use App\Models\Driver;
use App\Models\Fleet;
use App\Models\Freight;
use App\Models\Truck;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DriverFinancialStatementActionTest extends TestCase
{
    use RefreshDatabase;

    public function test_should_return_driver_financial_statement()
    {
        $driver = Driver::factory()->create();
        $fleet = Fleet::factory()->create();
        $truck = Truck::factory()->for($driver)->for($fleet)->create(['commission_percentage' => 10]);

        Freight::factory()->count(3)->create([
            'driver_commission' => 100,
            'fleet_id' => $fleet->id,
            'truck_id' => $truck->id,
            'driver_id' => $driver->id
        ]);

        Freight::factory()->create([
            'driver_commission' => 100,
            'date' => now()->subMonth()->format('Y-m-d'),
            'fleet_id' => $fleet->id,
            'truck_id' => $truck->id,
            'driver_id' => $driver->id
        ]);

        $statament = (new DriverFinancialStatementAction($driver))->execute();

        $this->assertEquals(4, $statament['freights_count']);
        $this->assertEquals(10, $statament['commission_percentage']);
        $this->assertEquals(400, $statament['total_profit']);
        $this->assertEquals(100, $statament['last_month_profit']);
    }
}
