<?php

namespace App\Http\Controllers\Manager;

use App\Http\Actions\Manager\ManagerFinancialStatementAction;
use App\Http\Controllers\Controller;
use App\Http\Resources\Manager\ManagerFinancialStatementResource;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ManagerController extends Controller
{
    public function financialStatement(Request $request)
    {
        if($request->user()->isDriver()) {
            abort(Response::HTTP_FORBIDDEN);
        }

        $statement = (new ManagerFinancialStatementAction(
            $request->user()->manager->id
        ))->execute();

        return new ManagerFinancialStatementResource($statement);
    }
}
