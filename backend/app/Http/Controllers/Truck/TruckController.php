<?php

namespace App\Http\Controllers\Truck;

use App\Http\Actions\Truck\AttachDriverToTruckAction;
use App\Http\Actions\Truck\CreateTruckAction;
use App\Http\Actions\Truck\DeleteTruckAction;
use App\Http\Actions\Truck\UpdateTruckAction;
use App\Http\Controllers\Controller;
use App\Http\Messages\FlashMessage;
use App\Http\Requests\Truck\StoreTruckRequest;
use App\Http\Requests\Truck\UpdateTruckRequest;
use App\Http\Resources\Truck\TruckBaseResource;
use App\Models\Fleet;
use App\Models\Truck;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class TruckController extends Controller
{
    public function show(Fleet $fleet, Truck $truck)
    {
        if ($truck->fleet_id !== $fleet->id) {
            abort(404);
        }

        return new TruckBaseResource($truck);
    }

    public function store(StoreTruckRequest $request, Fleet $fleet)
    {
        $data = $request->validated();

        $truck = (new CreateTruckAction(
            $fleet,
            $data['brand_name'],
            $data['model'],
            $data['license_plate'],
            $data['color'],
            $data['commission_percentage']
        ))->execute();

        (new AttachDriverToTruckAction(
            $truck,
            $data['driver_cpf']
        ))->execute();

        return response()->json(
            FlashMessage::success(trans_choice('flash_messages.success.created.m', 1, [
                'model' => trans_choice('model.truck', 1),
            ])),
            Response::HTTP_OK
        );
    }

    public function update(UpdateTruckRequest $request,Fleet $fleet, Truck $truck)
    {
        $data = $request->validated();

        (new UpdateTruckAction(
            $truck,
            $data['brand_name'],
            $data['model'],
            $data['license_plate'],
            $data['color'],
            $data['commission_percentage']
        ))->execute();

        return response()->json(
            FlashMessage::success(trans_choice('flash_messages.success.updated.m', 1, [
                'model' => trans_choice('model.truck', 1),
            ])),
            Response::HTTP_OK
        );
    }

    public function destroy(Request $request,Fleet $fleet,Truck $truck)
    {
        if($request->user()->cannot('truck', $fleet)) {
            abort(Response::HTTP_FORBIDDEN);
        }

        (new DeleteTruckAction($truck))->execute();

        return response()->json(
            FlashMessage::success(trans_choice('flash_messages.success.deleted.m', 1, [
                'model' => trans_choice('model.truck', 1),
            ])),
            Response::HTTP_OK
        );
    }
}
