<?php

namespace Tests\Unit\Actions\Expense;

use App\Http\Actions\Expense\CreateExpenseAction;
use App\Models\Expense;
use App\Models\Freight;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CreateExpenseActionTest extends TestCase
{
    use RefreshDatabase;

    public function test_should_create_a_expense(): void
    {
        $freight = Freight::factory()->create();

        $expense = (new CreateExpenseAction(
            'Combustível',
            'Guarapuava',
            1000,
            '2023-01-01',
            '250L de Diesel',
            $freight,
        ))->execute();

        $this->assertInstanceOf(Expense::class, $expense);
        $this->assertEquals('Combustível', $expense->type);
        $this->assertEquals('Guarapuava', $expense->location);
        $this->assertEquals(1000, $expense->amount);
        $this->assertEquals('2023-01-01', $expense->date);
        $this->assertEquals('250L de Diesel', $expense->description);
        $this->assertEquals($freight->id, $expense->freight_id);

        $this->assertDatabaseHas('expenses', [
            'id' => $expense->id
        ]);
    }
}
