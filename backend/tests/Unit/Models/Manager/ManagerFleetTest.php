<?php

namespace Tests\Unit\Models\Manager;

use App\Models\Fleet;
use App\Models\Manager;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ManagerFleetTest extends TestCase
{
    use RefreshDatabase;

    public function test_manager_has_many_fleets()
    {
        $manager = Manager::factory()->create();

        $fleets = Fleet::factory()->count(3)->for($manager)->create();

        $this->assertCount(3, $manager->fleets);
        $this->assertTrue($manager->fleets->contains($fleets->first()));
    }
}
