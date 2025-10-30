<?php

namespace App\Policies;

use App\Models\Truck;
use App\Models\User;

class TruckPolicy
{
    /**
     * Determine whether the user can view the model.
     */
    public function viewFinances(User $user, Truck $truck): bool
    {
        if($user->isDriver()){
            return false;
        }
        
        $manager = $user->manager;

        $ownsTruck = $manager->fleets()
                ->whereHas('trucks', fn($q) => $q->where('id', $truck->id))
                ->exists();

        return $ownsTruck;
    }
}
