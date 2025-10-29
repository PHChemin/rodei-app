<?php

namespace App\Http\Actions\Expense;

use App\Exceptions\HttpJsonResponseException;
use App\Models\Expense;
use App\Models\Freight;
use Exception;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\Response;

class DeleteExpenseDocumentAction
{
    private readonly Expense $expense;

    public function __construct(Expense $expense)
    {
        $this->expense = $expense;
    }

    public function execute(): void
    {
        try{
            Storage::disk('public')->delete($this->expense->document_path);
    
            $this->expense->update([
                'document_path' => null,
            ]);
        } catch (Exception $e) {
            throw new HttpJsonResponseException(
                trans('actions.document.unable.delete'),
                Response::HTTP_INTERNAL_SERVER_ERROR
            );
        }   
    }
}
