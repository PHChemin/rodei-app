<?php

namespace App\Http\Controllers\Freights;

use App\Http\Actions\Freight\CreateFreightAction;
use App\Http\Actions\Freight\DeleteFreightAction;
use App\Http\Actions\Freight\DeleteFreightDocumentAction;
use App\Http\Actions\Freight\UpdateFreightAction;
use App\Http\Actions\Freight\UploadFreightDocumentAction;
use App\Http\Controllers\Controller;
use App\Http\Messages\FlashMessage;
use App\Http\Requests\Freights\StoreFreightRequest;
use App\Http\Requests\Freights\UpdateFreightRequest;
use App\Http\Requests\Freights\UploadFreightRequest;
use App\Http\Resources\Freight\FreightBaseResource;
use App\Http\Resources\Freight\FreightDetailsWithExpensesResource;
use App\Models\Fleet;
use App\Models\Freight;
use App\Models\Truck;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\Response;

class FreightController extends Controller
{
    public function index(Request $request, Fleet $fleet, Truck $truck)
    {
        if($request->user()->cannot('viewAny', [Freight::class, $fleet->id, $truck->id])) {
            abort(Response::HTTP_FORBIDDEN);
        };

        $freights = $truck->freights()
            ->orderBy('date', 'desc')
            ->get();

        return FreightBaseResource::collection($freights);
    }

    public function store(StoreFreightRequest $request, Fleet $fleet, Truck $truck)
    {   
        $data = $request->validated();
        
        $freight = (new CreateFreightAction(
            $data['start_address'],
            $data['end_address'],
            $data['contractor_name'],
            $data['date'],
            $data['cargo_weight'],
            $data['ton_price'],
            $data['advance_percentage'],
            $data['total_amount'],
            $data['description'],
            $fleet->id,
            $truck,
            $truck->driver->id,
        ))->execute();   

        return response()->json(
            FlashMessage::success(trans_choice('flash_messages.success.created.m', 1, [
                'model' => trans_choice('model.freight', 1),
            ])),
            Response::HTTP_OK
        );
    }

    public function update(UpdateFreightRequest $request, Fleet $fleet, Truck $truck, Freight $freight)
    {
        $data = $request->validated();

        (new UpdateFreightAction(
            $freight,
            $data['start_address'],
            $data['end_address'],
            $data['contractor_name'],
            $data['date'],
            $data['cargo_weight'],
            $data['ton_price'],
            $data['advance_percentage'],
            $data['total_amount'],
            $data['description'],
            $truck
        ))->execute();

        return response()->json(
            FlashMessage::success(trans_choice('flash_messages.success.updated.m', 1, [
                'model' => trans_choice('model.freight', 1),
            ])),
            Response::HTTP_OK
        );
    }

    public function show(Request $request, Fleet $fleet, Truck $truck, Freight $freight)
    {
        if($request->user()->cannot('view', [$freight])) {
            abort(Response::HTTP_FORBIDDEN);
        };

        $freight->load([
            'fleet',
            'truck',
            'driver.user',
            'expenses'
        ]);

        return FreightDetailsWithExpensesResource::make($freight);
    }

    public function destroy(Request $request, Fleet $fleet, Truck $truck, Freight $freight)
    {
        if($request->user()->cannot('delete', [$freight])) {
            abort(Response::HTTP_FORBIDDEN);
        };

        (new DeleteFreightAction(
            $freight
        ))->execute();

        return response()->json(
            FlashMessage::success(trans_choice('flash_messages.success.deleted.m', 1, [
                'model' => trans_choice('model.freight', 1),
            ])),
            Response::HTTP_OK
        );
    }

    public function uploadDocument(UploadFreightRequest $request, Fleet $fleet, Truck $truck, Freight $freight)
    {
        (new UploadFreightDocumentAction(
            $freight,
            $request->file('document')
        ))->execute();

        return response()->json(
            FlashMessage::success(trans_choice('flash_messages.success.uploaded.m', 1, [
                'model' => trans_choice('model.document', 1),
            ])),
            Response::HTTP_OK
        );
    }

    public function destroyDocument(Request $request, Fleet $fleet, Truck $truck, Freight $freight)
    {
        if($request->user()->cannot('delete', [$freight])) {
            abort(Response::HTTP_FORBIDDEN);
        };

        (new DeleteFreightDocumentAction(
            $freight
        ))->execute();

        return response()->json(
            FlashMessage::success(trans_choice('flash_messages.success.deleted.m', 1, [
                'model' => trans_choice('model.document', 1),
            ])),
            Response::HTTP_OK
        );
    }

    public function downloadDocument(Request $request, Fleet $fleet, Truck $truck, Freight $freight)
    {
        if ($request->user()->cannot('view', [$freight])) {
            abort(Response::HTTP_FORBIDDEN);
        }

        if (!$freight->document_path || !Storage::disk('public')->exists($freight->document_path)) {
            abort(Response::HTTP_NOT_FOUND);
        }

        return Storage::download($freight->document_path);
    }
}
