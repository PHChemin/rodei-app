<?php

namespace Tests\Unit\Actions\User;

use App\Http\Actions\User\UpdateUserNameAction;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UpdateUserNameActionTest extends TestCase
{
    use RefreshDatabase;

    private User $user;
    private string $name;
    private string $newName;

    protected function setUp(): void
    {
        parent::setUp();

        $this->name = 'TestName';
        $this->newName = 'NewTestName';

        $this->user = User::factory()->create([
            'name' => $this->name,
        ]);
    }

    public function test_should_update_user_name(): void
    {
        $user = (new UpdateUserNameAction($this->user, $this->newName))->execute();

        $this->assertEquals($this->newName, $user->name);
    }
}
