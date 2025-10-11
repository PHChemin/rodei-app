<?php

namespace Tests\Unit\Actions\Truck;

use App\Http\Actions\Truck\DetachDriverFromTruckAction;
use App\Models\Driver;
use App\Models\Fleet;
use App\Models\Manager;
use App\Models\Truck;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DetachDriverFromTruckActionTest extends TestCase
{
    use RefreshDatabase;

    public function test_detach_driver_from_truck()
    {
        $manager = Manager::factory()->create();
        $driver = Driver::factory()->create();
        $fleet = Fleet::factory()->create(['manager_id' => $manager->id]);
        $truck = Truck::factory()->create([
            'fleet_id' => $fleet->id,
            'driver_id' => $driver->id
        ]);

        $this->assertDatabaseHas('trucks', [
            'id' => $truck->id,
            'driver_id' => $driver->id,
        ]);

        (new DetachDriverFromTruckAction($truck))->execute();

        $this->assertDatabaseHas('trucks', [
            'id' => $truck->id,
            'driver_id' => null,
        ]);
    }
}
