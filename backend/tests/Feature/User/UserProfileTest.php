<?php

namespace Tests\Feature\User;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class UserProfileTest extends TestCase
{
    use RefreshDatabase;

    // ------------------- HELPER METHODS -------------------------------------------------
    private function route(): string
    {
        return route('user.profile');
    }

    // ----------------- TESTS ----------------------------------------------------------------

    public function test_authenticated_user_can_get_profile(): void
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $response = $this->getJson($this->route());

        $response->assertStatus(200);
        $response->assertJson([
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
        ]);
    }

    public function test_guest_cannot_access_profile(): void
    {
        $response = $this->getJson($this->route());
        $response->assertStatus(401);
    }
}