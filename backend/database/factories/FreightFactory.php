<?php

namespace Database\Factories;

use App\Models\Driver;
use App\Models\Fleet;
use App\Models\Truck;
use App\Services\Freight\CalculateFreightInfoService;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Freight>
 */
class FreightFactory extends Factory
{    
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $fleet = Fleet::factory()->create();
        $driver = Driver::factory()->create();
        $truck = Truck::factory()->for($fleet)->for($driver)->create();

        return [
            'start_address' => fake()->address(),
            'end_address' => fake()->address(),
            'contractor_name' => fake()->company(),
            'date' => fake()->date(),
            'cargo_weight' => fake()->randomFloat(2, 0),
            'ton_price' => fake()->randomFloat(2, 0),
            'advance_percentage' => fake()->randomFloat(2, 0, 100),
            'advance' => CalculateFreightInfoService::calculateAdvance(fake()->randomFloat(2, 0), fake()->randomFloat(2, 0, 100)),
            'total_amount' => fake()->randomFloat(2, 0),
            'description' => fake()->text(),
            'fleet_id' => $fleet->id,
            'truck_id' => $truck->id,
            'driver_id' => $driver->id
        ];
    }
}
