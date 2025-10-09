<?php

namespace Tests\Unit\Actions\Freight;

use App\Http\Actions\Freight\CreateFreightAction;
use App\Models\Driver;
use App\Models\Fleet;
use App\Models\Freight;
use App\Models\Truck;
use App\Services\Freight\CalculateAdvanceService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CreateFreightActionTest extends TestCase
{
    use RefreshDatabase;

    public function test_should_create_a_freight(): void
    {
        $fleet = Fleet::factory()->create();
        $driver = Driver::factory()->create();
        $truck = Truck::factory()->create(['fleet_id' => $fleet->id, 'driver_id' => $driver->id]);

        $freight = (new CreateFreightAction(
            'Guarapuava',
            'Curitiba',
            'Transportadora Exemplo',
            '2023-06-01',
            37500, // 37,5t
            100, // R$100,00
            40, // 40%
            3750, // R$3750,00
            'Descrição do frete',
            $fleet->id,
            $truck->id,
            $driver->id
        ))->execute();

        $this->assertInstanceOf(Freight::class, $freight);
        $this->assertEquals('Guarapuava', $freight->start_address);
        $this->assertEquals('Curitiba', $freight->end_address);
        $this->assertEquals('Transportadora Exemplo', $freight->contractor_name);
        $this->assertEquals('2023-06-01', $freight->date);
        $this->assertEquals(37500, $freight->cargo_weight);
        $this->assertEquals(100, $freight->ton_price);
        $this->assertEquals(40, $freight->advance_percentage);
        $this->assertEquals(3750, $freight->total_amount);
        $this->assertEquals('Descrição do frete', $freight->description);
        $this->assertEquals($fleet->id, $freight->fleet_id);
        $this->assertEquals($truck->id, $freight->truck_id);
        $this->assertEquals($driver->id, $freight->driver_id);

        $this->assertDatabaseHas('freights', [
            'id' => $freight->id
        ]);
    }

    public function test_should_calculate_advance_correctly(): void
    {
        $expectedAdvance = 3750 * 40 / 100;

        $this->assertEquals($expectedAdvance, CalculateAdvanceService::calculate(3750, 40));
    }
}
