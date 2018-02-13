<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
// use App\CyclicCalendarEvent;
use App\WorkoutCycle;
use App\Workout;
use App\Observers\WorkoutEventObserver;
use App\Observers\WorkoutCycleEventObserver;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {

      // CyclicCalendarEvent::observe(CyclicCalendarEventObserver::class);
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
