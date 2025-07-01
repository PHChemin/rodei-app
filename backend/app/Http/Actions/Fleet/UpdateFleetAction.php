<?php

namespace App\Http\Actions\Fleet;

use App\Exceptions\HttpJsonResponseException;
use App\Models\Fleet;
use Exception;
use Symfony\Component\HttpFoundation\Response;

class UpdateFleetAction
{
    private readonly string $name;
    private readonly Fleet $fleet;
    public function __construct(string $name, Fleet $fleet)
    {
        $this->name = $name;
        $this->fleet = $fleet;
    }

    public function execute(): Fleet
    {
        try {
            $this->fleet->update([
                'name' => $this->name,
            ]);

            return $this->fleet;
        } catch (Exception $e) {
            throw new HttpJsonResponseException(
                trans('actions.fleet.unable.update'),
                Response::HTTP_INTERNAL_SERVER_ERROR
            );
        }
    }
}
