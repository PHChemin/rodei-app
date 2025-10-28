<?php

namespace App\Policies;

use App\Models\Expense;
use App\Models\Fleet;
use App\Models\Freight;
use App\Models\Truck;
use App\Models\User;

class ExpensePolicy
{
    /**
     * Determine whether the user can create models.
     */
    public function create(User $user, Freight $freight): bool
    {
        if($user->isDriver()){
            return $user->driver->id === $freight->driver_id;
        }

        $manager = $user->manager;

        $fleet = Fleet::find($freight->fleet_id);

        $ownsFleet = $fleet->manager_id === $manager->id;

        $ownsTruck = $manager->fleets()
            ->whereHas('trucks', fn($q) => $q->where('id', $freight->truck_id))
            ->exists();

        return $ownsFleet && $ownsTruck;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Expense $expense): bool
    {
        if ($user->isDriver()) {
            return false;
        }

        $manager = $user->manager;

        $freight = $expense->freight;

        $ownsFleet = $manager->fleets()->where('id', $freight->fleet_id)->exists();

        $ownsTruck = $manager->fleets()
            ->whereHas('trucks', fn($q) => $q->where('id', $freight->truck_id))
            ->exists();

        return $ownsFleet && $ownsTruck;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Expense $expense): bool
    {
        if ($user->isDriver()) {
            return false;
        }

        $manager = $user->manager;

        $freight = $expense->freight;

        $ownsFleet = $manager->fleets()->where('id', $freight->fleet_id)->exists();

        $ownsTruck = $manager->fleets()
            ->whereHas('trucks', fn($q) => $q->where('id', $freight->truck_id))
            ->exists();

        return $ownsFleet && $ownsTruck;
    }
}
