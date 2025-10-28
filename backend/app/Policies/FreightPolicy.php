<?php

namespace App\Policies;

use App\Models\Freight;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class FreightPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user, int $fleetId, int $truckId): bool
    {
        if (!$user->manager) {
            return false;
        }

        $manager = $user->manager;

        $ownsFleet = $manager->fleets()->where('id', $fleetId)->exists();

        $ownsTruck = $manager->fleets()
            ->whereHas('trucks', fn($q) => $q->where('id', $truckId))
            ->exists();

        return $ownsFleet && $ownsTruck;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Freight $freight): bool
    {
        if($user->isDriver()){
            return $freight->driver_id === $user->driver->id;
        }
        
        if ($user->manager) {
            $manager = $user->manager;

            $ownsFleet = $manager->fleets()->where('id', $freight->fleet_id)->exists();

            $ownsTruck = $manager->fleets()
                ->whereHas('trucks', fn($q) => $q->where('id', $freight->truck_id))
                ->exists();

            return $ownsFleet && $ownsTruck;
        }

        return false;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user, int $fleetId, int $truckId): bool
    {
        if (!$user->manager) {
            return false;
        }

        $manager = $user->manager;

        $ownsFleet = $manager->fleets()->where('id', $fleetId)->exists();

        $ownsTruck = $manager->fleets()
            ->whereHas('trucks', fn($q) => $q->where('id', $truckId))
            ->exists();

        return $ownsFleet && $ownsTruck;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Freight $freight): bool
    {
        if (!$user->manager) {
            return false;
        }

        $manager = $user->manager;

        $ownsFleet = $manager->fleets()->where('id', $freight->fleet_id)->exists();

        $ownsTruck = $manager->fleets()
            ->whereHas('trucks', fn($q) => $q->where('id', $freight->truck_id))
            ->exists();

        return $ownsFleet && $ownsTruck;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Freight $freight): bool
    {
        if(!$user->manager) {
            return false;
        }

        $manager = $user->manager;

        $ownsFleet = $manager->fleets()->where('id', $freight->fleet_id)->exists();

        $ownsTruck = $manager->fleets()
            ->whereHas('trucks', fn($q) => $q->where('id', $freight->truck_id))
            ->exists();

        return $ownsFleet && $ownsTruck;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Freight $freight): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Freight $freight): bool
    {
        return false;
    }
}
