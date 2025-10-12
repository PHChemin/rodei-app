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
        Schema::table('users', function (Blueprint $table) {
            $table->softDeletes();
        });

        Schema::table('managers', function (Blueprint $table) {
            $table->softDeletes();
        });

        Schema::table('drivers', function (Blueprint $table) {
            $table->softDeletes();
        });

        Schema::table('fleets', function (Blueprint $table) {
            $table->softDeletes();
        });

        Schema::table('trucks', function (Blueprint $table) {
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });

        Schema::table('managers', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });

        Schema::table('drivers', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });

        Schema::table('fleets', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });

        Schema::table('trucks', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });
    }
};
