<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TodoController;
use App\Http\Controllers\AuthController;
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

Route::prefix('todos')->group(function () {
    Route::get('/', [TodoController::class, 'index']); // Get all todos
    Route::post('/', [TodoController::class, 'store']); // Create a new todo
    Route::get('/{id}', [TodoController::class, 'show']); // Get a specific todo
    Route::put('/{id}', [TodoController::class, 'update']); // Update a specific todo
    Route::delete('/{id}', [TodoController::class, 'destroy']); // Delete a specific todo
});

Route::prefix('auth')->group(function () {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
    Route::get('/user', [AuthController::class, 'user']);
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
