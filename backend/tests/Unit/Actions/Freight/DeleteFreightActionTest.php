<?php

namespace Tests\Unit\Actions\Freight;

use App\Http\Actions\Freight\DeleteFreightAction;
use App\Models\Driver;
use App\Models\Fleet;
use App\Models\Freight;
use App\Models\Truck;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DeleteFreightActionTest extends TestCase
{
    use RefreshDatabase;

    public function test_should_delete_a_freight(): void
    {
        $fleet = Fleet::factory()->create();
        $driver = Driver::factory()->create();
        $truck = Truck::factory()->create(['fleet_id' => $fleet->id, 'driver_id' => $driver->id]);

        $freight = Freight::factory()->create([
            'fleet_id' => $fleet->id,
            'truck_id' => $truck->id,
            'driver_id' => $driver->id,
        ]);

        (new DeleteFreightAction($freight))->execute();

        $this->assertSoftDeleted('freights', [
            'id' => $freight->id,
        ]);
    }
}
