<?php

namespace App\Policies;

use App\Models\User;

class FleetPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->isManager();
    }

    public function update(User $user, $fleet): bool
    {
        return $user->isManager() && $user->manager->id === $fleet->manager_id;
    }

    public function delete(User $user, $fleet): bool
    {
        return $user->isManager() && $user->manager->id === $fleet->manager_id;
    }

    public function truck(User $user, $fleet): bool
    {
        return $user->isManager() && $user->manager->id === $fleet->manager_id;
    }
}
