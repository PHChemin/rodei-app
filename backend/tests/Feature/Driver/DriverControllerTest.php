<?php

namespace Tests\Feature\Driver;

use App\Models\Driver;
use App\Models\Fleet;
use App\Models\Freight;
use App\Models\Manager;
use App\Models\Truck;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class DriverControllerTest extends TestCase
{
    use RefreshDatabase;

    private Driver $driver;
    private Manager $manager;
    private Fleet $fleet;
    private Truck $truck;
    private Freight $freight;

    public function setUp(): void
    {
        parent::setUp();

        $this->driver = Driver::factory()->create();
        $this->manager = Manager::factory()->create();
        $this->fleet = Fleet::factory()->for($this->manager)->create();
        $this->truck = Truck::factory()->for($this->fleet)->create([
            'commission_percentage' => 10,
            'driver_id' => $this->driver->id
        ]);
        $this->freight = Freight::factory()->create([
            'date' => '2023-01-01',
            'fleet_id' => $this->fleet->id,
            'truck_id' => $this->truck->id,
            'driver_id' => $this->driver->id,
            'driver_commission' => 100
        ]);
    }

    // - - - - - - - - - - - - INDEX - - - - - - - - - - - - - - - - - - - - //

    public function test_driver_can_view_homepage()
    {
        $this->actingAs($this->driver->user);

        $response = $this->getJson(route('driver.index'));
        $response->assertStatus(200);
        $response->assertJsonCount(3, 'data');

        $response->assertJsonPath('data.driver.id', $this->driver->id);
        $response->assertJsonPath('data.truck.id', $this->truck->id);
        $response->assertJsonPath('data.last_freight.id', $this->freight->id);
    }

    public function test_driver_only_sees_last_freight()
    {
        $lastFreight = Freight::factory()->create([
            'date' => '2024-01-01',
            'fleet_id' => $this->fleet->id,
            'truck_id' => $this->truck->id,
            'driver_id' => $this->driver->id,
        ]);

        $this->actingAs($this->driver->user);

        $response = $this->getJson(route('driver.index'));
        $response->assertJsonPath('data.last_freight.id', $lastFreight->id);
    }

    public function test_manager_cannot_view_driver_homepage()
    {
        $this->actingAs($this->manager->user);

        $response = $this->getJson(route('driver.index'));
        $response->assertStatus(403);
    }

    // - - - - - - - - FREIGHT HISTORY - - - - - - - - - - - - - - - //

    public function test_driver_can_view_freight_history()
    {
        $this->actingAs($this->driver->user);

        $response = $this->getJson(route('driver.freight.history'));
        $response->assertStatus(200);
        $response->assertJsonCount(1, 'data');

        $response->assertJsonPath('data.0.id', $this->freight->id);
    }

    public function test_manager_cannot_view_driver_freight_history()
    {
        $this->actingAs($this->manager->user);

        $response = $this->getJson(route('driver.freight.history'));
        $response->assertStatus(403);
    }

    // - - - - - - - - - -  FINANCIAL STATEMENT - - - - - - - - - - - - - - //

    public function test_driver_can_view_financial_statement()
    {
        $this->actingAs($this->driver->user);
        $response = $this->getJson(route('driver.finance'));

        $response->assertStatus(200);

        // Resource test
        $response->assertJsonCount(4, 'data');
        $response->assertJsonPath('data.freights_count', 1);
        $response->assertJsonPath('data.commission_percentage', 10);
        $response->assertJsonPath('data.total_profit', 100);
        $response->assertJsonPath('data.last_month_profit', 0);
    }

    public function test_manager_cannot_view_driver_financial_statement()
    {
        $this->actingAs($this->manager->user);
        $response = $this->getJson(route('driver.finance'));
        
        $response->assertStatus(403);
    }
}
