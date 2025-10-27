<?php

namespace Tests\Unit\Actions\Expense;

use App\Http\Actions\Expense\UpdateExpenseAction;
use App\Models\Expense;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UpdateExpenseActionTest extends TestCase
{
    use RefreshDatabase;

    public function test_should_update_expense()
    {
        $expense = Expense::factory()->create();

        $updatedExpense = (new UpdateExpenseAction(
            'Combustível',
            'Guarapuava',
            1000,
            '2023-01-01',
            '250L de Diesel',
            $expense
        ))->execute();

        $this->assertEquals('Combustível', $updatedExpense->type);
        $this->assertEquals('Guarapuava', $updatedExpense->location);
        $this->assertEquals(1000, $updatedExpense->amount);
        $this->assertEquals('2023-01-01', $updatedExpense->date);
        $this->assertEquals('250L de Diesel', $updatedExpense->description);

        $this->assertDatabaseHas('expenses', [
            'id' => $expense->id,
            'type' => 'Combustível',
            'location' => 'Guarapuava',
            'amount' => 1000,
            'date' => '2023-01-01',
            'description' => '250L de Diesel',
        ]);
    }
}
