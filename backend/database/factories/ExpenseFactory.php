<?php

namespace Database\Factories;

use App\Models\Freight;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Expense>
 */
class ExpenseFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $freight = Freight::factory()->create();

        return [
            'type' => fake()->randomElement(['Combustível', 'Manutenção', 'Pedágio', 'Outro']),
            'amount' => fake()->randomFloat(2, 0),
            'date' => fake()->date(),
            'location' => fake()->address(),
            'description' => fake()->text(),
            'freight_id' => $freight->id,
        ];
    }
}
