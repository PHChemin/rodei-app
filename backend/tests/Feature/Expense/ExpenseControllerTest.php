<?php

namespace Tests\Feature\Expense;

use App\Models\Driver;
use App\Models\Expense;
use App\Models\Fleet;
use App\Models\Freight;
use App\Models\Manager;
use App\Models\Truck;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ExpenseControllerTest extends TestCase
{
    use RefreshDatabase;

    private Manager $manager;
    private User $user;
    private Fleet $fleet;
    private Truck $truck;
    private Driver $driver;
    private Freight $freight;

    public function setUp(): void
    {
        parent::setUp();

        $this->user = User::factory()->create();
        $this->manager = Manager::factory()->for($this->user)->create();
        $this->fleet = Fleet::factory()->for($this->manager)->create();
        $this->driver = Driver::factory()->create();
        $this->truck = Truck::factory()->create([
            'fleet_id' => $this->fleet->id,
            'driver_id' => $this->driver->id
        ]);
        $this->freight = Freight::factory()->create([
            'fleet_id' => $this->fleet->id,
            'truck_id' => $this->truck->id,
            'driver_id' => $this->driver->id
        ]);
    }

    private function payload(): array
    {
        return [
            'type' => 'Combustível',
            'amount' => 100,
            'location' => 'Guarapuava',
            'date' => '2023-01-01',
            'description' => '250L de Diesel',
        ];
    }

    // - - - - - - - - - - - - STORE - - - - - - - - - - - - - //
    
    public function test_manager_can_create_a_expense()
    {
        $response = $this->actingAs($this->user)
            ->postJson(route('expense.store', [$this->fleet, $this->truck, $this->freight]), $this->payload());

        $response->assertStatus(200);
        $response->assertJsonStructure(['message' => ['type', 'text']]);
    }

    // Freight owner is also the fleet and truck owner!
    public function test_non_freight_owner_cannot_create_a_expense()
    {
        $user = User::factory()->create();
        Manager::factory()->for($user)->create();
        
        $response = $this->actingAs($user)
            ->postJson(route('expense.store', [$this->fleet, $this->truck, $this->freight]), $this->payload());

        $response->assertStatus(403);
    }

    public function test_driver_can_create_a_expense()
    {
        $response = $this->actingAs($this->driver->user)
            ->postJson(route('expense.store', [$this->fleet, $this->truck, $this->freight]), $this->payload());

        $response->assertStatus(200);
        $response->assertJsonStructure(['message' => ['type', 'text']]);
    }

    public function test_non_freight_driver_cannot_create_a_expense()
    {
        $user = User::factory()->create();
        Driver::factory()->for($user)->create();
        
        $response = $this->actingAs($user)
            ->postJson(route('expense.store', [$this->fleet, $this->truck, $this->freight]), $this->payload());

        $response->assertStatus(403);
    }

    public function test_store_expense_validation_errors()
    {
        $invalidPayload = [
            'type' => '',
            'amount' => -5, // minimo 0
            'location' => '',
            'date' => 'invalid-date', // inválido
            'description' => str_repeat('a', 300), // max 255
        ];

        $response = $this->actingAs($this->user)
            ->postJson(route('expense.store', [$this->fleet, $this->truck, $this->freight]), $invalidPayload);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors([
            'type',
            'amount',
            'location',
            'date',
            'description',
        ]);
    }

    // - - - - - - - - - - - - UPDATE - - - - - - - - - - - - - //

    public function test_manager_can_update_a_expense()
    {
        $expense = Expense::factory()->create([
            'freight_id' => $this->freight->id,
        ]);

        $response = $this->actingAs($this->user)
            ->putJson(route('expense.update', [$this->fleet, $this->truck, $this->freight, $expense]), $this->payload());

        $response->assertStatus(200);
        $response->assertJsonStructure(['message' => ['type', 'text']]);
    }

    // Expense owner is also the fleet, truck and freight owner!
    public function test_non_expense_owner_cannot_update_a_expense()
    {
        $expense = Expense::factory()->create([
            'freight_id' => $this->freight->id,
        ]);

        $user = User::factory()->create();
        Manager::factory()->for($user)->create();
        $this->actingAs($user);

        $response = $this->putJson(route('expense.update', [$this->fleet, $this->truck, $this->freight, $expense]), $this->payload());

        $response->assertStatus(403);
    }

    // Even if the driver is the freight driver, he cannot update the expense
    public function test_driver_cannot_update_a_expense()
    {
        $expense = Expense::factory()->create([
            'freight_id' => $this->freight->id,
        ]);

        $response = $this->actingAs($this->driver->user)
            ->putJson(route('expense.update', [$this->fleet, $this->truck, $this->freight, $expense]), $this->payload());

        $response->assertStatus(403);
    }

    public function test_update_expense_validation_errors()
    {
        $expense = Expense::factory()->create([
            'freight_id' => $this->freight->id,
        ]);

        $invalidPayload = [
            'type' => '',
            'amount' => -5, // minimo 0
            'location' => '',
            'date' => 'invalid-date', // inválido
            'description' => str_repeat('a', 300), // max 255
        ];

        $response = $this->actingAs($this->user)
            ->putJson(route('expense.update', [$this->fleet, $this->truck, $this->freight, $expense]), $invalidPayload);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors([
            'type',
            'amount',
            'location',
            'date',
            'description',
        ]);
    }

    // - - - - - - - - - - - DESTROY - - - - - - - - - - - - //

    public function test_manager_can_delete_a_expense()
    {
        $expense = Expense::factory()->create([
            'freight_id' => $this->freight->id,
        ]);

        $response = $this->actingAs($this->user)
            ->deleteJson(route('expense.destroy', [$this->fleet, $this->truck, $this->freight, $expense]));

        $response->assertStatus(200);
        $response->assertJsonStructure(['message' => ['type', 'text']]);
    }

    // Expense owner is also the fleet, truck and freight owner!
    public function test_non_expense_owner_cannot_delete_a_expense()
    {
        $expense = Expense::factory()->create([
            'freight_id' => $this->freight->id,
        ]);

        $user = User::factory()->create();
        Manager::factory()->for($user)->create();
        $this->actingAs($user);

        $response = $this->deleteJson(route('expense.destroy', [$this->fleet, $this->truck, $this->freight, $expense]));

        $response->assertStatus(403);
    }

    // Even if the driver is the freight driver, he cannot delete the expense
    public function test_driver_cannot_delete_a_expense()
    {
        $expense = Expense::factory()->create([
            'freight_id' => $this->freight->id,
        ]);

        $response = $this->actingAs($this->driver->user)
            ->deleteJson(route('expense.destroy', [$this->fleet, $this->truck, $this->freight, $expense]));

        $response->assertStatus(403);
    }
}
