<?php

namespace App\Http\Controllers\Fleet;

use App\Http\Actions\Fleet\CreateFleetAction;
use App\Http\Actions\Fleet\DeleteFleetAction;
use App\Http\Actions\Fleet\UpdateFleetAction;
use App\Http\Controllers\Controller;
use App\Http\Messages\FlashMessage;
use App\Http\Requests\Fleet\StoreFleetRequest;
use App\Http\Requests\Fleet\UpdateFleetRequest;
use App\Http\Resources\Fleet\FleetBaseResource;
use App\Http\Resources\Fleet\FleetWithTrucksResource;
use App\Models\Fleet;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class FleetController extends Controller
{
    public function index(Request $request)
    {
        if($request->user()->cannot('viewAny', Fleet::class)) {
            abort(Response::HTTP_FORBIDDEN);
        }

        $user = $request->user();
        $fleets = $user->manager->fleets()->with('trucks')->get();

        return FleetWithTrucksResource::collection($fleets);
    }

    public function store(StoreFleetRequest $request): JsonResponse
    {
        $data = $request->validated();

        (new CreateFleetAction(
            $data['name'],
            $request->user()->manager->id
        ))->execute();

        return response()->json(
            FlashMessage::success(trans_choice('flash_messages.success.created.f', 1, [
                'model' => trans_choice('model.fleet', 1),
            ])),
            Response::HTTP_OK
        );
    }

    public function update(UpdateFleetRequest $request, Fleet $fleet): JsonResponse
    {
        $data = $request->validated();

        (new UpdateFleetAction(
            $data['name'],
            $fleet
        ))->execute();

        return response()->json(
            FlashMessage::success(trans_choice('flash_messages.success.updated.f', 1, [
                'model' => trans_choice('model.fleet', 1),
            ])),
            Response::HTTP_OK
        );
    }

    public function destroy(Request $request, Fleet $fleet): JsonResponse
    {
        if($request->user()->cannot('delete', $fleet)) {
            abort(Response::HTTP_FORBIDDEN);
        }

        (new DeleteFleetAction(
            $fleet
        ))->execute();

        return response()->json(
            FlashMessage::success(trans_choice('flash_messages.success.deleted.f', 1, [
                'model' => trans_choice('model.fleet', 1),
            ])),
            Response::HTTP_OK
        );
    }
}
