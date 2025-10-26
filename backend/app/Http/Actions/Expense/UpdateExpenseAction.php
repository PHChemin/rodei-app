<?php

namespace App\Http\Actions\Expense;

use App\Exceptions\HttpJsonResponseException;
use App\Models\Expense;
use Exception;
use Symfony\Component\HttpFoundation\Response;

class UpdateExpenseAction
{
    private readonly string $type;
    private readonly string $location;
    private readonly float|int $amount;
    private readonly string $date;
    private readonly ?string $description;
    private readonly Expense $expense;

    public function __construct(
        string $type,
        string $location,
        float|int $amount,
        string $date,
        ?string $description,
        Expense $expense
        )
    {
        $this->type = $type;
        $this->location = $location;
        $this->amount = $amount;
        $this->date = $date;
        $this->description = $description;
        $this->expense = $expense;
    }

    public function execute()
    {
        try{
            $this->expense->update([
                'type' => $this->type,
                'location' => $this->location,
                'amount' => $this->amount,
                'date' => $this->date,
                'description' => $this->description,
            ]);
        } catch (Exception $e) {
            throw new HttpJsonResponseException(
                trans('actions.expense.unable.update'),
                Response::HTTP_INTERNAL_SERVER_ERROR
            );
        }
    }
}