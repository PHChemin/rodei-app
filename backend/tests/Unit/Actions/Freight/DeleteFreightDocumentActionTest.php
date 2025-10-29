<?php

namespace Tests\Unit\Actions\Freight;

use App\Http\Actions\Freight\DeleteFreightDocumentAction;
use App\Http\Actions\Freight\UploadFreightDocumentAction;
use App\Models\Fleet;
use App\Models\Freight;
use App\Models\Manager;
use App\Models\Truck;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class DeleteFreightDocumentActionTest extends TestCase
{
    use RefreshDatabase;

    public function test_should_delete_freight_document()
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

        $file = UploadedFile::fake()->create('nota.pdf', 120, 'application/pdf');
        $path = (new UploadFreightDocumentAction($freight, $file))->execute();

        (new DeleteFreightDocumentAction($freight->fresh()))->execute();

        Storage::disk('public')->assertMissing($path);
        $this->assertNull($freight->fresh()->document_path);
    }
}
