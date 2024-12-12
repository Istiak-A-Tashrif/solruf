<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthController;

// Routes for user management (no authentication required)
Route::get('/users', [UserController::class, 'index']);  // Fetch all users
Route::get('/users/{id}', [UserController::class, 'show']);  // Fetch a specific user by ID
Route::post('/users', [UserController::class, 'store']);  // Create a new user

// These routes will require authentication
Route::middleware('jwt.auth')->group(function () {
    Route::put('/users/{id}', [UserController::class, 'update']);  // Update user
    Route::delete('/users/{id}', [UserController::class, 'destroy']);  // Delete user
    Route::get('/user', [AuthController::class, 'getAuthenticatedUser']);  // Get authenticated user info
});

// Route for login (no authentication required)
Route::post('login', [AuthController::class, 'login']);
