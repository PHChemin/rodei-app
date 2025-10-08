<?php

namespace Tests\Unit\Actions\Fleet;

use App\Http\Actions\Fleet\DeleteFleetAction;
use App\Models\Manager;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DeleteFleetActionTest extends TestCase
{
    use RefreshDatabase;

    public function test_should_delete_fleet(): void
    {
        $manager = Manager::factory()->create();
        $fleet = $manager->fleets()->create(['name' => 'Frota para deletar']);

        (new DeleteFleetAction($fleet))->execute();

        $this->assertSoftDeleted('fleets', ['id' => $fleet->id]);
    }
}
