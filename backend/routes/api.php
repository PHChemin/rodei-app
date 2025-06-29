<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\User\RegisterUserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthController::class, 'authenticate'])->name('api.login');
Route::post('/register', [RegisterUserController::class, 'register'])->name('api.register');

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout'])->name('api.logout');
});