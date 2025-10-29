<?php

namespace Tests\Unit\Actions\Expense;

use App\Http\Actions\Expense\UploadExpenseDocumentAction;
use App\Models\Expense;
use App\Models\Fleet;
use App\Models\Freight;
use App\Models\Manager;
use App\Models\Truck;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class UploadExpenseDocumentActionTest extends TestCase
{
    use RefreshDatabase;
    
    public function test_should_upload_expense_document()
    {
        Storage::fake('public');

        $user = User::factory()->create(['name' => 'Pedro']);
        $manager = Manager::factory()->for($user)->create();
        $fleet = Fleet::factory()->for($manager)->create();
        $truck = Truck::factory()->for($fleet)->create();
        $freight = Freight::factory()->create([
            'fleet_id' => $fleet->id,
            'truck_id' => $truck->id,
        ]);
        $expense = Expense::factory()->for($freight)->create();

        $file = UploadedFile::fake()->create('nota.pdf', 120, 'application/pdf');

        $path = (new UploadExpenseDocumentAction($expense, $file))->execute();

        Storage::disk('public')->assertExists($path);

        $this->assertEquals($path, $expense->fresh()->document_path);

        $this->assertStringContainsString('pedro_despesa_' . $expense->id, $path);
        $this->assertStringEndsWith('.pdf', $path);
    }
}
