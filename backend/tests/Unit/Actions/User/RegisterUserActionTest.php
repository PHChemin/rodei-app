<?php

namespace Tests\Unit\Actions\User;

use App\Exceptions\HttpJsonResponseException;
use App\Http\Actions\User\RegisterUserAction;
use App\Models\Driver;
use App\Models\Manager;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Symfony\Component\HttpFoundation\Response;
use Tests\TestCase;

class RegisterUserActionTest extends TestCase
{
    use RefreshDatabase;

    private function executeAction(bool $isManager = true)
    {
        return (new RegisterUserAction(
            name: 'John Doe',
            cpf: '12345678901',
            email: 'john@example.com',
            password: 'password',
            is_manager: $isManager
        ))->execute();
    }

    public function test_the_action_should_return_an_instance_of_user(): void
    {
        $user = $this->executeAction();

        $this->assertInstanceOf(User::class, $user);
    }

    public function test_should_throw_an_exception_if_an_error_occurs_while_creating_the_user(): void
    {
        $this->expectException(HttpJsonResponseException::class);
        $this->expectExceptionCode(Response::HTTP_INTERNAL_SERVER_ERROR);
        $this->expectExceptionMessage(trans('actions.user.unable.register'));

        $email = 'teste@teste.com';

        User::factory()->create(['email' => $email]);

        (new RegisterUserAction(
            name: 'John Doe',
            cpf: '12345678901',
            email: $email,
            password: 'password',
            is_manager: true
        ))->execute();

        $this->assertCount(0, User::all());
    }

    // ---------------------------------------- MANAGER ------------------------------------------------------------------------------------------------------ //

    public function test_should_correctly_persist_the_user_and_manager_in_the_database(): void
    {
        $user = $this->executeAction();

        $this->assertCount(1, User::all());
        $this->assertCount(1, Manager::all());
        $this->assertEquals($user->id, User::all()->first()->id);
    }

    public function test_should_create_a_manager_for_the_user(): void
    {
        $user = $this->executeAction();

        $this->assertTrue($user->isManager());
    }

    // --------------------------------- DRIVER ------------------------------------------------------------------------------------------------------ //

    public function test_should_correctly_persist_the_user_and_driver_in_the_database(): void
    {
        $user = $this->executeAction(false);

        $this->assertCount(1, User::all());
        $this->assertCount(1, Driver::all());
        $this->assertEquals($user->id, User::all()->first()->id);
    }

    public function test_should_create_a_driver_for_the_user(): void
    {
        $user = $this->executeAction(false);

        $this->assertTrue($user->isDriver());
    }
}
