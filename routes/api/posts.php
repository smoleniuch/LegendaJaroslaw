<?php

Route::post('/posts/chunk', 'PostController@getByChunk');
Route::resource('posts', 'PostController');
