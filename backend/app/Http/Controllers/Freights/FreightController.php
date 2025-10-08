<?php

namespace App\Http\Controllers\Freights;

use App\Actions\Freight\UploadFreightDocumentAction;
use App\Http\Actions\Freights\CreateFreightAction;
use App\Http\Controllers\Controller;
use App\Http\Messages\FlashMessage;
use App\Http\Requests\Freights\StoreFreightRequest;
use App\Models\Fleet;
use App\Models\Truck;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class FreightController extends Controller
{
    public function index()
    {
        //
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
            $truck->id,
            $truck->driver->id,
        ))->execute();

        new UploadFreightDocumentAction($freight, $request->file('document'));

        return response()->json(
            FlashMessage::success(trans_choice('flash_messages.success.created.m', 1, [
                'model' => trans_choice('model.freight', 1),
            ])),
            Response::HTTP_OK
        );
    }

    public function show($id)
    {
        //
    }

    public function update(Request $request, $id)
    {
        //
    }

    public function destroy($id)
    {
        //
    }
}
