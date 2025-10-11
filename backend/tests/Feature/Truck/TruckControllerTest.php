<?php

namespace Tests\Feature\Truck;

use App\Models\Driver;
use App\Models\Fleet;
use App\Models\Manager;
use App\Models\Truck;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class TruckControllerTest extends TestCase
{
    use RefreshDatabase;

    private Manager $manager;
    private User $user;
    private Driver $driver;
    private Fleet $fleet;
    private Truck $truck;

    private function payload(): array
    {
        return [
            'brand_name' => 'Volvo',
            'model' => 'FH 540',
            'license_plate' => 'ABC1234',
            'color' => 'Branca',
            'commission_percentage' => 10.5,
            'driver_cpf' => $this->driver->user->cpf
        ];
    }

    private function actingAsManager(): User
    {
        $this->actingAs($this->user);
        return $this->user;
    }

    public function setUp(): void
    {
        parent::setUp();
        $this->driver = Driver::factory()->create();

        $this->user = User::factory()->create();
        $this->manager = $this->user->manager()->create();
        $this->fleet = Fleet::factory()->create(['manager_id' => $this->manager->id]);
        $driver = Driver::factory()->create();
        $this->truck = $this->fleet->trucks()->create([
            'brand_name' => 'Volvo',
            'model' => 'FH 700',
            'license_plate' => 'VWX1234',
            'color' => 'Azul',
            'commission_percentage' => 10.5,
            'driver_cpf' => $driver->user->cpf
        ]);
    }

    // ------------------------- CREATE -------------------------------------;
    public function test_manager_can_create_a_truck_in_own_fleet()
    {
        $this->actingAsManager();

        $response = $this->postJson("/api/fleets/{$this->fleet->id}/trucks", $this->payload());

        $response->assertStatus(200);
        $this->assertDatabaseHas('trucks', [
            'license_plate' => 'ABC1234',
            'fleet_id' => $this->fleet->id,
        ]);
    }

    public function test_cannot_create_truck_in_other_users_fleet()
    {
        $otherUser = User::factory()->create();
        $manager = Manager::factory()->create(['user_id' => $otherUser->id]);
        $fleet = Fleet::factory()->create(['manager_id' => $manager->id]);

        $this->actingAsManager();
        $response = $this->postJson("/api/fleets/{$fleet->id}/trucks", $this->payload());

        $response->assertStatus(403);
    }

    public function test_creation_fails_with_empty_infos()
    {
        $this->actingAsManager();
        $response = $this->postJson("/api/fleets/{$this->fleet->id}/trucks", []);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors([
            'brand_name', 'model', 'license_plate', 'color', 'commission_percentage', 'driver_cpf'
        ]);
    }

    public function test_creation_fails_if_license_plate_is_not_unique()
    {
        $this->fleet->trucks()->create([
            'fleet_id' => $this->fleet->id,
            'brand_name' => 'Volvo',
            'model' => 'FH 540',
            'license_plate' => 'ABC1234',
            'color' => 'Branca',
            'commission_percentage' => 10.5,
        ]);

        $this->actingAsManager();
        $response = $this->postJson("/api/fleets/{$this->fleet->id}/trucks", $this->payload());

        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['license_plate']);
    }

    public function test_creation_fails_if_driver_cpf_is_not_unique()
    {
        $this->fleet->trucks()->create([
            'fleet_id' => $this->fleet->id,
            'brand_name' => 'Volvo',
            'model' => 'FH 540',
            'license_plate' => 'ABC1234',
            'color' => 'Branca',
            'commission_percentage' => 10.5,
            'driver_id' => $this->driver->id,
        ]);

        $payload = [
            'fleet_id' => $this->fleet->id,
            'brand_name' => 'Volvo',
            'model' => 'FH 540',
            'license_plate' => 'ABC1734',
            'color' => 'Branca',
            'commission_percentage' => 10.5,
            'driver_cpf' => $this->driver->user->cpf
        ];

        $this->actingAsManager();
        $response = $this->postJson("/api/fleets/{$this->fleet->id}/trucks", $payload);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['driver_cpf']);
    }

    // -------------------------- UPDATE ------------------------------------//

    public function test_manager_can_update_own_truck()
    {
        $truck = $this->fleet->trucks()->create([
            'fleet_id' => $this->fleet->id,
            'brand_name' => 'MAN',
            'model' => 'TGX',
            'license_plate' => 'OLD1111',
            'color' => 'Azul',
            'commission_percentage' => 5.0,
        ]);

        $this->actingAsManager();
        $response = $this->putJson("/api/fleets/{$this->fleet->id}/trucks/{$truck->id}", $this->payload());

        $response->assertStatus(200);
        $this->assertDatabaseHas('trucks', [
            'id' => $truck->id,
            'license_plate' => 'ABC1234',
            'brand_name' => 'Volvo',
        ]);
    }

    public function test_user_cannot_update_truck_from_other_users_fleet()
    {
        $otherUser = User::factory()->create();
        $manager = Manager::factory()->create(['user_id' => $otherUser->id]);
        $fleet = Fleet::factory()->create(['manager_id' => $manager->id]);
        $truck = $fleet->trucks()->create([
            'fleet_id' => $fleet->id,
            'brand_name' => 'Scania',
            'model' => 'P360',
            'license_plate' => 'INT1234',
            'color' => 'Preta',
            'commission_percentage' => 11.0,
        ]);

        $this->actingAsManager();
        $response = $this->putJson("/api/fleets/{$fleet->id}/trucks/{$truck->id}", $this->payload());

        $response->assertStatus(403);
    }

    public function test_update_fails_with_empty_infos()
    {
        $this->actingAsManager();
        $response = $this->putJson("/api/fleets/{$this->fleet->id}/trucks/{$this->truck->id}", []);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors([
            'brand_name', 'model', 'license_plate', 'color', 'commission_percentage'
        ]);
    }

    public function test_update_fails_if_license_plate_is_not_unique()
    {
        $truck = $this->fleet->trucks()->create([
            'fleet_id' => $this->fleet->id,
            'brand_name' => 'Volvo',
            'model' => 'FH 540',
            'license_plate' => 'ABC1234',
            'color' => 'Branca',
            'commission_percentage' => 10.5,
        ]);

        $this->actingAsManager();
        $response = $this->putJson("/api/fleets/{$this->fleet->id}/trucks/{$truck->id}", [
            'brand_name' => 'Volvo',
            'model' => 'FH 540',
            'license_plate' => 'VWX1234', // Same as SetUp
            'color' => 'Branca',
            'commission_percentage' => 10.5,
        ]);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['license_plate']);
    }

    // --------------------------- DELETE -----------------------------------//

    public function test_manager_can_delete_own_truck()
    {
        $this->actingAsManager();
        $response = $this->deleteJson("/api/fleets/{$this->fleet->id}/trucks/{$this->truck->id}");
    
        $response->assertStatus(200);
        $this->assertSoftDeleted('trucks', ['id' => $this->truck->id]);
        $this->assertDatabaseHas('trucks', ['id' => $this->truck->id, 'driver_id' => null]);
    }
    
    public function test_user_cannot_delete_truck_from_other_users_fleet()
    {
        $otherUser = User::factory()->create();
        $manager = Manager::factory()->create(['user_id' => $otherUser->id]);
        $fleet = Fleet::factory()->create(['manager_id' => $manager->id]);
        $truck = $fleet->trucks()->create([
            'fleet_id' => $fleet->id,
            'brand_name' => 'Volvo',
            'model' => 'FH 440',
            'license_plate' => 'NDEL123',
            'color' => 'Preta',
            'commission_percentage' => 6.0,
        ]);

        $this->actingAsManager();
        $response = $this->deleteJson("/api/fleets/{$fleet->id}/trucks/{$truck->id}");
    
        $response->assertStatus(403);
    }

    // ------------------- SHOW ------------------------------------------------------------------ //

    public function test_manager_can_show_truck()
    {
        $truck = Truck::factory()->create(['fleet_id' => $this->fleet->id, 'driver_id' => $this->driver->user->id]);

        $this->actingAsManager();
        $response = $this->getJson("/api/fleets/{$this->fleet->id}/trucks/{$truck->id}");
    
        $response->assertStatus(200);
        $response->assertJsonPath('data.driver.user.name', $this->driver->user->name);
    }

    // ------------------ UPDATE TRUUCK DRIVER -------------------------------------------------- //

    public function test_manager_can_update_truck_driver()
    {
        $newTruck = Truck::factory()->create(['fleet_id' => $this->fleet->id]);

        $this->actingAsManager();
        $response = $this->patchJson("/api/fleets/{$this->fleet->id}/trucks/{$newTruck->id}/driver", [
            'driver_cpf' => $this->driver->user->cpf,
        ]);
    
        $response->assertStatus(200);
        $this->assertDatabaseHas('trucks', [
            'id' => $newTruck->id,
            'driver_id' => $this->driver->user->id,
        ]);
    }

    public function test_user_cannot_update_driver_from_other_users_fleet()
    {
        $newTruck = Truck::factory()->create(['fleet_id' => $this->fleet->id]);
        
        $otherManager = Manager::factory()->create();
        $otherDriver = Driver::factory()->create();

        $this->actingAs($otherManager->user);
        $response = $this->patchJson("/api/fleets/{$this->fleet->id}/trucks/{$newTruck->id}/driver", [
            'driver_cpf' => $otherDriver->user->cpf,
        ]);
    
        $response->assertStatus(403);
    }
    
}