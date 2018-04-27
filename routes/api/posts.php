<?php

Route::get('/posts','PostController@index');
Route::post('/posts','PostController@store');
