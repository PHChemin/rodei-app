<?php

namespace App\Http\Controllers\Expense;

use App\Http\Actions\Expense\CreateExpenseAction;
use App\Http\Actions\Expense\DeleteExpenseAction;
use App\Http\Actions\Expense\UpdateExpenseAction;
use App\Http\Actions\Expense\UploadExpenseDocumentAction;
use App\Http\Controllers\Controller;
use App\Http\Messages\FlashMessage;
use App\Http\Requests\Expense\StoreExpenseRequest;
use App\Http\Requests\Expense\UpdateExpenseRequest;
use App\Models\Expense;
use App\Models\Fleet;
use App\Models\Freight;
use App\Models\Truck;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\Response;

class ExpenseController extends Controller
{
    public function store(StoreExpenseRequest $request, Fleet $fleet, Truck $truck, Freight $freight)
    {
        $data = $request->validated();

        $expense = (new CreateExpenseAction(
            $data['type'],
            $data['location'],
            $data['amount'],
            $data['date'],
            $data['description'],
            $freight
        ))->execute();

        return response()->json(
            FlashMessage::success(trans_choice('flash_messages.success.created.f', 1, [
                'model' => trans_choice('model.expense', 1),
            ])),
            Response::HTTP_OK
        );
    }

    public function update(UpdateExpenseRequest $request,  Fleet $fleet, Truck $truck, Freight $freight, Expense $expense)
    {
        $data = $request->validated();

        (new UpdateExpenseAction(
            $data['type'],
            $data['location'],
            $data['amount'],
            $data['date'],
            $data['description'],
            $expense
        ))->execute();

        return response()->json(
            FlashMessage::success(trans_choice('flash_messages.success.updated.f', 1, [
                'model' => trans_choice('model.expense', 1),
            ])),
            Response::HTTP_OK
        );
    }

    public function destroy(Request $request, Fleet $fleet, Truck $truck, Freight $freight, Expense $expense)
    {
        if($request->user()->cannot('delete', [$expense])) {
            abort(Response::HTTP_FORBIDDEN);
        };

        (new DeleteExpenseAction(
            $expense
        ))->execute();

        return response()->json(
            FlashMessage::success(trans_choice('flash_messages.success.deleted.f', 1, [
                'model' => trans_choice('model.expense', 1),
            ])),
            Response::HTTP_OK
        );
    }

    public function uploadDocument(Request $request, Fleet $fleet, Truck $truck, Freight $freight, Expense $expense)
    {
        (new UploadExpenseDocumentAction(
            $expense,
            $request->file('document')
        ))->execute();

        return response()->json(
            FlashMessage::success(trans_choice('flash_messages.success.updated.m', 1, [
                'model' => trans_choice('model.document', 1),
            ])),
            Response::HTTP_OK
        );
    }

    public function destroyDocument(Request $request, Fleet $fleet, Truck $truck, Freight $freight, Expense $expense)
    {
        if($request->user()->cannot('delete', [$expense])) {
            abort(Response::HTTP_FORBIDDEN);
        };

        (new DeleteExpenseAction(
            $expense
        ))->execute();

        return response()->json(
            FlashMessage::success(trans_choice('flash_messages.success.deleted.f', 1, [
                'model' => trans_choice('model.expense', 1),
            ])),
            Response::HTTP_OK
        );
    }

    public function downloadDocument(Request $request, Fleet $fleet, Truck $truck, Freight $freight, Expense $expense)
    {
        if ($request->user()->cannot('view', [$freight])) {
            abort(Response::HTTP_FORBIDDEN);
        }

        if (!$expense->document_path || !Storage::disk('public')->exists($expense->document_path)) {
            abort(Response::HTTP_NOT_FOUND);
        }

        return Storage::download($expense->document_path);
    }
}
