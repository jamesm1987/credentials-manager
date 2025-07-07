<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\Admin\TypeController;
use App\Http\Controllers\Admin\FieldController;
use App\Http\Controllers\Admin\GroupController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ClientController;


Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::resource('clients', ClientController::class);
    Route::get('clients/{id}/credentials', [ClientController::class, 'manageCredentials']);
    
    Route::prefix('admin')->name('admin.')->group(function() {

        Route::prefix('settings')->name('settings.')->group(function(){    
            Route::resource('types', TypeController::class);
            Route::resource('fields', FieldController::class);
            Route::resource('groups', GroupController::class);
        });
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
