<?php

namespace Tests\Unit\Actions\User;

use App\Exceptions\HttpJsonResponseException;
use App\Http\Actions\User\UpdateUserPasswordAction;
use App\Models\User;
use Database\Seeders\DatabaseSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class UpdateUserPasswordActionTest extends TestCase
{
    use RefreshDatabase;

    private User $user;
    private string $password;
    private string $newPassword;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed(DatabaseSeeder::class);

        $this->password = 'password';
        $this->newPassword = '1234567890';

        $this->user = User::factory()->create([
            'password' => Hash::make($this->password),
        ]);
    }

    public function test_should_return_the_user_with_his_updated_data_when_action_is_successful(): void
    {
        (new UpdateUserPasswordAction(
            $this->user,
            $this->password,
            $this->newPassword
        ))->execute();

        $this->assertTrue(Hash::check($this->newPassword, $this->user->password));
    }

    public function test_user_data_must_be_updated_in_the_database(): void
    {
        (new UpdateUserPasswordAction(
            $this->user,
            $this->password,
            $this->newPassword
        ))->execute();

        $user = $this->user->fresh();

        $this->assertTrue(Hash::check($this->newPassword, $user->password));
    }

    public function test_should_throw_exception_if_current_password_is_wrong(): void
    {
        $this->expectException(HttpJsonResponseException::class);
        $this->expectExceptionMessage(trans('actions.user.unable.verify_password'));

        (new UpdateUserPasswordAction(
            $this->user,
            'wrong-password',
            $this->newPassword
        ))->execute();
    }

    public function test_should_update_remember_token_when_password_is_changed(): void
    {
        $oldToken = $this->user->remember_token;

        (new UpdateUserPasswordAction(
            $this->user,
            $this->password,
            $this->newPassword
        ))->execute();

        $this->assertNotEquals($oldToken, $this->user->fresh()->remember_token);
    }

    public function test_should_update_user_data_in_database(): void
    {
        (new UpdateUserPasswordAction(
            $this->user,
            $this->password,
            $this->newPassword
        ))->execute();

        $user = $this->user->fresh();

        $this->assertTrue(Hash::check($this->newPassword, $user->password));
        $this->assertNotNull($user->updated_at);
    }
}
