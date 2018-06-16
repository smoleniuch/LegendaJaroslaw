<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/{section}', 'HomeController@index')->where(['section' => '.*']);



Route::namespace('Auth')->group(function () {
    Route::post('/login', 'LoginController@authenticate');

    Route::post('/logout', 'LoginController@logout');

    Route::post('/register', 'RegisterController@register');
});

Route::get('/bundle.js', function () {
    return response()->json(['test' => 1]);
}) ;
