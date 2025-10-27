<?php

namespace Tests\Feature\Freight;

use App\Http\Resources\Freight\FreightBaseResource;
use App\Models\Driver;
use App\Models\Expense;
use App\Models\Fleet;
use App\Models\Freight;
use App\Models\Manager;
use App\Models\Truck;
use App\Models\User;
use App\Services\Freight\CalculateFreightInfoService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class FreightControllerTest extends TestCase
{
    use RefreshDatabase;

    private Manager $manager;
    private User $user;
    private Fleet $fleet;
    private Truck $truck;
    private Driver $driver;
    private UploadedFile $document;

    
    public function setUp(): void
    {
        parent::setUp();
        Storage::fake('public');
        
        $this->user = User::factory()->create();
        $this->driver = Driver::factory()->create();
        $this->manager = $this->user->manager()->create();
        $this->fleet = Fleet::factory()->for($this->manager)->create();
        $this->truck = Truck::factory()->for($this->fleet)->create(['driver_id' => $this->driver->id]);
        $this->document = UploadedFile::fake()->create('contrato.pdf', 100);
    }
    
    private function createPayload(): array
    {
        return [
            'start_address' => 'Rua A, 123',
            'end_address' => 'Rua B, 456',
            'contractor_name' => 'Cliente X',
            'date' => now()->format('Y-m-d'),
            'cargo_weight' => 1000,
            'ton_price' => 50,
            'advance_percentage' => 20,
            'total_amount' => 50000,
            'description' => 'Frete teste',
            'fleet_id' => $this->fleet->id,
            'truck_id' => $this->truck->id,
            'driver_id' => $this->truck->driver->id,
            'document' => $this->document,
        ];
    }

    private function updatePayload(): array
    {
        return [
            'start_address' => 'Rua A, 123',
            'end_address' => 'Rua B, 456',
            'contractor_name' => 'Cliente X',
            'date' => now()->format('Y-m-d'),
            'cargo_weight' => 1000,
            'ton_price' => 50,
            'advance_percentage' => 20,
            'total_amount' => 50000,
            'description' => 'Frete teste'
        ];
    }

    private function actingAsManager(): User
    {
        $user = User::factory()->create();
        $user->manager()->create();
        $this->actingAs($user);
        return $user;
    }

    // ------------------ TEST --------------------------------------

    // Index Tests

    public function test_manager_can_list_own_freights()
    {
        // Create freights to the user
        Freight::factory()->count(2)->create([
            'fleet_id' => $this->fleet->id,
            'truck_id' => $this->truck->id,
            'driver_id' => $this->driver->id,
        ]);

        $this->actingAs($this->user);
        $response = $this->getJson(route('freights.index', [$this->fleet, $this->truck]));
        
        $response->assertStatus(200);
        $response->assertJsonCount(2, 'data');
    }

    public function test_manager_only_sees_their_own_freights()
    {
        // Create freight to another user
        Freight::factory()->count(3)->create();

        // Create freights to the user
        Freight::factory()->count(5)->create([
            'fleet_id' => $this->fleet->id,
            'truck_id' => $this->truck->id,
            'driver_id' => $this->driver->id,
        ]);

        $this->actingAs($this->user);
        $response = $this->getJson(route('freights.index', [$this->fleet, $this->truck]));
        
        $response->assertStatus(200);
        $response->assertJsonCount(5, 'data');
    }

    public function test_manager_only_sees_freights_from_especific_truck()
    {
        $anotherTruck = Truck::factory()->for($this->fleet)->create();

        // Create freight to another truck
        Freight::factory()->create([
            'fleet_id' => $this->fleet->id,
            'truck_id' => $anotherTruck->id,
        ]);

        // Create freights to especific truck
        $freight = Freight::factory()->create([
            'fleet_id' => $this->fleet->id,
            'truck_id' => $this->truck->id,
            'driver_id' => $this->driver->id,
        ]);

        $this->actingAs($this->user);
        $response = $this->getJson(route('freights.index', [$this->fleet, $this->truck]));
        
        $response->assertStatus(200);
        $response->assertJsonCount(1, 'data');
        $response->assertJsonPath('data.0.id', $freight->id);
    }

    public function test_manager_sees_freights_ordered_by_date_desc()
    {
        $oldFreight = Freight::factory()->create([
            'fleet_id' => $this->fleet->id,
            'truck_id' => $this->truck->id,
            'driver_id' => $this->driver->id,
            'date' => '2022-01-01',
        ]);

        $newFreight = Freight::factory()->create([
            'fleet_id' => $this->fleet->id,
            'truck_id' => $this->truck->id,
            'driver_id' => $this->driver->id,
            'date' => '2023-01-01',
        ]);

        $this->actingAs($this->user);
        $response = $this->getJson(route('freights.index', [$this->fleet, $this->truck]));

        $response->assertStatus(200);
        $response->assertJsonCount(2, 'data');

        $response->assertJsonPath('data.0.id', $newFreight->id);
        $response->assertJsonPath('data.1.id', $oldFreight->id);
    }

    // Store Tests
    
    public function test_manager_can_create_freight_with_document()
    {
    
        $response = $this->actingAs($this->user)
            ->postJson(route('freights.store', [$this->fleet, $this->truck]), $this->createPayload());

        $response->assertStatus(200);
        $response->assertJsonStructure(['message' => ['type', 'text']]);
    }

    public function test_non_fleet_and_truck_owner_cannot_create_freight(): void
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $response = $this->postJson(route('freights.store', [$this->fleet, $this->truck]), $this->createPayload());

        $response->assertStatus(403);
    }

    public function test_store_freight_validation_errors(): void
    {
        $payload = [
            'start_address' => '', // obrigatório
            'end_address' => '',   // obrigatório
            'contractor_name' => '', // obrigatório
            'date' => 'invalid-date', // inválido
            'cargo_weight' => -10, // mínimo 0
            'ton_price' => -5, // mínimo 0
            'advance_percentage' => 150, // deve ser entre 0 e 100
            'total_amount' => -500, // mínimo 0
            'description' => str_repeat('a', 300), // max 255
            'fleet_id' => $this->fleet->id,
            'truck_id' => $this->truck->id,
            'driver_id' => $this->driver->id,
            'document' => UploadedFile::fake()->create('file.exe', 10), // tipo inválido
        ];

        $response = $this->actingAs($this->user)
            ->postJson(route('freights.store', [$this->fleet, $this->truck]), $payload);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors([
            'start_address',
            'end_address',
            'contractor_name',
            'date',
            'cargo_weight',
            'ton_price',
            'advance_percentage',
            'total_amount',
            'description',
            'document',
        ]);
    }

    // Update Tests

    public function test_manager_can_update_freight()
    {
        $freight = Freight::factory()->create([
            'fleet_id' => $this->fleet->id,
            'truck_id' => $this->truck->id,
            'driver_id' => $this->driver->id,
        ]);

        $response = $this->actingAs($this->user)
            ->putJson(route('freights.update', [$this->fleet, $this->truck, $freight]), $this->updatePayload());

        $response->assertStatus(200);
        $response->assertJsonStructure(['message' => ['type', 'text']]);
    }

    public function test_non_freight_owner_cannot_update(): void
    {
        $freight = Freight::factory()->create([
            'fleet_id' => $this->fleet->id,
            'truck_id' => $this->truck->id,
            'driver_id' => $this->driver->id,
        ]);

        $user = User::factory()->create();
        $this->actingAs($user);

        $response = $this->putJson(route('freights.update', [$this->fleet, $this->truck, $freight]), $this->updatePayload());

        $response->assertStatus(403);
    }

    public function test_update_freight_validation_errors()
    {
        $freight = Freight::factory()->create([
            'fleet_id' => $this->fleet->id,
            'truck_id' => $this->truck->id,
            'driver_id' => $this->driver->id,
        ]);

        $response = $this->actingAs($this->user)
            ->putJson(route('freights.update', [$this->fleet, $this->truck, $freight]), [
                'start_address' => '', // obrigatório
                'end_address' => '',   // obrigatório
                'contractor_name' => '', // obrigatório
                'date' => 'invalid-date', // inválido
                'cargo_weight' => -10, // mínimo 0
                'ton_price' => -5, // mínimo 0
                'advance_percentage' => 150, // deve ser entre 0 e 100
                'total_amount' => -500, // mínimo 0
                'description' => str_repeat('a', 300), // max 255
            ]);

            $response->assertStatus(422);
            $response->assertJsonValidationErrors([
                'start_address',
                'end_address',
                'contractor_name',
                'date',
                'cargo_weight',
                'ton_price',
                'advance_percentage',
                'total_amount',
                'description',
            ]);
    }

    // Show Tests

    public function test_manager_can_show_freight()
    {
        $freight = Freight::factory()->create([
            'fleet_id' => $this->fleet->id,
            'truck_id' => $this->truck->id,
            'driver_id' => $this->driver->id,
        ]);

        $response = $this->actingAs($this->user)
            ->getJson(route('freights.show', [$this->fleet, $this->truck, $freight]));

        $response->assertStatus(200);
        $response->assertJsonPath('data.id', $freight->id);

        $response->assertJsonPath('data.expenses_amount', 0);
        $response->assertJsonPath('data.profit', CalculateFreightInfoService::calculateProfit($freight->total_amount, 0, $freight->driver_commission));
    }

    public function test_manager_can_show_freight_with_expenses()
    {
        $freight = Freight::factory()->create([
            'fleet_id' => $this->fleet->id,
            'truck_id' => $this->truck->id,
            'driver_id' => $this->driver->id,
        ]);

        $expense = Expense::factory()->create([
            'freight_id' => $freight->id,
            'amount' => 100,
        ]);

        $response = $this->actingAs($this->user)
            ->getJson(route('freights.show', [$this->fleet, $this->truck, $freight]));

        $response->assertStatus(200);
        $response->assertJsonPath('data.expenses_amount', $expense->amount);
        $response->assertJsonPath('data.profit', CalculateFreightInfoService::calculateProfit($freight->total_amount, $expense->amount, $freight->driver_commission));
        $response->assertJsonPath('data.expenses.0.id', $expense->id);
    }

    public function test_non_freight_owner_cannot_show(): void
    {
        $freight = Freight::factory()->create([
            'fleet_id' => $this->fleet->id,
            'truck_id' => $this->truck->id,
            'driver_id' => $this->driver->id,
        ]);

        $user = User::factory()->create();
        $this->actingAs($user);
        $response = $this->getJson(route('freights.show', [$this->fleet, $this->truck, $freight]));

        $response->assertStatus(403);
    }

    // Delete Tests

    public function test_manager_can_delete_freight()
    {
        $freight = Freight::factory()->create([
            'fleet_id' => $this->fleet->id,
            'truck_id' => $this->truck->id,
            'driver_id' => $this->driver->id,
        ]);

        $response = $this->actingAs($this->user)
            ->deleteJson(route('freights.destroy', [$this->fleet, $this->truck, $freight]));

        $response->assertStatus(200);
        $response->assertJsonStructure(['message' => ['type', 'text']]);
    }

    public function test_non_freight_owner_cannot_delete(): void
    {
        $freight = Freight::factory()->create([
            'fleet_id' => $this->fleet->id,
            'truck_id' => $this->truck->id,
            'driver_id' => $this->driver->id,
        ]);

        $user = User::factory()->create();
        $this->actingAs($user);
        $response = $this->deleteJson(route('freights.destroy', [$this->fleet, $this->truck, $freight]));

        $response->assertStatus(403);
    }
}
