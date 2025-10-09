<?php

namespace Tests\Feature\User;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class RegisterUserTest extends TestCase
{
    use RefreshDatabase;

    // ------------------- HELPER METHODS -------------------------------------------------
    private function route(array $params): string
    {
        return route('api.register', $params);
    }

    private function validInfo(array $overrides = []): array
    {
        return array_merge([
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'cpf' => '454.278.310-37',
            'password' => 'password',
            'password_confirmation' => 'password',
            'is_manager' => true,
        ], $overrides);
    }

    // ----------------- TESTS ----------------------------------------------------------------

    public function test_user_can_register()
    {
        $response = $this->postJson($this->route($this->validInfo()));

        $response->assertStatus(200);
        $this->assertNotNull(
            User::where('email', 'john@example.com')->first()
        );
        $response->assertJsonPath('message.type', 'success');
    }

    public function test_register_should_fail_if_parameters_are_not_provided()
    {
        $response = $this->postJson($this->route([]));
        $response->assertStatus(422);
        $response->assertJsonValidationErrors(
            ['name', 'email', 'cpf', 'password', 'is_manager']
        );
    }

    public function test_register_should_fail_if_name_is_bigger_than_255_characters()
    {
        $response = $this->postJson(
            $this->route($this->validInfo(['name' => str_repeat('a', 256)]))
        );
        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['name']);
    }

    public function test_register_should_fail_if_cpf_already_in_use()
    {
        $cpf = '12345678901';

        User::factory()->create(['cpf' => $cpf]);

        $response = $this->postJson(
            $this->route($this->validInfo(['cpf' => $cpf]))
        );

        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['cpf']);
    }

    public function test_register_should_fail_if_email_already_in_use()
    {
        $email = 'teste@teste.com';

        User::factory()->create(['email' => $email]);

        $response = $this->postJson(
            $this->route($this->validInfo(['email' => $email]))
        );

        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['email']);
    }

    public function test_register_should_fail_if_email_is_invalid()
    {
        $response = $this->postJson(
            $this->route($this->validInfo(['email' => 'invalid-email']))
        );

        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['email']);
    }

    public function test_register_should_fail_if_password_is_too_short()
    {
        $response = $this->postJson(
            $this->route($this->validInfo([
                'password' => 'short',
                'password_confirmation' => 'short',
            ]))
        );

        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['password']);
    }

    public function test_register_should_fail_if_passwords_do_not_match()
    {
        $response = $this->postJson(
            $this->route($this->validInfo([
                'password' => 'password123',
                'password_confirmation' => 'different',
            ]))
        );

        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['password']);
    }

    public function test_register_should_fail_if_cpf_is_too_short()
    {
        $response = $this->postJson(
            $this->route($this->validInfo(['cpf' => '123']))
        );

        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['cpf']);
    }

    public function test_register_should_fail_if_is_manager_is_not_boolean()
    {
        $response = $this->postJson(
            $this->route($this->validInfo(['is_manager' => 'yes']))
        );

        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['is_manager']);
    }
}
