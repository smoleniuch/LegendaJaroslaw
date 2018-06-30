<?php
Route::post('workouts/delete', 'WorkoutController@delete');
Route::post('workouts/bulk-edit', 'WorkoutController@bulkEdit');
Route::resource('workouts','WorkoutController');
// Route::post('/workouts/{workout}/cancel','WorkoutController@cancel');

// Route::post('/workouts/{workout}/edit','WorkoutController@edit');

// Route::post('/workouts/{workout}/edit','WorkoutController@edit');

// Route::post('/workouts/{workout}/cancel/undo','WorkoutController@undoCancel');
