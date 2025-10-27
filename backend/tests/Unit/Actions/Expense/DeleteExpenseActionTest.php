<?php

namespace Tests\Unit\Actions\Expense;

use App\Http\Actions\Expense\DeleteExpenseAction;
use App\Models\Expense;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DeleteExpenseActionTest extends TestCase
{
    use RefreshDatabase;

    public function test_should_delete_expense()
    {
        $expense = Expense::factory()->create();

        (new DeleteExpenseAction($expense))->execute();

        $this->assertSoftDeleted('expenses', [
            'id' => $expense->id
        ]);
    }
}
