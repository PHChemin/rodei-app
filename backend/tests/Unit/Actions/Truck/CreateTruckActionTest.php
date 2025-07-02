<?php

namespace Tests\Unit\Actions\Truck;

use App\Http\Actions\Truck\CreateTruckAction;
use App\Models\Fleet;
use App\Models\Truck;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CreateTruckActionTest extends TestCase
{
    use RefreshDatabase;

    public function test_it_creates_truck_correctly()
    {
        $truck = (new CreateTruckAction(
            fleet: Fleet::factory()->create(),
            brand_name: 'Scania',
            model: 'R450',
            license_plate: 'DEF5678',
            color: 'Azul',
            commission_percentage: 15.5
        ))->execute();

        $this->assertInstanceOf(Truck::class, $truck);
        $this->assertDatabaseHas('trucks', ['license_plate' => 'DEF5678']);
    }
}
