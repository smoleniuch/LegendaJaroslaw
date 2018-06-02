<?php
Route::post('/motivational-quote-authors/{id}', 'API\MotivationalQuoteAuthorController@update');
Route::resource('motivational-quote-authors', 'API\MotivationalQuoteAuthorController');
Route::resource('motivational-quotes', 'API\MotivationalQuotesController');
