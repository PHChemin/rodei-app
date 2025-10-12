<?php

namespace App\Http\Actions\Freight;

use App\Exceptions\HttpJsonResponseException;
use App\Models\Freight;
use App\Services\Freight\CalculateAdvanceService;
use Exception;
use Symfony\Component\HttpFoundation\Response;

class UpdateFreightAction
{
    private readonly Freight $freight;
    private readonly string $start_address;
    private readonly string $end_address;
    private readonly string $contractor_name;
    private readonly string $date;
    private readonly float|int $cargo_weight;
    private readonly float|int $ton_price;
    private readonly float|int $advance_percentage;
    private readonly float|int $total_amount;
    private readonly ?string $description;
    
    public function __construct(
        Freight $freight,
        string $start_address,
        string $end_address,
        string $contractor_name,
        string $date,
        float $cargo_weight,
        float $ton_price,
        float $advance_percentage,
        float $total_amount,
        ?string $description,
        )
    {
        $this->freight = $freight;
        $this->start_address = $start_address;
        $this->end_address = $end_address;
        $this->contractor_name = $contractor_name;
        $this->date = $date;
        $this->cargo_weight = $cargo_weight;
        $this->ton_price = $ton_price;
        $this->advance_percentage = $advance_percentage;
        $this->total_amount = $total_amount;
        $this->description = $description;
    }

    public function execute(): Freight
    {
        try{
            $this->freight->update([
                'start_address' => $this->start_address,
                'end_address' => $this->end_address,
                'contractor_name' => $this->contractor_name,
                'date' => $this->date,
                'cargo_weight' => $this->cargo_weight,
                'ton_price' => $this->ton_price,
                'advance_percentage' => $this->advance_percentage,
                'advance' => CalculateAdvanceService::calculate($this->total_amount, $this->advance_percentage),
                'total_amount' => $this->total_amount,
                'description' => $this->description,
            ]);

            return $this->freight;
        } catch (Exception $e) {
            throw new HttpJsonResponseException(
                trans('actions.freight.unable.update'),
                Response::HTTP_INTERNAL_SERVER_ERROR
            );
        }
    }
}