<?php

namespace App\Models;

use App\Enums\TruckBrand;
use App\Enums\TruckColor;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Truck extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'brand_name',
        'model',
        'license_plate',
        'color',
        'commission_percentage',
        'fleet_id',
        'driver_id',
    ];

    protected $casts = [
        'brand_name' => TruckBrand::class,
        'color' => TruckColor::class,
    ];

    public function fleet()
    {
        return $this->belongsTo(Fleet::class);
    }

    public function driver()
    {
        return $this->belongsTo(Driver::class);
    }
}
