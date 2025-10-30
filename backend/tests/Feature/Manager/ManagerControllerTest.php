<?php

namespace Tests\Feature\Manager;

use App\Models\Driver;
use App\Models\Expense;
use App\Models\Fleet;
use App\Models\Freight;
use App\Models\Manager;
use App\Models\Truck;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ManagerControllerTest extends TestCase
{
    use RefreshDatabase;

    private Manager $manager;

    public function setUp(): void
    {
        parent::setUp();

        $this->manager = Manager::factory()->create();
        $fleet = Fleet::factory()->for($this->manager)->create();
        $truck = Truck::factory()->for($fleet)->create();
        $freight = Freight::factory()->create([
            'total_amount' => 1000,
            'driver_commission' => 100,
            'date' => now()->subMonth()->format('Y-m-d'),
            'fleet_id' => $fleet->id,
            'truck_id' => $truck->id,
        ]);
        Expense::factory()->count(2)->create([
            'amount' => 100,
            'freight_id' => $freight->id
        ]);
    }

    public function test_manager_can_view_financial_statement()
    {
        $this->actingAs($this->manager->user);

        $response = $this->getJson(route('manager.finance'));

        $response->assertStatus(200);

        // Testing resource
        $response->assertJsonCount(6, 'data');
        $response->assertJsonPath('data.freights_count', 1);
        $response->assertJsonPath('data.expenses_count', 2);
        $response->assertJsonPath('data.total_revenue', 1000);
        $response->assertJsonPath('data.total_expenses', 300);
        $response->assertJsonPath('data.total_profit', 700);
        $response->assertJsonPath('data.last_month_profit', 700);
    }

    public function test_driver_cannot_view_manager_financial_statement()
    {
        $driver = Driver::factory()->create();

        $this->actingAs($driver->user);

        $response = $this->getJson(route('manager.finance'));

        $response->assertStatus(403);
    }
}
