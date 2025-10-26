<?php

namespace App\Http\Actions\Expense;

use App\Exceptions\HttpJsonResponseException;
use App\Models\Expense;
use App\Models\Freight;
use Exception;
use Symfony\Component\HttpFoundation\Response;

class CreateExpenseAction
{
    private readonly string $type;
    private readonly string $location;
    private readonly float|int $amount;
    private readonly string $date;
    private readonly ?string $description;
    private readonly Freight $freight;

    public function __construct(
        string $type,
        string $location,
        float|int $amount,
        string $date,
        string $description,
        Freight $freight
        )
    {
        $this->type = $type;
        $this->location = $location;
        $this->amount = $amount;
        $this->date = $date;
        $this->description = $description;
        $this->freight = $freight;
    }

    public function execute(): Expense
    {
        try{
            return Expense::create([
                'type' => $this->type,
                'location' => $this->location,
                'amount' => $this->amount,
                'date' => $this->date,
                'description' => $this->description,
                'freight_id' => $this->freight->id
            ]);
        } catch (Exception $e) {
            throw new HttpJsonResponseException(
                trans('actions.expense.unable.create'),
                Response::HTTP_INTERNAL_SERVER_ERROR
            );
        }
    }
}