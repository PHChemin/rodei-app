<?php

namespace Tests\Feature\User;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UpdateUserNameTest extends TestCase
{
    use RefreshDatabase;

    // ------------------- HELPER METHODS -------------------------------------------------
    private function route(array $params): string
    {
        return route('user.profile.name', $params);
    }

    private function validInfo(array $overrides = []): array
    {
        return array_merge([
            'name' => 'John Doe',
        ], $overrides);
    }

    // ----------------- TESTS ----------------------------------------------------------------
    
    public function test_authenticated_user_can_update_name()
    {
        $user = User::factory()->create();

        $this->actingAs($user);

        $response = $this->putJson($this->route($this->validInfo()));

        $response->assertStatus(200);
        $response->assertJsonPath('message.type', 'success');
    }

    public function test_guest_cannot_update_name()
    {
        $response = $this->putJson($this->route($this->validInfo()));

        $response->assertStatus(401);
    }

    // ------- Field Test (Request) -------------------------------

    public function test_required_fields_are_validated()
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $response = $this->putJson($this->route([]));

        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['name']);
    }

    public function test_name_must_be_smaller_than_255_characters()
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $response = $this->putJson($this->route([
            'name' => str_repeat('a', 256),
        ]));

        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['name']);
    }
}
