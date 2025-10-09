<?php

namespace App\Http\Actions\Freight;

use App\Exceptions\HttpJsonResponseException;
use App\Models\Freight;
use Exception;
use Symfony\Component\HttpFoundation\Response;

class DeleteFreightAction
{
    private readonly Freight $freight;

    public function __construct(Freight $freight)
    {
        $this->freight = $freight;
    }

    public function execute(): void
    {
        try{
            $this->freight->delete();
        } catch (Exception $e) {
            throw new HttpJsonResponseException(
                trans('actions.truck.unable.delete'),
                Response::HTTP_INTERNAL_SERVER_ERROR
            );
        }
    }
}