<?php

namespace App\Http\Resources\User;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserLoginResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'cpf' => $this->cpf,
            'email' => $this->email,
            'name' => $this->name,
            'is_manager' => $this->isManager(),
            'is_driver' => $this->isDriver(),
            'manager_id' => $this->when($this->isManager(), function () {
                return $this->manager->id;
            }),
            'driver_id' => $this->when($this->isDriver(), function () {
                return $this->driver->id;
            }),
        ];
    }
}
