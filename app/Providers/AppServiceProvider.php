<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
// use App\CyclicCalendarEvent;
use App\WorkoutCycle;
use App\Workout;
use App\Photo;
use App\GalleryAlbum;

use App\Observers\WorkoutEventObserver;
use App\Observers\WorkoutCycleEventObserver;
use App\Observers\PhotoObserver;
use App\Observers\GalleryAlbumObserver;

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
        Workout::observe(WorkoutEventObserver::class);
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
    }
}
