<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
// use App\CyclicCalendarEvent;
use App\WorkoutCycle;
use App\Workout;
use App\Photo;
use App\GalleryAlbum;
use App\MotivationalQuoteAuthor;
use App\ChatMessage;

use App\Observers\WorkoutEventObserver;
use App\Observers\WorkoutCycleEventObserver;
use App\Observers\PhotoObserver;
use App\Observers\GalleryAlbumObserver;
use App\Observers\MotivationalQuoteAuthorObserver;
use App\Observers\ChatMessageObserver;

use App\Services\GalleryService;
use Intervention\Image\ImageManager;
use App\Services\ReduxService;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        GalleryAlbum::observe(GalleryAlbumObserver::class);
        Photo::observe(PhotoObserver::class);
        WorkoutCycle::observe(WorkoutCycleEventObserver::class);
        // Workout::observe(WorkoutEventObserver::class);
        MotivationalQuoteAuthor::observe(MotivationalQuoteAuthorObserver::class);
        ChatMessage::observe(ChatMessageObserver::class);
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(GalleryService::class, function ($app) {
            return new GalleryService(new ImageManager());
        });

        $this->app->bind(ReduxService::class, function ($app) {
            return new ReduxService($app->make(GalleryService::class));
        });
    }
}
