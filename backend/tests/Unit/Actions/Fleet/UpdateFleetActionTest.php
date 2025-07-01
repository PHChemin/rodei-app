<?php

namespace Tests\Unit\Actions\Fleet;

use App\Http\Actions\Fleet\UpdateFleetAction;
use App\Models\Manager;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UpdateFleetActionTest extends TestCase
{
    use RefreshDatabase;

    public function test_should_update_fleet_name(): void
    {
        $manager = Manager::factory()->create();
        $fleet = $manager->fleets()->create(['name' => 'Antigo Nome']);

        $fleet = (new UpdateFleetAction('Novo Nome', $fleet))->execute();

        $this->assertEquals('Novo Nome', $fleet->name);
    }
}
