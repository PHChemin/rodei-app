<?php

namespace Tests\Unit\Actions\Truck;

use App\Http\Actions\Truck\DeleteTruckAction;
use App\Models\Fleet;
use App\Models\Truck;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DeleteTruckActionTest extends TestCase
{
    use RefreshDatabase;

    public function test_it_deletes_truck_correctly()
    {
        $fleet = Fleet::factory()->create();
        $truck = Truck::factory()->create([
            'fleet_id' => $fleet->id,
        ]);

        (new DeleteTruckAction($truck))->execute();

        $this->assertDatabaseMissing('trucks', ['id' => $truck->id]);
    }
}
