<?php

namespace Tests\Unit\Actions\Fleet;

use App\Http\Actions\Fleet\CreateFleetAction;
use App\Models\Fleet;
use App\Models\Manager;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CreateFleetActionTest extends TestCase
{
    use RefreshDatabase;

    public function test_should_create_a_fleet_for_manager(): void
    {
        $manager = Manager::factory()->create();

        $fleet = (new CreateFleetAction('Frota 1', $manager->id))->execute();

        $this->assertInstanceOf(Fleet::class, $fleet);
        $this->assertEquals('Frota 1', $fleet->name);
        $this->assertEquals($manager->id, $fleet->manager_id);
    }
}
