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
        Schema::create('freights', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('start_address');
            $table->string('end_address');
            $table->string('contractor_name');
            $table->date('date');
            $table->decimal('cargo_weight', 10, 2);
            $table->decimal('ton_price', 10, 2);
            $table->decimal('advance', 10, 2)->nullable();
            $table->decimal('advance_percentage', 5, 2);
            $table->decimal('total_amount', 10, 2);
            $table->text('description')->nullable();
            $table->string('document_path')->nullable();
            $table->foreignId('fleet_id')->constrained();
            $table->foreignId('truck_id')->constrained();
            $table->foreignId('driver_id')->constrained();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('freights');
    }
};
