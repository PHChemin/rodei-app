<?php

namespace Tests\Feature\User;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class UpdateUserPasswordTest extends TestCase
{
    use RefreshDatabase;

    // ------------------- HELPER METHODS -------------------------------------------------
    private function route(array $params): string
    {
        return route('user.profile.password', $params);
    }

    private function validInfo(array $overrides = []): array
    {
        return array_merge([
            'password' => 'password',
            'new_password' => 'new-password',
            'new_password_confirmation' => 'new-password',
        ], $overrides);
    }

    // ----------------- TESTS ----------------------------------------------------------------
    
    public function test_authenticated_user_can_update_password(): void
    {
        $user = User::factory()->create([
            'password' => Hash::make('password'),
        ]);

        $this->actingAs($user);

        $response = $this->putJson($this->route($this->validInfo()));

        $response->assertStatus(200);
        $response->assertJsonPath('message.type', 'success');
    }

    public function test_cannot_update_password_with_wrong_current_password(): void
    {
        $user = User::factory()->create([
            'password' => Hash::make('password'),
        ]);

        $this->actingAs($user);

        $response = $this->putJson($this->route(
            $this->validInfo([
                'password' => 'wrong-password',
            ])
        ));

        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['password']);
    }

    public function test_guest_cannot_update_password(): void
    {
        $response = $this->putJson($this->route($this->validInfo()));

        $response->assertStatus(401);
    }
    
    // ------------------ Field Tests (Request) -------------------------------------------------------------------------

    public function test_required_fields_are_validated(): void
    {
        $user = User::factory()->create([
            'password' => Hash::make('password'),
        ]);
        $this->actingAs($user);

        $response = $this->putJson($this->route([]));

        $response->assertStatus(422);
        $response->assertJsonValidationErrors([
            'password',
            'new_password',
            'new_password_confirmation',
        ]);
    }

    public function test_new_password_and_confirmation_must_match(): void
    {
        $user = User::factory()->create([
            'password' => Hash::make('password'),
        ]);
        $this->actingAs($user);

        $response = $this->putJson($this->route([
            'password' => 'password',
            'new_password' => 'new-password',
            'new_password_confirmation' => 'different-password',
        ]));

        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['new_password_confirmation']);
    }

    public function test_current_password_must_be_correct(): void
    {
        $user = User::factory()->create([
            'password' => Hash::make('password'),
        ]);
        $this->actingAs($user);

        $response = $this->putJson($this->route([
            'password' => 'wrong-password',
            'new_password' => 'new-password',
            'new_password_confirmation' => 'new-password',
        ]));

        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['password']);
    }
}
