<?php

namespace Tests\Unit\Models\User;

use App\Models\Driver;
use App\Models\Manager;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UserManagerTest extends TestCase
{
    use RefreshDatabase;

    private User $user;

    public function setUp(): void
    {
        parent::SetUp();

        $this->user = User::factory()->create();
        $this->user->manager()->save(Manager::factory()->create());
    }

    public function test_user_can_have_a_manager()
    {
        $this->assertNotNull($this->user->manager);
        $this->assertTrue($this->user->isManager());
        $this->assertInstanceOf(Manager::class, $this->user->manager);
    }

    public function test_should_return_true_if_user_is_a_manager()
    {
        $this->assertTrue($this->user->isManager());
    }

    public function test_should_return_false_if_user_is_not_a_manager()
    {
        $user = User::factory()->create();
        $user->driver()->save(Driver::factory()->create());

        $this->assertFalse($user->isManager());
    }
}
