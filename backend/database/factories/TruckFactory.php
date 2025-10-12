<?php

namespace Database\Factories;

use App\Enums\TruckBrand;
use App\Enums\TruckColor;
use App\Models\Driver;
use App\Models\Fleet;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Truck>
 */
class TruckFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'brand_name' => $this->faker->randomElement(TruckBrand::values()),
            'model' => $this->faker->word(),
            'license_plate' => $this->faker->unique()->randomNumber(7),
            'color' => $this->faker->randomElement(TruckColor::values()),
            'commission_percentage' => $this->faker->randomFloat(2, 0, 100),
            'driver_id' => Driver::factory(),
            'fleet_id' => Fleet::factory(),
        ];
    }
}
