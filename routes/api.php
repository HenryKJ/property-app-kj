<?php

use App\Http\Controllers\PropertyController;
use App\Http\Controllers\RoomController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Routes for managing properties
Route::prefix('properties')->group(function () {
    // Create a new property
    Route::post('/', [PropertyController::class, 'store']);

    // Fetch all properties
    Route::get('/', [PropertyController::class, 'index']);

    // Edit a specific property
    Route::put('/{id}', [PropertyController::class, 'update']);

    // Delete a specific property
    Route::delete('/{id}', [PropertyController::class, 'destroy']);
});

Route::prefix('rooms')->group(function () {
    // Create a new room
    Route::post('/', [RoomController::class, 'store']);

    // Fetch all rooms for a specific property
    Route::get('/{propertyId}', [RoomController::class, 'index']);

    // Edit a specific room
    Route::put('/{id}', [RoomController::class, 'update']);

    // Delete a specific room
    Route::delete('/{id}', [RoomController::class, 'destroy']);
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
