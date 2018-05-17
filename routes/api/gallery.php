<?php
Route::delete('/gallery/albums', 'API\GalleryController@destroyAlbum');
Route::post('/gallery/albums', 'API\GalleryController@storeAlbum');

Route::post('/gallery/photos', 'API\GalleryController@storePhotos');
Route::delete('/gallery/photos', 'API\GalleryController@destroyPhotos');

Route::post('/gallery/move', 'API\GalleryController@moveElements');
Route::delete('/gallery', 'API\GalleryController@deleteElements');
