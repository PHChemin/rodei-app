<?php

namespace App\Http\Actions\Fleet;

use App\Exceptions\HttpJsonResponseException;
use App\Models\Fleet;
use Exception;
use Symfony\Component\HttpFoundation\Response;

class DeleteFleetAction
{
    private readonly Fleet $fleet;

    public function __construct(Fleet $fleet)
    {
        $this->fleet = $fleet;
    }

    public function execute(): void
    {
        try {
            $this->fleet->delete();
        } catch (Exception $e) {
            throw new HttpJsonResponseException(
                trans('actions.fleet.unable.delete'),
                Response::HTTP_INTERNAL_SERVER_ERROR
            );
        }
    }
}
