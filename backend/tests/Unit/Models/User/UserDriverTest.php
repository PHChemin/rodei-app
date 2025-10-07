<?php

namespace Tests\Unit\Models\User;

use App\Models\Driver;
use App\Models\Manager;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UserDriverTest extends TestCase
{
    use RefreshDatabase;

    private User $user;

    public function setUp(): void
    {
        parent::SetUp();

        $this->user = User::factory()->create();
        $this->user->driver()->save(Driver::factory()->create());
    }

    public function test_user_can_have_a_driver()
    {
        $this->assertNotNull($this->user->driver);
        $this->assertInstanceOf(Driver::class, $this->user->driver);
    }

    public function test_should_return_true_if_user_is_a_driver()
    {
        $this->assertTrue($this->user->isDriver());
    }

    public function test_should_return_false_if_user_is_not_a_driver()
    {
        $user = User::factory()->create();
        $user->manager()->save(Manager::factory()->create());

        $this->assertFalse($user->isDriver());
    }
}
