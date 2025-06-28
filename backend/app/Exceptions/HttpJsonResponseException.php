<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Http\JsonResponse;

class HttpJsonResponseException extends Exception
{
    public function render(): JsonResponse
    {
        return new JsonResponse([
            'message' => [
                'type' => 'error',
                'text' => $this->getMessage()
            ]
        ], $this->getCode());
    }
}
