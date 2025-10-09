<?php

namespace Tests\Unit\Actions\Freights;

use App\Http\Actions\Freight\UploadFreightDocumentAction;
use App\Models\Driver;
use App\Models\Fleet;
use App\Models\Freight;
use App\Models\Truck;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Str;
use Tests\TestCase;

class UploadFreightDocumentActionTest extends TestCase
{
    use RefreshDatabase;

    public function test_should_upload_freight_document(): void
    {
        Storage::fake('public');

        $fleet = Fleet::factory()->create();
        $driver = Driver::factory()->create();
        $truck = Truck::factory()->create(['fleet_id' => $fleet->id, 'driver_id' => $driver->id]);

        $freight = Freight::factory()->create([
            'fleet_id' => $fleet->id,
            'truck_id' => $truck->id,
            'driver_id' => $driver->id,
        ]);

        $file = UploadedFile::fake()->create('document.pdf', 100, 'application/pdf');

        $path = new UploadFreightDocumentAction($freight, $file)->execute();

        $this->assertTrue(
            Storage::disk('public')->exists($path),
            "O arquivo {$path} não foi encontrado no disco public"
        );

        $freight->refresh();
        $this->assertEquals($path, $freight->document_path);

        $filename = basename($path);
        $this->assertStringContainsString('frete', $filename);
        $this->assertStringContainsString((string)$freight->id, $filename);
    }
}
