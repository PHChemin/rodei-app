<?php

namespace App\Http\Controllers\Driver;

use App\Http\Actions\Driver\DriverFinancialStatementAction;
use App\Http\Controllers\Controller;
use App\Http\Resources\Driver\DriverFinancialStatementResource;
use App\Http\Resources\Driver\DriverHomeResource;
use App\Http\Resources\Freight\FreightBaseResource;
use App\Models\Driver;
use App\Models\Freight;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class DriverController extends Controller
{
    public function index(Request $request)
    {
        if($request->user()->cannot('view', Driver::class)) {
            abort(Response::HTTP_FORBIDDEN);
        }

        $driver = $request->user()->driver->load('user');
        $truck = $driver->truck;
        $lastFreight = Freight::where('driver_id', $driver->id)
            ->orderBy('date', 'desc')
            ->first();

        $data = (object) [
            'driver' => $driver,
            'truck' => $truck,
            'last_freight' => $lastFreight,
        ];

        return DriverHomeResource::make($data);
    }

    public function freightHistory(Request $request)
    {
        if($request->user()->cannot('view', Driver::class)) {
            abort(Response::HTTP_FORBIDDEN);
        }

        $driver = $request->user()->driver;
        
        $freights = $driver->freights()
            ->orderBy('date', 'desc')
            ->get();

        return FreightBaseResource::collection($freights);
    }

    public function financialStatement(Request $request)
    {
        if($request->user()->isManager()) {
            abort(Response::HTTP_FORBIDDEN);
        }

        $statement = (new DriverFinancialStatementAction(
            $request->user()->driver
        ))->execute();

        return new DriverFinancialStatementResource($statement);
    }
}
