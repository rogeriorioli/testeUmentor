<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\EmployerController;

Route::get('/', [EmployerController::class, 'index']);
Route::get('/api/employers', [EmployerController::class, 'getEmployers']);
Route::post('/api/create/employer', [EmployerController::class, 'store']);
