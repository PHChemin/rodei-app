<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('trucks', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('brand_name');
            $table->string('model');
            $table->char('license_plate', 7)->unique();
            $table->string('color');
            $table->decimal('commission_percentage', 5, 2);
            $table->foreignId('fleet_id')->constrained()->cascadeOnDelete();
            $table->foreignId('driver_id')->unique()->nullable()->constrained()->nullOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('trucks');
    }
};
