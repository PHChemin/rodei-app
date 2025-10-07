<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\Fleet\FleetController;
use App\Http\Controllers\Truck\TruckController;
use App\Http\Controllers\User\RegisterUserController;
use App\Http\Controllers\User\UserProfileController;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthController::class, 'authenticate'])->name('api.login');
Route::post('/register', [RegisterUserController::class, 'register'])->name('api.register');

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout'])->name('api.logout');

    Route::get('/user/profile', [UserProfileController::class, 'profile'])->name('user.profile');
    Route::patch('/user/profile/name', [UserProfileController::class, 'updateName'])->name('user.profile.name');
    Route::patch('/user/profile/password', [UserProfileController::class, 'updatePassword'])->name('user.profile.password');

    Route::get('/fleets', [FleetController::class, 'index'])->name('fleets.index');
    Route::post('/fleets', [FleetController::class, 'store'])->name('fleets.store');
    Route::put('/fleets/{fleet}', [FleetController::class, 'update'])->name('fleets.update');
    Route::delete('/fleets/{fleet}', [FleetController::class, 'destroy'])->name('fleets.destroy');

    Route::get('/fleets/{fleet}/trucks/{truck}', [TruckController::class, 'show'])->name('fleets.trucks.show');
    Route::post('/fleets/{fleet}/trucks', [TruckController::class, 'store'])->name('fleets.trucks.store');
    Route::put('/fleets/{fleet}/trucks/{truck}', [TruckController::class, 'update'])->name('fleets.trucks.update');
    Route::delete('/fleets/{fleet}/trucks/{truck}', [TruckController::class, 'destroy'])->name('fleets.trucks.destroy');
});
