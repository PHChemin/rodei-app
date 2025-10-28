<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Freight extends Model
{
    use SoftDeletes;

    /** @use HasFactory<\Database\Factories\FreightFactory> */
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'start_address',
        'end_address',
        'contractor_name',
        'date',
        'cargo_weight',
        'ton_price',
        'advance',
        'advance_percentage',
        'total_amount',
        'driver_commission',
        'description',
        'document_path',
        'fleet_id',
        'truck_id',
        'driver_id',
    ];

    public function fleet(): BelongsTo
    {
        return $this->belongsTo(Fleet::class);
    }

    public function truck(): BelongsTo
    {
        return $this->belongsTo(Truck::class);
    }
    
    public function driver(): BelongsTo
    {
        return $this->belongsTo(Driver::class);
    }

    public function expenses(): HasMany
    {
        return $this->hasMany(Expense::class);
    }
}
