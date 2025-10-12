<?php

namespace Tests\Feature\Fleet;

use App\Models\Fleet;
use App\Models\Manager;
use App\Models\Truck;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class FleetControllerTest extends TestCase
{
    use RefreshDatabase;

    private function actingAsManager(): User
    {
        $user = User::factory()->create();
        $user->manager()->create();
        $this->actingAs($user);
        return $user;
    }

    // ------------------------- TEST ------------------------------------------------------ //

    public function test_manager_can_list_own_fleets(): void
    {
        $user = $this->actingAsManager();
        $fleets = $user->manager->fleets()->createMany([
            ['name' => 'Frota 1'],
            ['name' => 'Frota 2'],
        ]);

        $fleets[0]->trucks()->createMany(Truck::factory()->count(2)->make()->toArray());
        $fleets[1]->trucks()->create(Truck::factory()->make()->toArray());

        $response = $this->getJson(route('fleets.index'));

        $response->assertStatus(200);
        $response->assertJsonCount(2, 'data');
        
        $response->assertJsonCount(2, 'data.0.trucks');
        $response->assertJsonCount(1, 'data.1.trucks');
        $response->assertJsonPath('data.0.trucks.0.license_plate', $fleets[0]->trucks[0]->license_plate);
        $response->assertJsonPath('data.1.trucks.0.license_plate', $fleets[1]->trucks[0]->license_plate);
    }

    public function test_manager_only_sees_their_own_fleets()
    {
        $user = $this->actingAsManager();

        Fleet::factory()->count(2)->for($user->manager)->create();

        $otherManager = Manager::factory()->create();
        Fleet::factory()->count(2)->for($otherManager)->create();

        $response = $this->getJson(route('fleets.index'));

        $response->assertStatus(200);
        $response->assertJsonCount(2, 'data');
        $response->assertJsonMissing([
            'manager_id' => $otherManager->id,
        ]);
    }

    public function test_non_manager_cannot_list_fleets(): void
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $response = $this->getJson(route('fleets.index'));

        $response->assertStatus(403);
    }

    public function test_manager_can_create_fleet(): void
    {
        $user = $this->actingAsManager();

        $response = $this->postJson(route('fleets.store'), ['name' => 'Nova Frota']);

        $response->assertStatus(200);
        $this->assertDatabaseHas('fleets', [
            'name' => 'Nova Frota',
            'manager_id' => $user->manager->id,
        ]);
    }

    public function test_fleet_creation_fails_with_invalid_name(): void
    {
        $user = $this->actingAsManager();

        $response = $this->postJson(route('fleets.store'), ['name' => str_repeat('a', 256)]);

        $response->assertStatus(422)->assertJsonValidationErrors(['name']);
    }

    public function test_non_manager_cannot_create_fleet(): void
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $response = $this->postJson(route('fleets.store'), ['name' => 'Invalida']);

        $response->assertStatus(403);
    }

    public function test_manager_can_update_fleet(): void
    {
        $user = $this->actingAsManager();
        $fleet = $user->manager->fleets()->create(['name' => 'Antigo nome']);

        $response = $this->putJson(route('fleets.update', $fleet), ['name' => 'Atualizado']);

        $response->assertStatus(200);
        $this->assertDatabaseHas('fleets', ['id' => $fleet->id, 'name' => 'Atualizado']);
    }
    
    public function test_fleet_update_fails_with_invalid_name(): void
    {
        $user = $this->actingAsManager();
        $fleet = $user->manager->fleets()->create(['name' => 'Frota']);
        
        $response = $this->putJson(route('fleets.update', $fleet), ['name' => str_repeat('a', 256)]);
        
        $response->assertStatus(422)->assertJsonValidationErrors(['name']);
    }

    public function test_manager_cannot_update_a_fleet_they_do_not_own()
    {
        $manager = Manager::factory()->create();
        $fleet = Fleet::factory()->for($manager)->create();

        $otherUser = $this->actingAsManager();

        $response = $this->putJson(route('fleets.update', $fleet), [
            'name' => 'Tentativa de Update Indevida',
        ]);

        $response->assertStatus(403);
    }

    public function test_manager_can_delete_fleet(): void
    {
        $user = $this->actingAsManager();
        $fleet = $user->manager->fleets()->create(['name' => 'Para deletar']);

        $response = $this->deleteJson(route('fleets.destroy', $fleet));

        $response->assertStatus(200);
        $this->assertSoftDeleted('fleets', ['id' => $fleet->id]);
    }

    public function test_manager_cannot_delete_a_fleet_they_do_not_own()
    {
        $manager = Manager::factory()->create();
        $fleet = Fleet::factory()->for($manager)->create();

        $otherUser = $this->actingAsManager();

        $response = $this->deleteJson(route('fleets.destroy', $fleet));

        $response->assertStatus(403);
    }

}
