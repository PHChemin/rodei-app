<?php

namespace Tests\Unit\Actions\Truck;

use App\Http\Actions\Truck\AttachDriverToTruckAction;
use App\Models\Driver;
use App\Models\Fleet;
use App\Models\Manager;
use App\Models\Truck;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AttachDriverToTruckActionTest extends TestCase
{
    use RefreshDatabase;

    public function test_attach_driver_to_truck()
    {
        $manager = Manager::factory()->create();
        $fleet = Fleet::factory()->create(['manager_id' => $manager->id]);
        $truck = Truck::factory()->create(['fleet_id' => $fleet->id]);
        $driver = Driver::factory()->create();

        (new AttachDriverToTruckAction($truck, $driver->user->cpf))->execute();

        $this->assertDatabaseHas('trucks', [
            'id' => $truck->id,
            'driver_id' => $driver->id,
        ]);
    }
}
