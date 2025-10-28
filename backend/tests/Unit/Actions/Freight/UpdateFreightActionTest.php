<?php

namespace Tests\Unit\Actions\Freight;

use App\Http\Actions\Freight\UpdateFreightAction;
use App\Models\Driver;
use App\Models\Fleet;
use App\Models\Freight;
use App\Models\Truck;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UpdateFreightActionTest extends TestCase
{
    use RefreshDatabase;

    public function test_should_update_freight(): void
    {
        $fleet = Fleet::factory()->create();
        $driver = Driver::factory()->create();
        $truck = Truck::factory()->create([
            'fleet_id' => $fleet->id,
            'driver_id' => $driver->id,
            'commission_percentage' => 15
        ]);

        $freight = Freight::factory()->create([
            'fleet_id' => $fleet->id,
            'truck_id' => $truck->id,
            'driver_id' => $driver->id,
        ]);

        $updatedFreight = (new UpdateFreightAction(
            $freight,
            'Guarapuava',
            'Curitiba',
            'Transportadora Exemplo',
            '2023-06-01',
            37500, // 37,5t
            100, // R$100,00
            40, // 40%
            3750, // R$3750,00
            'Descrição do frete',
            $truck
        ))->execute();

        $this->assertEquals('Guarapuava', $updatedFreight->start_address);
        $this->assertEquals('Curitiba', $updatedFreight->end_address);
        $this->assertEquals('Transportadora Exemplo', $updatedFreight->contractor_name);
        $this->assertEquals('2023-06-01', $updatedFreight->date);
        $this->assertEquals(37500, $updatedFreight->cargo_weight);
        $this->assertEquals(100, $updatedFreight->ton_price);
        $this->assertEquals(40, $updatedFreight->advance_percentage);
        $this->assertEquals(3750, $updatedFreight->total_amount);
        $this->assertEquals(562.5, $updatedFreight->driver_commission);
        $this->assertEquals('Descrição do frete', $updatedFreight->description);

        $this->assertDatabaseHas('freights', [
            'id' => $freight->id,
            'start_address' => 'Guarapuava',
            'end_address' => 'Curitiba',
            'contractor_name' => 'Transportadora Exemplo',
            'date' => '2023-06-01',
            'cargo_weight' => 37500,
            'ton_price' => 100,
            'advance_percentage' => 40,
            'total_amount' => 3750,
            'description' => 'Descrição do frete',
        ]);
    }
}
