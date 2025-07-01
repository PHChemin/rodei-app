<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Fleet extends Model
{
    /** @use HasFactory<\Database\Factories\DriverFactory> */
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'manager_id',
    ];

    public function manager(): BelongsTo
    {
        return $this->belongsTo(Manager::class);
    }
}
