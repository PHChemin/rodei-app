<?php

namespace App\Http\Actions\Expense;

use App\Exceptions\HttpJsonResponseException;
use App\Models\Expense;
use Exception;
use Symfony\Component\HttpFoundation\Response;

class DeleteExpenseAction
{
    private readonly Expense $expense;

    public function __construct(Expense $expense)
    {
        $this->expense = $expense;
    }

    public function execute()
    {
        try{
            $this->expense->delete();
        } catch (Exception $e) {
            throw new HttpJsonResponseException(
                trans('actions.expense.unable.delete'),
                Response::HTTP_INTERNAL_SERVER_ERROR
            );
        }
    }
}