<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\Fleet\FleetController;
use App\Http\Controllers\Truck\TruckController;
use App\Http\Controllers\User\RegisterUserController;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthController::class, 'authenticate'])->name('api.login');
Route::post('/register', [RegisterUserController::class, 'register'])->name('api.register');

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout'])->name('api.logout');

    Route::get('/fleets', [FleetController::class, 'index'])->name('fleets.index');
    Route::post('/fleets', [FleetController::class, 'store'])->name('fleets.store');
    Route::put('/fleets/{fleet}', [FleetController::class, 'update'])->name('fleets.update');
    Route::delete('/fleets/{fleet}', [FleetController::class, 'destroy'])->name('fleets.destroy');

    Route::post('/fleets/{fleet}/trucks', [TruckController::class, 'storeTruck'])->name('fleets.trucks.store');
    Route::put('/fleets/{fleet}/trucks/{truck}', [TruckController::class, 'updateTruck'])->name('fleets.trucks.update');
    Route::delete('/fleets/{fleet}/trucks/{truck}', [TruckController::class, 'destroyTruck'])->name('fleets.trucks.destroy');
});
