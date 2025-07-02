<?php

namespace Tests\Unit\Models\Truck;

use App\Models\Driver;
use App\Models\Fleet;
use App\Models\Truck;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TruckTest extends TestCase
{
    use RefreshDatabase;

    public function test_truck_belongs_to_fleet()
    {
        $fleet = Fleet::factory()->create();
        $truck = Truck::factory()->create([
            'fleet_id' => $fleet->id,
        ]);
        $this->assertInstanceOf(Fleet::class, $truck->fleet);
    }

    public function test_truck_can_have_a_driver()
    {
        $fleet = Fleet::factory()->create();
        $driver = Driver::factory()->create();
        $truck = Truck::factory()->create([
            'fleet_id' => $fleet->id,
            'driver_id' => $driver->id
        ]);

        $this->assertEquals($driver->id, $truck->driver->id);
    }
}
