<?php

namespace App\Http\Actions\Fleet;

use App\Exceptions\HttpJsonResponseException;
use App\Models\Fleet;
use Exception;
use Symfony\Component\HttpFoundation\Response;

class CreateFleetAction
{
    private readonly string $name;
    private readonly int $managerId;

    public function __construct(string $name, int $managerId)
    {
        $this->name = $name;
        $this->managerId = $managerId;
    }

    public function execute(): Fleet
    {
        try {
            return Fleet::create([
                'manager_id' => $this->managerId,
                'name' => $this->name,
            ]);
        } catch (Exception $e) {
            throw new HttpJsonResponseException(
                trans('actions.fleet.unable.create'),
                Response::HTTP_INTERNAL_SERVER_ERROR
            );
        }
    }
}
