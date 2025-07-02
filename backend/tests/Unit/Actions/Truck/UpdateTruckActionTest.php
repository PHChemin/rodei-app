<?php

namespace Tests\Unit\Actions\Truck;

use App\Http\Actions\Truck\UpdateTruckAction;
use App\Models\Fleet;
use App\Models\Truck;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UpdateTruckActionTest extends TestCase
{
    use RefreshDatabase;

    public function test_it_updates_truck_correctly()
    {
        $fleet = Fleet::factory()->create();

        $truck = Truck::factory()->create([
            'fleet_id' => $fleet->id,
            'brand_name' => 'Scania',
            'model' => 'R450',
            'license_plate' => 'OLD1234',
            'color' => 'Preta',
            'commission_percentage' => 10.0,
        ]);

        $updatedTruck = (new UpdateTruckAction(
            truck: $truck,
            brand_name: 'Iveco',
            model: 'expedita',
            license_plate: 'OLD1234',
            color: 'Vermelha',
            commission_percentage: 81.96
        ))->execute();

        $this->assertEquals('Iveco', $updatedTruck->brand_name);
        $this->assertEquals('expedita', $updatedTruck->model);
        $this->assertEquals('Vermelha', $updatedTruck->color);
        $this->assertEquals(81.96, $updatedTruck->commission_percentage);
    }
}
